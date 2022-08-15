# Connecting Your App to Storage

In this exercise, you'll be given an application for a virtual zoo, and asked to add connections
to your earlier deployed SQL database and Blob Storage to populate the zoo application.

If you already closed down your database and blob storage, you'll want to go back and re-create them before getting started.

1. First, familiarize yourself at least with the `views.py` file in the `FlaskExercise` directly, although you may also want to check out the other files. You can see an example screenshot of the deployed application below.
    <br><img src="example-connected-app.png" width="500" />
2. Next, add the necessary environment variables to connect to the SQL database in `config.py`.
3. Then, add the necessary environment variables to connect to the Blob storage container in `config.py`.
4. Add the necessary code in `models.py` to work with the `BlobServiceClient` to upload new images and delete any images that are replaced.
4. Run the app on your local machine, and check that the animals are correctly populated from the SQL database.
5. Add some images for each animal. You should be able to check back in your blob container and see that new images were added, and they should populate back to the main page.

While it's not a required part of this exercise, you can also try to deploy the app using either
an app service or virtual machine; you shouldn't need any additional changes specific to the 
storage connections, but other changes may be necessary.

## Troubleshooting

- Mac users may need to install `unixodbc` as well as related drivers as shown below:
    ```bash
    brew install unixodbc
    ```
- Check [here](https://docs.microsoft.com/en-us/sql/connect/odbc/linux-mac/install-microsoft-odbc-driver-sql-server-macos?view=sql-server-ver15) to add SQL Server drivers for Mac. [This StackOverflow post](https://stackoverflow.com/questions/44527452/cant-open-lib-odbc-driver-13-for-sql-server-sym-linking-issue) may also help resolve certain issues.
