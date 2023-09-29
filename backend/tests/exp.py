import sqlite3

con = sqlite3.connect('./db.sqlite')

cursor = con.cursor()

cursor.execute(
    '''SELECT * FROM otdel'''
)

# cursor.execute(
#     '''CREATE TABLE IF NOT EXISTS otdel(
#         id INTEGER PRIMARY KEY,
#         name TEXT
#     );
#     '''
# )
# cursor.execute(
#     '''INSERT INTO otdel(name)
#         VALUES('КБ')'''
# )

con.commit()
con.close()
