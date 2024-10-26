from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from database import init_db, get_commitments_method, get_total_by_asset_class_method, get_investors_method

# Initialize the database and populate data from CSV if needed
print("Initializing the database...")
init_db()  # Initialize the database and populate from CSV if it's empty

app = FastAPI()  # Create FastAPI application

# Add CORS middleware to handle cross-origin requests from frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allow requests from this origin (React app running on localhost:3000)
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],  # Allowed HTTP methods
    allow_headers=["Authorization", "Content-Type"],  # Allowed HTTP headers
)

@app.get("/investors")
def get_investors():
    """Endpoint to fetch a list of all investors."""
    investors = get_investors_method()  # Get data from the database
    return {"investors": [dict(row) for row in investors]}  # Return data as a list of dictionaries

@app.get("/investors/{investor_id}/commitments")
def get_commitments(investor_id: int, asset_class: str = Query(None)):
    """
    Endpoint to fetch commitments for a specific investor.
    Optionally filter by asset class.
    """
    commitments = get_commitments_method(investor_id, asset_class)  # Fetch commitments based on investor and asset class
    return {"commitments": [dict(row) for row in commitments]}  # Return commitments as a list of dictionaries

@app.get("/investors/{investor_id}/commitments/total_by_asset_class")
def get_total_by_asset_class(investor_id: int):
    """Endpoint to get total commitments broken down by asset class for a specific investor."""
    total_by_asset_class = get_total_by_asset_class_method(investor_id)  # Fetch total commitment amounts by asset class

    # Extract the overall total commitment
    total_commitments = total_by_asset_class[0]['total_commitments'] if total_by_asset_class else 0

    # Create a dictionary to hold the total and breakdown by asset class
    asset_class_breakdown = {"All": total_commitments}  # "All" contains the total commitments
    asset_class_breakdown.update({row['asset_class']: row['total_amount'] for row in total_by_asset_class})

    return {"total_by_asset_class": asset_class_breakdown}  # Return breakdown of commitments by asset class


