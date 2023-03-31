import sqlite3
import json

# Connect to the database
conn = sqlite3.connect("activitydatabase.db")

# Create a cursor object to execute SQL queries
cur = conn.cursor()

# Execute a query to list all tables in the database
cur.execute("SELECT name FROM sqlite_master WHERE type='table';")

# Fetch all rows from the query result
tables = cur.fetchall()

# Select the first table found
if tables:
    table_name = tables[0][0]
else:
    print("No tables found in the database.")
    exit()

# Execute a query to select all data from the table
cur.execute(f"SELECT * FROM {table_name}")

# Fetch all rows from the query result
rows = cur.fetchall()

# Get column names from cursor description
columns = [col[0] for col in cur.description]

# Define a list to hold the table data
table_data = []

# Iterate over the rows and convert each row into a dictionary
for row in rows:
    row_dict = {}
    for i in range(len(columns)):
        row_dict[columns[i]] = row[i]
    table_data.append(row_dict)

# Convert the table data to a JSON object
json_data = json.dumps(table_data)

# Write the JSON object to a file
with open("activity.json", "w") as f:
    f.write(json_data)

# Close the database connection
conn.close()
