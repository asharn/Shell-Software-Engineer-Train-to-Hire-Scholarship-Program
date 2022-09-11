FROM mcr.microsoft.com/azure-functions/python:4-python3.9

ENV AzureWebJobsScriptRoot=/home/site/wwwroot \
    AzureFunctionsJobHost__Logging__Console__IsEnabled=true

COPY requirements.txt /
RUN pip install -r /requirements.txt

COPY . /home/site/wwwroot

FROM python:3.8

LABEL maintainer="Ashish Karn"

COPY . /app

WORKDIR /app

RUN pip install -r requirements.txt

CMD [ "python", "app.py" ]
