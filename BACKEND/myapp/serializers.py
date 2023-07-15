from rest_framework import serializers
from myapp.models import MyModel, Manufacturers, Sizes

class MyModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyModel
        fields=('MyModelId', 'Manufacturer', 'Name', 'Size')

class ManufacturersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Manufacturers
        fields = ('Manufacturer',)

class SizesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sizes
        fields = ('Size',)
