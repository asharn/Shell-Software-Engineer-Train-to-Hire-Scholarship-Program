"""Extract data on near-Earth objects and close approaches from CSV and JSON files.

The `load_neos` function extracts NEO data from a CSV file, formatted as
described in the project instructions, into a collection of `NearEarthObject`s.

The `load_approaches` function extracts close approach data from a JSON file,
formatted as described in the project instructions, into a collection of
`CloseApproach` objects.

The main module calls these functions with the arguments provided at the command
line, and uses the resulting collections to build an `NEODatabase`.

You'll edit this file in Task 2.
"""
import csv
import json

from models import NearEarthObject, CloseApproach


def load_neos(neo_csv_path='data/neos.csv'):
    """Read near-Earth object information from a CSV file.

    :param neo_csv_path: A path to a CSV file containing data about near-Earth objects.
    :return: A collection of `NearEarthObject`s.
    """
    # TODO: Load NEO data from the given CSV file.
    neo = []
    with open(neo_csv_path, 'r') as csv_file:
        reader = csv.reader(csv_file)
        next(reader)  # Skip the header line.
        for row in reader:
            nearEarthObject = NearEarthObject(pdes=row[3],name=row[4],pha=row[7],diameter=row[15])
            neo.append(nearEarthObject)        
    return neo


def load_approaches(cad_json_path='data/cad.json'):
    """Read close approach data from a JSON file.

    :param cad_json_path: A path to a JSON file containing data about close approaches.
    :return: A collection of `CloseApproach`es.
    """
    # TODO: Load close approach data from the given JSON file.
    ca = []
    with open(cad_json_path, 'r') as json_file:
        contents = json.load(json_file) 
        for data in contents['data']:
            closeApproach = CloseApproach(desc=data[0], cd=data[3], dist=data[4], v_rel=data[7])
            ca.append(closeApproach)
    return ca
