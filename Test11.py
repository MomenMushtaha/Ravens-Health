#Gineydi Orozco 101165733
from cryptography.fernet import Fernet 
import csv
import sqlite3

#Creation of Key 
key = Fernet.generate_key() 

#opens the key
with open('filekey.key', 'wb') as filekey: 
    filekey.write(key)

with open('filekey.key', 'rb') as filekey: 
    key = filekey.read() 

#Using the key 
fernet = Fernet(key)

#Enter the csv file name 
fname= input('Enter the csv file name:')
if len(fname) < 1: 
    fname = 'Database.csv'

with open(fname, 'r') as csv_file: 
    csv_contents = csv_file.read()

#Encrypt the file 
encrypted = fernet.encrypt(csv_contents.encode())


with open(f'{fname}.encrypted', 'wb') as encrypted_file: 
    encrypted_file.write(encrypted)

#Creating Database 
connection = sqlite3.connect('database.db')
cur = connection.cursor() 
cur.execute('''CREATE TABLE activity 
          (Dates datetime,
          BURN_CAL integer, 
          STEPS integer, 
          DISTANCE integer, 
          FLOORS integer, 
          SED_MINS integer,
          L_AC_MINS integer, 
          F_AC_MINS integer,
          V_AC_MINS integer,
          AC_CAL integer)
         ''')

cur.execute('''CREATE TABLE sleep
          (Dates datetime, 
          ASLEEP_MINS integer, 
          AWAKE_MINS integer, 
          AWAKE_NUM integer, 
          TIME_BED integer, 
          REM_SLEEP integer, 
          LIGHT_SLEEP integer, 
          DEEP_SLEEP integer) 
        ''')

#Variables for row indexes 
a = 0
s = 0 
d = 0 
data = 0 

#Decrypt the file, should be in the actual database program 
fernet = Fernet(key)

#Open Encrypted file
with open(f'{fname}.encrypted', 'rb') as enc_file: 
    encrypted = enc_file.read()

decrypted = fernet.decrypt(encrypted)

with open(f'{fname}.decrypted', 'wb') as dec_file: 
    dec_file.write(decrypted)

with open(f'{fname}.decrypted', 'r') as csv_file: 
  csv_reader = csv.reader(csv_file)
  for i, row in enumerate(csv_reader): 
        if 'Activities' in row: 
          j = row.index('Activities')
          a = i; 
        if 'Sleep' in row: 
          k = row.index('Sleep')  
          s = i; 
        if 'Daily Totals' in row: 
          r = row.index('Daily Totals')
          d = i; 
          break 
  
with open(f'{fname}.decrypted', 'r') as csv_file: 
  csv_reader = csv.reader(csv_file)
  for j, row in enumerate(csv_reader): 
      if j > (a+1) and j < (s-1): 
        activitydata = (row[0], row[1], row[2], row[3], row[4],row[5], row[6], row[7], row[8], row[9] )
        cur.execute('''INSERT INTO activity(
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

with open(f'{fname}.decrypted', 'r') as csv_file: 
  csv_reader = csv.reader(csv_file)
  for k, row in enumerate(csv_reader): 
      if k > (s+1) and k <(d-2): 

        sleepdata = (row[1], row[2], row[3], row[4], row[5], row[6], row[7], row[8])
        cur.execute('''INSERT INTO sleep(
          Dates, 
          ASLEEP_MINS , 
          AWAKE_MINS , 
          AWAKE_NUM , 
          TIME_BED , 
          REM_SLEEP , 
          LIGHT_SLEEP , 
          DEEP_SLEEP) VALUES (?, ?, ?, ?, ?, ?, ?, ?)''', sleepdata); 
        #Joining Both Tables    
        cur.execute('''
          SELECT activity.*, sleep.ASLEEP_MINS, sleep.AWAKE_MINS, sleep.AWAKE_NUM, sleep.TIME_BED, sleep.REM_SLEEP, sleep.LIGHT_SLEEP, sleep.DEEP_SLEEP
          FROM activity
          JOIN sleep ON substr(sleep.Dates, 1, 10) = activity.Dates
          ''')

#Encryption 
encrypted = fernet.encrypt(csv_contents.encode())

with open(f'{fname}.encrypted', 'wb') as encrypted_file: 
    encrypted_file.write(encrypted)

csv_file.close()
connection.commit() 
connection.close() 


