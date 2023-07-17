from django.db import models


class MyModel(models.Model):
    MyModelId = models.BigAutoField(primary_key=True, null=False)
    Manufacturer = models.CharField(max_length=100)
    Name = models.CharField(max_length=100, unique=True)
    Size = models.CharField(max_length=100)
    Link = models.URLField(max_length=500, null=True)


class Manufacturers(models.Model):
    Manufacturer = models.CharField(max_length=100, unique=True)


class Sizes(models.Model):
    Size = models.CharField(max_length=100, unique=True)
