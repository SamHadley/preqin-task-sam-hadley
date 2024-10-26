import sqlite3
import csv
import os

DB_FILE = "data.db"  # Path to the SQLite database file
CSV_FILE = "data.csv"  # Path to the CSV file for initial data population

def get_db_connection():
    """Create and return a connection to the SQLite database."""
    conn = sqlite3.connect(DB_FILE)  # Connect to the database
    conn.row_factory = sqlite3.Row  # Return rows as dictionary-like objects
    return conn

def create_tables(conn):
    """Create the 'investors' and 'commitments' tables if they don't exist."""
    with conn:
        # Create investors table
        conn.execute('''
            CREATE TABLE IF NOT EXISTS investors (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                type TEXT,
                country TEXT,
                date_added TEXT,
                last_updated TEXT,
                total_commitment INTEGER DEFAULT 0  -- Add the total_commitment column
            )
        ''')
        # Create commitments table
        conn.execute('''
            CREATE TABLE IF NOT EXISTS commitments (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                investor_id INTEGER,
                asset_class TEXT,
                amount INTEGER,
                currency TEXT,
                FOREIGN KEY(investor_id) REFERENCES investors(id)
            )
        ''')

def insert_csv_data(conn):
    """Insert data from the CSV file into the database and calculate total commitments."""
    try:
        with open(CSV_FILE, 'r') as file:
            csv_reader = csv.DictReader(file)
            investors = {}  # Dictionary to store investor IDs

            # Read each row from the CSV file
            for row in csv_reader:
                name = row['Investor Name']
                if name not in investors:
                    # Insert investor data into the investors table
                    investors[name] = conn.execute('''
                        INSERT INTO investors (name, type, country, date_added, last_updated)
                        VALUES (?, ?, ?, ?, ?)
                    ''', (name, row['Investory Type'], row['Investor Country'], row['Investor Date Added'], row['Investor Last Updated'])).lastrowid

                # Insert commitment data into the commitments table
                conn.execute('''
                    INSERT INTO commitments (investor_id, asset_class, amount, currency)
                    VALUES (?, ?, ?, ?)
                ''', (investors[name], row['Commitment Asset Class'], row['Commitment Amount'], row['Commitment Currency']))

            # Calculate total commitment for each investor after all data is inserted
            for investor_id in investors.values():
                total_commitment = conn.execute('''
                    SELECT SUM(amount) FROM commitments WHERE investor_id = ?
                ''', (investor_id,)).fetchone()[0]

                # Update the total_commitment column in the investors table
                conn.execute('''
                    UPDATE investors SET total_commitment = ? WHERE id = ?
                ''', (total_commitment, investor_id))

        # Commit all the changes to the database
        conn.commit()
    except sqlite3.Error as e:
        print(f"Error while inserting data: {e}")  # Handle any database errors

def init_db():
    """Initialize the database and populate data if the database is empty."""
    # Check if the database file exists
    if not os.path.exists(DB_FILE):
        conn = get_db_connection()
        create_tables(conn)  # Create tables if they don't exist

        # Check if investors table is empty, then populate data from CSV
        row_count = conn.execute('SELECT COUNT(*) FROM investors').fetchone()[0]
        if row_count == 0:
            print("Database is empty. Populating from CSV...")
            insert_csv_data(conn)
        conn.close()
    else:
        print(f"{DB_FILE} already exists. Skipping CSV import.")

def get_commitments_method(investor_id, asset_class):
    """Fetch commitments for a specific investor. Optionally filter by asset class."""
    try:
        conn = get_db_connection()  # Open database connection

        commitments = []

        # Modify the query to include optional asset class filter
        if asset_class == 'All':
            asset_class = None  # Treat 'All' as no filtering

        if asset_class:
            # Fetch commitments filtered by asset class
            commitments = conn.execute('''
                SELECT id, asset_class, amount, currency
                FROM commitments
                WHERE investor_id = ? AND asset_class = ?
                ORDER BY amount DESC
            ''', (investor_id, asset_class)).fetchall()
        else:
            # Fetch all commitments for the investor
            commitments = conn.execute('''
                SELECT id, asset_class, amount, currency
                FROM commitments
                WHERE investor_id = ?
                ORDER BY amount DESC
            ''', (investor_id,)).fetchall()

        conn.close()  # Close database connection

        return commitments  # Return commitments
    
    except sqlite3.Error as e:
        print(f"Error while getting data: {e}")  # Handle any errors

def get_total_by_asset_class_method(investor_id):
    """Fetch the total commitments broken down by asset class for a specific investor."""
    try:
        conn = get_db_connection()  # Open database connection

        # Query to get total commitments by asset class and overall total
        total_by_asset_class = conn.execute('''
            SELECT asset_class, 
                SUM(amount) as total_amount, 
                SUM(SUM(amount)) OVER () as total_commitments  -- Calculate overall total in the same query
            FROM commitments
            WHERE investor_id = ?
            GROUP BY asset_class
            ORDER BY total_amount DESC
        ''', (investor_id,)).fetchall()

        conn.close()  # Close database connection

        return total_by_asset_class  # Return the results
    
    except sqlite3.Error as e:
        print(f"Error while getting data: {e}")  # Handle any errors

def get_investors_method():
    """Fetch the list of all investors."""
    try:
        conn = get_db_connection()  # Open database connection
        investors = conn.execute('SELECT id, name, type, date_added, country, total_commitment FROM investors').fetchall()
        conn.close()  # Close database connection

        return investors  # Return the list of investors
    
    except sqlite3.Error as e:
        print(f"Error while getting data: {e}")  # Handle any errors