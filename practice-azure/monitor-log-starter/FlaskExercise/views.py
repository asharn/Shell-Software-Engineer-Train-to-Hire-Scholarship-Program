from flask import flash, render_template, redirect, request
from FlaskExercise import app


@app.route('/')
def home():
    log = request.values.get('log_button')
    if log:
        if log == 'info':
            app.logger.info('No issue.')
        elif log == 'warning':
            app.logger.warning('Warning occurred.')
        elif log == 'error':
            app.logger.error('Error occurred.')
        elif log == 'critical':
            app.logger.critical('Critical error occurred.')
    return render_template(
        'index.html',
        log=log
    )
