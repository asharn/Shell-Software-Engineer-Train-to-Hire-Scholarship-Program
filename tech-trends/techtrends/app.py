import sqlite3
import logging

from flask import Flask, jsonify, json, render_template, request, url_for, redirect, flash
from werkzeug.exceptions import abort


# global variable total connection to count connection requested to sqlite database
total_connection = 0

# Function to get a database connection.
# This function connects to database with the name `database.db`
def get_db_connection():
    global total_connection
    connection = sqlite3.connect('database.db')
    connection.row_factory = sqlite3.Row
    connection.set_trace_callback(app.logger.info)
    total_connection = total_connection + 1
    return connection

# Function to get a post using its ID
def get_post(post_id):
    connection = get_db_connection()
    post = connection.execute('SELECT * FROM posts WHERE id = ?',
                        (post_id,)).fetchone()
    connection.close()
    return post

# Define the Flask application
app = Flask(__name__)
app.config['SECRET_KEY'] = 'your secret key'

# Define the main route of the web application 
@app.route('/')
def index():
    connection = get_db_connection()
    posts = connection.execute('SELECT * FROM posts').fetchall()
    connection.close()
    app.logger.debug(f'''Articles "{','.join(str(post['title']) for post in posts)}" fetched from database!''')
    return render_template('index.html', posts=posts)

# Define how each individual article is rendered 
# If the post ID is not found a 404 page is shown
@app.route('/<int:post_id>')
def post(post_id):
    post = get_post(post_id)
    if post is None:
      app.logger.info(f'Article with id "{post_id}" doesn\'t exist!')
      return render_template('404.html'), 404
    else:
      title = post['title']
      app.logger.info(f'Article "{title}" retrieved!')
      return render_template('post.html', post=post)

# Define the About Us page
@app.route('/about')
def about():
    app.logger.info('The "About Us" page is retrieved!')
    return render_template('about.html')

# Define the post creation functionality 
@app.route('/create', methods=('GET', 'POST'))
def create():
    if request.method == 'POST':
        title = request.form['title']
        content = request.form['content']

        if not title:
            app.logger.info('Title is missing!')
            flash('Title is required!')
        else:
            connection = get_db_connection()
            connection.execute('INSERT INTO posts (title, content) VALUES (?, ?)',
                         (title, content))
            connection.commit()
            connection.close()
            app.logger.info(f'New Article "{title}" created!')
            return redirect(url_for('index'))

    return render_template('create.html')

# Define the helathz functionality 
@app.route('/healthz')
def status():
    app.logger.info('/healthz service is call with response : %s',{"result":"OK - healthy"})
    response = app.response_class(
            response=json.dumps({"result":"OK - healthy"}, indent=4),
            status=200,
            mimetype='application/json'
    )
    return response


# Define the metrics functionality 
@app.route('/metrics')
def metrics():
    connection = get_db_connection()
    totalPost = connection.execute('SELECT count(id) FROM posts').fetchone()[0]
    connection.close()
    responseObject = {"db_connection_count":total_connection,"post_count":totalPost}
    app.logger.info('/metrics service is call with response : ', responseObject)
    response = app.response_class(
            response=json.dumps(responseObject, indent=4),
            status=200,
            mimetype='application/json'
    )
    return response


# start the application on port 3111
if __name__ == "__main__":
   logging.basicConfig(format='%(levelname)s:%(name)s:%(lineno)d:%(asctime)s, %(message)s', datefmt='%m/%d/%Y, %H:%M:%S', level=logging.DEBUG)
   app.run(host='0.0.0.0', port='3111')
