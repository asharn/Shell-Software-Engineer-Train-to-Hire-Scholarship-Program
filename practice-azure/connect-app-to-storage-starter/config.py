import os
basedir = os.path.abspath(os.path.dirname(__file__))

class Config(object):
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'secret-key'

    SQL_SERVER = os.environ.get('SQL_SERVER') or 'hello-world-st-server.database.windows.net'
    SQL_DATABASE = os.environ.get('SQL_DATABASE') or 'hello-world-db'
    SQL_USER_NAME = os.environ.get('SQL_USER_NAME') or 'azureadmin'
    SQL_PASSWORD = os.environ.get('SQL_PASSWORD') or 'game@123over'
    SQLALCHEMY_DATABASE_URI = 'mssql+pyodbc://' + SQL_USER_NAME + '@' + SQL_SERVER + ':' + SQL_PASSWORD + '@' + SQL_SERVER + ':1433/' + SQL_DATABASE + '?driver=ODBC+Driver+17+for+SQL+Server'
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    BLOB_ACCOUNT = os.environ.get('BLOB_ACCOUNT') or 'helloworldstorageacc'
    BLOB_STORAGE_KEY = os.environ.get('BLOB_STORAGE_KEY') or 'WmU0oz0+4Q9pg4YpjHkXo1GXwcu5aOybbMX4rgi7s4V1YpHfA//bgmYsIVQWZI6qFoeTaKNRpDD2+AStdy5Tzg=='
    BLOB_CONTAINER = os.environ.get('BLOB_CONTAINER') or 'images'
