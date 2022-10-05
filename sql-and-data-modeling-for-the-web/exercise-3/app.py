
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:gameover@localhost:5432/example'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class Person(db.Model):
  __tablename__ = 'persons'
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(), nullable=False)

with app.app_context():
    db.create_all()

@app.route('/')
def index():
  return 'Hello World!'


#This code goes at the bottom of your flask Python file(this is actually your server)
if __name__ == '__main__':
    app.debug = True
    app.run(host='0.0.0.0', port=3000)