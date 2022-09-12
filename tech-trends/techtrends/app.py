import sqlite3
import logging
import sys
from wsgiref.handlers import format_date_time

from flask import (
    Flask,
    jsonify,
    json,
    render_template,
    request,
    url_for,
    redirect,
    flash,
)
from werkzeug.exceptions import abort


# global variable total connection to count connection requested to sqlite database
# Define the Flask application
app = Flask(__name__)
app.config["SECRET_KEY"] = "your secret key"

app.config["total_connection"] = 0


def get_db_connection():
    """This function connects to database with the name database.db."""

    try:
        connection = sqlite3.connect("database.db")
        connection.row_factory = sqlite3.Row
        connection.set_trace_callback(app.logger.info)
        app.config["total_connection"] = app.config["total_connection"] + 1
        return connection
    except sqlite3.Error as error:
        app.logger.error("Error while connecting to sqlite", error)


def get_post(post_id):
    """Function to get a post using its ID."""

    try:
        connection = get_db_connection()
        post = connection.execute(
            "SELECT * FROM posts WHERE id = ?", (post_id,)
        ).fetchone()
        connection.close()
        return post
    finally:
        if connection:
            connection.close()
            app.logger.debug("The SQLite connection is closed in function get_post")


@app.route("/")
def index():
    """Define the main route of the web application."""

    try:
        connection = get_db_connection()
        posts = connection.execute("SELECT * FROM posts").fetchall()
        connection.close()
        app.logger.debug(
            f"""Articles "{','.join(str(post['title']) for post in posts)}" fetched from database!"""
        )
        return render_template("index.html", posts=posts)
    finally:
        if connection:
            connection.close()
            app.logger.debug("The SQLite connection is closed in index function")


@app.route("/<int:post_id>")
def post(post_id):
    """This function is used to define how each individual article is rendered.
    If the post ID is not found a 404 page is shown"""

    post = get_post(post_id)
    if post is None:
        app.logger.info(f'Article with id "{post_id}" doesn\'t exist!')
        return render_template("404.html"), 404
    else:
        title = post["title"]
        app.logger.info(f'Article "{title}" retrieved!')
        return render_template("post.html", post=post)


@app.route("/about")
def about():
    """Define the About Us page"""
    app.logger.info('The "About Us" page is retrieved!')
    return render_template("about.html")


@app.route("/create", methods=("GET", "POST"))
def create():
    """Define the post creation functionality"""

    if request.method == "POST":
        title = request.form["title"]
        content = request.form["content"]

        if not title:
            app.logger.info("Title is missing!")
            flash("Title is required!")
        else:
            try:
                connection = get_db_connection()
                connection.execute(
                    "INSERT INTO posts (title, content) VALUES (?, ?)", (title, content)
                )
                connection.commit()
                connection.close()
                app.logger.info(f'New Article "{title}" created!')
                return redirect(url_for("index"))
            finally:
                if connection:
                    connection.close()
                    app.logger.debug(
                        "The SQLite connection is closed in function create()"
                    )

    return render_template("create.html")


@app.route("/healthz")
def status():
    """Define the helathz functionality"""

    app.logger.info(
        "/healthz service is call with response : %s", {"result": "OK - healthy"}
    )
    response = app.response_class(
        response=json.dumps({"result": "OK - healthy"}, indent=4),
        status=200,
        mimetype="application/json",
    )
    return response


@app.route("/metrics")
def metrics():
    """Define the metrics functionality."""

    try:
        connection = get_db_connection()
        totalPost = connection.execute("SELECT count(id) FROM posts").fetchone()[0]
        connection.close()
        responseObject = {
            "db_connection_count": app.config["total_connection"],
            "post_count": totalPost,
        }
        app.logger.debug("/metrics service is call with response : ", responseObject)
        response = app.response_class(
            response=json.dumps(responseObject, indent=4),
            status=200,
            mimetype="application/json",
        )
        return response
    finally:
        if connection:
            connection.close()
            app.logger.debug("The SQLite connection is closed in function metrics")


def setup_logger():
    """set logger to handle STDOUT and STDERR"""

    stderr_handler = logging.StreamHandler()  # stderr handler by default
    stderr_handler.setLevel(logging.ERROR)
    stdout_handler = logging.StreamHandler(sys.stdout)  # stdout handler
    handlers = [stderr_handler, stdout_handler]
    # format output
    format_output = "%(levelname)s:%(name)s:%(lineno)d:%(asctime)s, %(message)s"  # formating output here
    format_date_time = "%m/%d/%Y, %H:%M:%S"
    logging.basicConfig(
        format=format_output,
        datefmt=format_date_time,
        level=logging.DEBUG,
        handlers=handlers,
    )


if __name__ == "__main__":
    """start the application on port 3111"""

    setup_logger()
    app.run(host="0.0.0.0", port="3111")
