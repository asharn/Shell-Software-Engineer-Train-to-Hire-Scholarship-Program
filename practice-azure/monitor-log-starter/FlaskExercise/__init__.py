import logging
from flask import Flask

app = Flask(__name__)
wsgi_app = app.wsgi_app
# DONE: Set the app's logger level to "warning"
#   and any other necessary changes
app.logger.setLevel(logging.WARNING)
streamHandler = logging.StreamHandler()
streamHandler.setLevel(logging.WARNING)
app.logger.addHandler(streamHandler)

import FlaskExercise.views