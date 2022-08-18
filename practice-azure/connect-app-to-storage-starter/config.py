import os
basedir = os.path.abspath(os.path.dirname(__file__))

class Config(object):
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'secret-key'
    
    SQL_SERVER = os.environ.get('SQL_SERVER') or 'sky-database-server-one.database.windows.net'
    SQL_DATABASE = os.environ.get('SQL_DATABASE') or 'sky-database-one'
    SQL_USER_NAME = os.environ.get('SQL_USER_NAME') or 'azure_user'
    SQL_PASSWORD = os.environ.get('SQL_PASSWORD') or 'Pass@word'
    SQLALCHEMY_DATABASE_URI = 'mssql+pyodbc://' + SQL_USER_NAME + '@' + SQL_SERVER + ':' + SQL_PASSWORD + '@' + SQL_SERVER + ':1433/' + SQL_DATABASE + '?driver=ODBC+Driver+17+for+SQL+Server'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    BLOB_ACCOUNT = os.environ.get('BLOB_ACCOUNT') or 'helloworldstorageaccone'
    BLOB_STORAGE_KEY = os.environ.get('BLOB_STORAGE_KEY') or 'yLnD9weaevO66NV/EMCBPbxOKNhQn1ufcN9z5j8q1Vb+BAOicLzgi4OKjZUKmRzyMXswnsoOWHfE+AStGmAvYg=='
    BLOB_CONTAINER = os.environ.get('BLOB_CONTAINER') or 'images'