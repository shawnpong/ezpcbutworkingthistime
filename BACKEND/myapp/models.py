from django.db import models

class MyModel(models.Model):
    MyModelId = models.IntegerField(primary_key=True)
    Manufacturer = models.CharField(max_length=100, null = True)
    Name = models.CharField(max_length=100)
    Size = models.CharField(max_length=100)
    