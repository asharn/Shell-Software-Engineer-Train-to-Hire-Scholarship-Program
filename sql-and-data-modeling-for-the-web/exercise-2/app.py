from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:gameover@localhost:5432/example'
db = SQLAlchemy(app)


@app.route('/')
def index():
    return 'Hello World!'





#This code goes at the bottom of your flask Python file(this is actually your server)
if __name__ == '__main__':
    app.debug = True
    app.run(host='0.0.0.0', port=3000)