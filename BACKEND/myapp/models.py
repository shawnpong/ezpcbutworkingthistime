from django.db import models

class MyModel(models.Model):
    MyModelId = models.IntegerField(primary_key=True)
    Name = models.CharField(max_length=100)
    Size = models.CharField(max_length=100)
    