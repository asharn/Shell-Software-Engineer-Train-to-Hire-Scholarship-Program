FROM python:3.8

LABEL maintainer="Ashish Karn"

EXPOSE 3111

WORKDIR /app

COPY ./techtrends /app

RUN pip install -r requirements.txt

RUN python init_db.py

CMD [ "python", "app.py" ]
