from flask import Flask
from config import Config
from flask_login import LoginManager
from flask_session import Session

app = Flask(__name__)
app.config.from_object(Config)
wsgi_app = app.wsgi_app
Session(app)
login = LoginManager(app)
login.login_view = 'login'

import FlaskExercise.views