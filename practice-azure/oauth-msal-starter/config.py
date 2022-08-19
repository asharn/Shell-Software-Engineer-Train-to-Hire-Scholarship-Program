class Config(object):
    # In a production app, store this instead in KeyVault or an environment variable
    # DONE: Enter your client secret from Azure AD below
    CLIENT_SECRET = "Olv8Q~Ex.TfO5L_7AvapMPFTwoEqckvljKDJUc98" 
    # 0bafd615-19b6-4de1-a02e-ca8a514ec662

    AUTHORITY = "https://login.microsoftonline.com/common"  # For multi-tenant app
    # AUTHORITY = "https://login.microsoftonline.com/Enter_the_Tenant_Name_Here"

    # DONE: Enter your application client ID here
    CLIENT_ID = "38064986-11a8-48a8-b2b8-45a8d9033478"

    # DONE: Enter the redirect path you want to use for OAuth requests
    #   Note that this will be the end of the URI entered back in Azure AD
    REDIRECT_PATH = "/getAToken"  # Used to form an absolute URL, 
        # which must match your app's redirect_uri set in AAD

    # You can find the proper permission names from this document
    # https://docs.microsoft.com/en-us/graph/permissions-reference
    SCOPE = ["User.Read"]

    SESSION_TYPE = "filesystem"  # So token cache will be stored in server-side session