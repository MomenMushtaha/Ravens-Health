import csv 
import sqlite3 

connection = sqlite3.connect('fitbitdatatry2.db')
cur = connection.cursor() 
cur.execute('''CREATE TABLE Activities
          (Date TEXT,
          Calories_Burned TEXT, 
          Steps TEXT,
          Distance TEXT, 
          Floors TEXT,
          Minutes_Sedentary TEXT,
          Minutes_Lightly_Active TEXT,  
          Minutes_Fairly_Active TEXT, 
          Minutes_Very_Active TEXT, 
          Activity_Calories TEXT)
         ''')
cur.execute ('''CREATE TABLE  Sleep
          (Start_Time TEXT, 
          End_Time TEXT, 
          Minutes_Asleep TEXT, 
          Minutes_Awake TEXT, 
          Number_of_Awakenings TEXT, 
          Time_in_Bed TEXT, 
          Minutes_REM_Sleep TEXT,
          Minutes_Light_Sleep TEXT, 
          Minutes_Deep_Sleep TEXT)
        ''')
fname= input('Enter the csv file name:')
if len(fname) < 1: fname = 'Database.csv'
with open(fname) as csv_file: 
    csv_reader = csv.reader(csv_file, delimiter=',')
    for row in csv_reader: 
        print (row)
        insert_activities = '''INSERT INTO Activities (Date,
        Calories_Burned,
          Steps, 
          Distance , 
          Floors ,
          Minutes_Sedentary ,
          Minutes_Lightly_Active ,  
          Minutes_Fairly_Active , 
          Minutes_Very_Active , 
          Activity_Calories ) VALUES (?, ?, ?,?, ?, ?, ?, ?, ?,?) '''
        instert_sleep = '''INSERT INTO Sleep (Start_Time, 
          End_Time, 
          Minutes_Asleep, 
          Minutes_Awake, 
          Number_of_Awakenings, 
          Time_in_Bed, 
          Minutes_REM_Sleep,
          Minutes_Light_Sleep, 
          Minutes_Deep_Sleep) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?) '''
        cur.executemany(insert_activities, csv_reader)
        cur.executemany(instert_sleep, csv_reader)
        select_act = '''SELECT * FROM Activities'''
        select_sleep = '''SELECT * FROM Sleep'''
        r = cur.execute(select_act).fetchall()
        r1 = cur.execute(select_sleep).fetchall
connection.commit() 
connection.close() 
