from rest_framework import serializers
from myapp.models import MyModel

class MyModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyModel
        fields=('MyModelId', 'Manufacturer', 'Name', 'Size')