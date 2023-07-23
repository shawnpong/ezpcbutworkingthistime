from django.db import models

# MyModel table to store PC component information
class MyModel(models.Model):
    MyModelId = models.BigAutoField(primary_key=True, null=False)  # Auto-incrementing primary key
    Manufacturer = models.CharField(max_length=100)  # Manufacturer of the PC component
    Name = models.CharField(max_length=100, unique=True)  # Name of the PC component (should be unique)
    Size = models.CharField(max_length=100)  # Size of the PC component
    GPU = models.CharField(max_length=100)  # GPU (Graphics Processing Unit) information
    Link = models.URLField(max_length=500, null=True)  # URL link associated with the component (optional)

# Manufacturers table to store unique manufacturer names
class Manufacturers(models.Model):
    Manufacturer = models.CharField(max_length=100)  # Manufacturer name (should be unique)

# Sizes table to store unique PC component sizes
class Sizes(models.Model):
    Size = models.CharField(max_length=100)  # Size of the PC component (should be unique)
