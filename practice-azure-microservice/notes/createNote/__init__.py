import azure.functions as func
import pymongo
import os

def main(req: func.HttpRequest) -> func.HttpResponse:
 request = req.get_json()
 print(request)
 if request:
     try:
         # add your connection string here
         url = os.environ["MyDbConnection"] # Change the Variable name, as applicable to you
         client = pymongo.MongoClient(url)
         # you will need this fill in
         database = client['lab2db'] # Change the MongoDB name
         collection = database['notes']    # Change the collection name
         # replace the insert_one variable with what you think should be in the bracket
         collection.insert_one(request)
         # we are returnign the request body so you can take a look at the results
         return func.HttpResponse(req.get_body())
     except ValueError:
         return func.HttpResponse('Database connection error.', status_code=500)
 else:
     return func.HttpResponse(
         "Please pass the correct JSON format in the body of the request object",
         status_code=400
     )