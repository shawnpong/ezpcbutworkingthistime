import psycopg2

# Parse the connection URL
conn_url = "postgres://casesdb_user:cXFNrwwgVIHyoplFjAsZ0J0lzVXUE3D4@dpg-cigfqqtgkuvojj902dv0-a.singapore-postgres.render.com/casesdb"
parsed_url = psycopg2.extensions.parse_dsn(conn_url)

# Establish a connection to your PostgreSQL database
conn = psycopg2.connect(**parsed_url)
cursor = conn.cursor()

# Get table names
cursor.execute("SELECT table_name FROM information_schema.tables WHERE table_schema = 'casesdb'")
table_names = cursor.fetchall()
print("Table Names:")
for table_name in table_names:
    print(table_name[0])

# Get column names of a specific table
table_name = 'myapp_manufacturers'
cursor.execute(f"SELECT column_name FROM information_schema.columns WHERE table_name = '{table_name}'")
column_names = cursor.fetchall()
print("Column Names of", table_name, ":")
for column_name in column_names:
    print(column_name[0])

# Close the cursor and connection
cursor.close()
conn.close()
