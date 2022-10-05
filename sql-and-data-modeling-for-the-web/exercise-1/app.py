from flask import Flask

app = Flask(__name__)


@app.route('/')
def index():
    return 'Hello World!'





#This code goes at the bottom of your flask Python file(this is actually your server)
if __name__ == '__main__':
    app.debug = True
    app.run(host='0.0.0.0', port=3000)