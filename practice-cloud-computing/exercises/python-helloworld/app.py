from flask import Flask
import json
import logging



app = Flask(__name__)

@app.route("/")
def hello():
    app.logger.info('Main request successfull')
    return "Hello World!"

@app.route('/status')
def status():
    app.logger.info('/status service is call with response : %s',{"result":"OK - healthy"})
    response = app.response_class(
            response=json.dumps({"result":"OK - healthy"}),
            status=200,
            mimetype='application/json'
    )
    return response


@app.route('/metrics')
def metrics():
    app.logger.info('/status service is call with response : ',{"status":"success","code":0,"data":{"UserCount":140,"UserCountActive":23}})
    response = app.response_class(
            response=json.dumps({"status":"success","code":0,"data":{"UserCount":140,"UserCountActive":23}}),
            status=200,
            mimetype='application/json'
    )
    return response



if __name__ == "__main__":
    logging.basicConfig(filename='app.log',level=logging.DEBUG)
    app.run(host='0.0.0.0')
