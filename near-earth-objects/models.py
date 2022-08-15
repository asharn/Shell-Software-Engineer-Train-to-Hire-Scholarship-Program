"""Represent models for near-Earth objects and their close approaches.

The `NearEarthObject` class represents a near-Earth object. Each has a unique
primary designation, an optional unique name, an optional diameter, and a flag
for whether the object is potentially hazardous.

The `CloseApproach` class represents a close approach to Earth by an NEO. Each
has an approach datetime, a nominal approach distance, and a relative approach
velocity.

A `NearEarthObject` maintains a collection of its close approaches, and a
`CloseApproach` maintains a reference to its NEO.

The functions that construct these objects use information extracted from the
data files from NASA, so these objects should be able to handle all of the
quirks of the data set, such as missing names and unknown diameters.

You'll edit this file in Task 1.
"""
from helpers import cd_to_datetime, datetime_to_str


class NearEarthObject:
    """A near-Earth object (NEO).

    An NEO encapsulates semantic and physical parameters about the object, such
    as its primary designation (required, unique), IAU name (optional), diameter
    in kilometers (optional - sometimes unknown), and whether it's marked as
    potentially hazardous to Earth.

    A `NearEarthObject` also maintains a collection of its close approaches -
    initialized to an empty collection, but eventually populated in the
    `NEODatabase` constructor.
    """

    # DONE: How can you, and should you, change the arguments to this constructor? - Not Required
    # If you make changes, be sure to update the comments in this file. - Not Required
    def __init__(self, **info):
        """Create a new `NearEarthObject`.

        :param info: A dictionary of excess keyword arguments supplied to the constructor.
        """
        # DONE: Assign information from the arguments passed to the constructor
        # onto attributes named `designation`, `name`, `diameter`, and `hazardous`.
        # You should coerce these values to their appropriate data type and
        # handle any edge cases, such as a empty name being represented by `None`
        # and a missing diameter being represented by `float('nan')`.
        # All of the above tasks are completed.
        self.designation = info.get('pdes')
        self.name = info.get('name')
        try:
            self.diameter = float(info.get('diameter', 'nan'))
        except ValueError:
            self.diameter = float('nan')
        self.hazardous = True if info.get('pha', 'N') == 'Y' else False

        # Create an empty initial collection of linked approaches.
        self.approaches = info.get('ca', [])

    @property
    def fullname(self):
        """Return a representation of the full name of this NEO."""
        # DONE: Use self.designation and self.name to build a fullname for this object.
        # string concatenation of self.designation, ' ' and self.name is done only when both fields have valid value.
        # else only self.designation is return
        return f"{self.designation} ({self.name})" if self.designation and self.name else f"{self.designation}"

    def __str__(self):
        """Return `str(self)`."""
        # DONE: Use this object's attributes to return a human-readable string representation.
        # The project instructions include one possibility. Peek at the __repr__
        # method for examples of advanced string formatting.
        # This task is completed.
        return f"NEO {self.fullname} has a diameter of {self.diameter:.3f} km and {'is' if self.hazardous else 'is not'} potentially hazardous."

    def __repr__(self):
        """Return `repr(self)`, a computer-readable string representation of this object."""
        return f"NearEarthObject(designation={self.designation!r}, name={self.name!r}, " \
               f"diameter={self.diameter:.3f}, hazardous={self.hazardous!r})"

    def serialize(self):
        """Return `serialization(self)`, a dict format of user defined keys."""
        return {
            "designation": self.designation,
            "name": self.name if self.name is not None else '',
            "diameter_km": float(self.diameter),
            "potentially_hazardous": self.hazardous
        }


class CloseApproach:
    """A close approach to Earth by an NEO.

    A `CloseApproach` encapsulates information about the NEO's close approach to
    Earth, such as the date and time (in UTC) of closest approach, the nominal
    approach distance in astronomical units, and the relative approach velocity
    in kilometers per second.

    A `CloseApproach` also maintains a reference to its `NearEarthObject` -
    initially, this information (the NEO's primary designation) is saved in a
    private attribute, but the referenced NEO is eventually replaced in the
    `NEODatabase` constructor.
    """

    # DONE: How can you, and should you, change the arguments to this constructor? - Not Required
    # If you make changes, be sure to update the comments in this file. - Not Required
    def __init__(self, **info):
        """Create a new `CloseApproach`.

        :param info: A dictionary of excess keyword arguments supplied to the constructor.
        """
        # DONE: Assign information from the arguments passed to the constructor
        # onto attributes named `_designation`, `time`, `distance`, and `velocity`.
        # You should coerce these values to their appropriate data type and handle any edge cases.
        # The `cd_to_datetime` function will be useful.
        # All of the above tasks are completed.
        self._designation = info.get('des')
        self.time = cd_to_datetime(info.get('cd'))  # DONE: Use the cd_to_datetime function for this attribute.
        try:
            self.distance = float(info.get('dist', 0.0))
        except ValueError:
            self.diameter = float(0.0)
        try:
            self.velocity = float(info.get('v_rel', 0.0))
        except ValueError:
            self.velocity = float(0.0)

        # Create an attribute for the referenced NEO, originally None.
        self.neo = info.get('neo')

    @property
    def time_str(self):
        """Return a formatted representation of this `CloseApproach`'s approach time.

        The value in `self.time` should be a Python `datetime` object. While a
        `datetime` object has a string representation, the default representation
        includes seconds - significant figures that don't exist in our input
        data set.

        The `datetime_to_str` method converts a `datetime` object to a
        formatted string that can be used in human-readable representations and
        in serialization to CSV and JSON files.
        """
        # DONE: Use this object's `.time` attribute and the `datetime_to_str` function to
        # build a formatted representation of the approach time.
        return datetime_to_str(self.time)

    def __str__(self):
        """Return `str(self)`."""
        # DONE: Use this object's attributes to return a human-readable string representation.
        # The project instructions include one possibility. Peek at the __repr__
        # method for examples of advanced string formatting.
        return f"At {self.time_str}, '{self.neo.fullname}' approaches Earth " \
               f"at a distance of {self.distance:.2f} au and a velocity of {self.velocity:.2f} km/s."

    def __repr__(self):
        """Return `repr(self)`, a computer-readable string representation of this object."""
        return f"CloseApproach(time={self.time_str!r}, distance={self.distance:.2f}, " \
               f"velocity={self.velocity:.2f}, neo={self.neo!r})"

    def serialize(self):
        """Return `serialization(self)`, a dict format of user defined keys."""
        return {
            "datetime_utc": self.time_str,
            "distance_au": self.distance,
            "velocity_km_s": self.velocity,
            "neo": self.neo.serialize()
        }

    def toCSVRow(self):
        """Return `repr(self)`, a dict format of user defined keys to write in csv file."""
        return {
                    "datetime_utc": self.time_str,
                    "distance_au": self.distance,
                    "velocity_km_s": self.velocity,
                    "designation": self.neo.designation,
                    "name": self.neo.name if self.neo.name is not None else '',
                    "diameter_km": self.neo.diameter,
                    "potentially_hazardous": str(self.neo.hazardous)
                }
