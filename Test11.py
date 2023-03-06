import csv 
import sqlite3 

connection = sqlite3.connect('databa.db')
cur = connection.cursor() 
cur.execute('''CREATE TABLE health
          (Dates text,
          BURN_CAL integer, 
          STEPS integer, 
          DISTANCE integer, 
          FLOORS integer, 
          SED_MINS integer,
          L_AC_MINS integer, 
          F_AC_MINS integer,
          V_AC_MINS integer,
          AC_CAL integer,  
          ASLEEP_MINS integer, 
          AWAKE_MINS integer, 
          AWAKE_NUM integer, 
          TIME_BED integer, 
          REM_SLEEP integer, 
          LIGHT_SLEEP integer, 
          DEEP_SLEEP integer)
         ''')
         
a = 0; 
s = 0; 
d = 0; 
data = 0; 

fname= input('Enter the csv file name:')
if len(fname) < 1: fname = 'Database.csv'
with open(fname, 'r') as csv_file: 
  csv_reader = csv.reader(csv_file)
  for i, row in enumerate(csv_reader): 
        if 'Activities' in row: 
          j = row.index('Activities')
          a = i; 
          # print (f'cell found at row {i}, column {j}')
          #print (row)
        if 'Sleep' in row: 
          k = row.index('Sleep')  
          s = i; 
          # print (f'cell found at row {i}, column {k}')
        if 'Daily Totals' in row: 
          r = row.index('Daily Totals')
          d = i; 
          #print (f'cell found at row {i}, column {d}')
          break 


with open(fname, 'r') as csv_file: 
  csv_reader = csv.reader(csv_file)
  for j, row in enumerate(csv_reader): 
      if j > (a+1) and j < (s-1): 
        activitydata = (row[0], row[1], row[2], row[3], row[4],row[5], row[6], row[7], row[8], row[9] )
        cur.execute('''INSERT INTO health(
          Dates, 
          BURN_CAL, 
          STEPS, 
          DISTANCE, 
          FLOORS, 
          SED_MINS, 
          L_AC_MINS, 
          F_AC_MINS,
          V_AC_MINS, 
          AC_CAL) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ? ) ''', activitydata); 

with open(fname, 'r') as csv_file: 
  csv_reader = csv.reader(csv_file)
  for k, row in enumerate(csv_reader): 
      if k > (s+1) and k <(d-2): 
        # print (row[0])
        sleepdata = (row[2], row[3], row[4], row[5], row[6], row[7], row[8])
        cur.execute('''INSERT INTO health(
          ASLEEP_MINS , 
          AWAKE_MINS , 
          AWAKE_NUM , 
          TIME_BED , 
          REM_SLEEP , 
          LIGHT_SLEEP , 
          DEEP_SLEEP) VALUES (?, ?, ?, ?, ?, ?, ?)''', sleepdata); 

csv_file.close()
connection.commit() 
connection.close() 


