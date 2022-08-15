CREATE TABLE ANIMALS(
    id INT NOT NULL IDENTITY(1, 1),
    name VARCHAR(75) NOT NULL,
    scientific_name VARCHAR(75) NOT NULL,
	description VARCHAR(800) NOT NULL,
    image_path VARCHAR(100) NULL,
	PRIMARY KEY (id)
);

INSERT INTO dbo.animals (name, scientific_name, description)
VALUES (
    'Bengal tiger',
    'Panthera tigris tigris',
    'A big orange cat! They like to hunt and usually live alone. Are found largely in India and Bangladesh.'
);

INSERT INTO dbo.animals (name, scientific_name, description)
VALUES (
    'African bush elephant',
    'Loxodonta africana',
    'Huge, incredibly intelligent mammals, with large, distinctive tusks. Found in multiple locations throughout Africa.'
);

INSERT INTO dbo.animals (name, scientific_name, description)
VALUES (
    'Monarch Butterfly',
    'Danaus plexippus',
    'A butterfly typically covered in orange, black and white markings. Can be found throughout the Americas, as well as in many islands in the Pacific and Australia.'
);