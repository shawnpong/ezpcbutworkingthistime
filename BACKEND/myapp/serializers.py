from rest_framework import serializers
from myapp.models import MyModel, Manufacturers, Sizes

# Serializer for the MyModel model
class MyModelSerializer(serializers.ModelSerializer):
    class Meta:
        # Specify the model to be serialized
        model = MyModel
        # Specify the fields from the model to be included in the serialization
        fields = ("MyModelId", "Manufacturer", "Name", "Size", "GPU", "Link")

# Serializer for the Manufacturers model
class ManufacturersSerializer(serializers.ModelSerializer):
    class Meta:
        # Specify the model to be serialized
        model = Manufacturers
        # Specify the fields from the model to be included in the serialization
        fields = ("Manufacturer",)

# Serializer for the Sizes model
class SizesSerializer(serializers.ModelSerializer):
    class Meta:
        # Specify the model to be serialized
        model = Sizes
        # Specify the fields from the model to be included in the serialization
        fields = ("Size",)
