from FlaskExercise import app, db
from flask import flash
from werkzeug.utils import secure_filename
from azure.storage.blob import BlobServiceClient
import uuid

blob_container = app.config['BLOB_CONTAINER']
storage_url = "https://{}.blob.core.windows.net/".format(app.config['BLOB_ACCOUNT'])
blob_service = BlobServiceClient(account_url=storage_url, credential=app.config['BLOB_STORAGE_KEY'])

class Animal(db.Model):
    __tablename__ = 'animals'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(75))
    scientific_name = db.Column(db.String(75))
    description = db.Column(db.String(800))
    image_path = db.Column(db.String(100))

    def __repr__(self):
        return '<Animal {}>'.format(self.body)

    def save_changes(self, file):
        if file:
            filename = secure_filename(file.filename)
            fileExtension = filename.rsplit('.', 1)[1]
            randomFilename = str(uuid.uuid1())
            filename = randomFilename + '.' + fileExtension
            try:
                # TODO: Get a blob client and upload the blob
                pass
                if self.image_path:
                    # TODO: Get a blob client and delete the previous blob
                    pass
            except Exception as err:
                flash(err)
            self.image_path = filename
        db.session.commit()
