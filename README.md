# Investor Commitments Application

This project is a full-stack web application that displays a list of investors and their commitments by asset class. The backend is built with FastAPI and SQLite, while the frontend uses React with Material-UI. The application allows users to view investors and their commitments, filter commitments by asset class, and see totals per asset class.

## Technologies Used

- **Backend**: FastAPI, SQLite, Python
- **Frontend**: React, TypeScript, Material-UI
- **Database**: SQLite with CSV data population
- **CORS**: Enabled to handle communication between frontend (localhost:3000) and backend (localhost:8000)

## Project Setup

### Backend Setup

1. **Install Python**

   Ensure you have Python 3.x installed. You can download it from [python.org](https://www.python.org/downloads/).

2. **Set Up a Virtual Environment** (optional but recommended)
   
   Navigate to the backend directory, then run the following code:

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use: venv\Scripts\activate

3. **Install Dependencies**

   ```bash
   cd backend
   pip install -r requirements.txt

4. **Database Setup**

   The database will automatically be initialized when you first run the backend. The init_db() function in database.py will create the tables and populate them with data from data.csv if the database is empty.

5. **Run the Backend Server**
   Start the FastAPI server by running the following command:

   ```bash
   uvicorn main:app --reload

   The backend server will be running at http://localhost:8000.


### Frontend Setup

1. **Install Node.js and npm**

2. **Install Dependencies**

   Navigate to the frontend directory and install the necessary npm packages:

   ```bash
   cd frontend
   npm install


## Running the Application

### Backend

1. Open a terminal window.

2. Navigate to the backend directory.

3. Start the FastAPI server with:

   ```bash
   uvicorn main:app --reload

4. The backend API will be accessible at http://localhost:8000.

### Frontend

1. Open a new terminal window.

2. Navigate to the frontend directory.

3. Start the React development server with:

   ```bash
   npm start

4. The frontend application will be accessible at http://localhost:3000.

### Accessing the Application

Once both the backend and frontend are running, you can open a browser and go to http://localhost:3000 to view the application. The frontend will communicate with the backend to fetch investor and commitment data.