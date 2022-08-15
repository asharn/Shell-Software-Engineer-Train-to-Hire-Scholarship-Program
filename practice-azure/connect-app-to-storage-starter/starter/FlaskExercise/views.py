from flask import render_template, redirect, request
from FlaskExercise import app, db
from FlaskExercise.forms import AnimalForm
import FlaskExercise.models as models

imageSourceUrl = 'https://'+ app.config['BLOB_ACCOUNT']  + '.blob.core.windows.net/' + app.config['BLOB_CONTAINER']  + '/'


@app.route('/')
@app.route('/home')
def home():
    animals = models.Animal.query.all()
    return render_template(
        'index.html',
        imageSource=imageSourceUrl,
        animals=animals
    )


@app.route('/animal/<int:id>', methods=['GET', 'POST'])
def animal(id):
    animal = models.Animal.query.get(int(id))
    form = AnimalForm(formdata=request.form, obj=animal)
    if form.validate_on_submit():
        animal.save_changes(request.files['image_path'])
        return redirect('/')
    return render_template(
        'animal.html',
        imageSource=imageSourceUrl,
        form=form,
        animal=animal
    )
