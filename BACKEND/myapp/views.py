from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from myapp.models import MyModel, Manufacturers, Sizes
from myapp.serializers import MyModelSerializer, ManufacturersSerializer, SizesSerializer

@csrf_exempt
def MyModelApi(request, id=0):
    if request.method == 'GET':
        mymodel = MyModel.objects.all()
        mymodel_serializer = MyModelSerializer(mymodel, many=True)
        return JsonResponse(mymodel_serializer.data, safe=False)
    elif request.method == 'POST':
        mymodel_data = JSONParser().parse(request)
        mymodel_serializer = MyModelSerializer(data=mymodel_data)
        if mymodel_serializer.is_valid():
            mymodel_serializer.save()
            return JsonResponse('Added Successfully', safe=False)
        return JsonResponse('Failed to Add', safe=False)
    elif request.method == 'PUT':
        mymodel_data = JSONParser().parse(request)
        try:
            existing_mymodel = MyModel.objects.get(Name=mymodel_data['Name'])
            mymodel_serializer = MyModelSerializer(existing_mymodel, data=mymodel_data)
        except MyModel.DoesNotExist:
            mymodel = MyModel.objects.get(MyModelId=mymodel_data['MyModelId'])
            mymodel_serializer = MyModelSerializer(mymodel, data=mymodel_data)
        
        if mymodel_serializer.is_valid():
            mymodel_serializer.save()  # Update the existing model or create a new one
            return JsonResponse('Update Successfully', safe=False)
        return JsonResponse(mymodel_serializer.errors, status=400)
    elif request.method == 'DELETE':
        mymodel = MyModel.objects.get(MyModelId=id)
        mymodel.delete()
        return JsonResponse('Deleted Successfully', safe=False)

@csrf_exempt
def ManufacturersApi(request):
    if request.method == 'GET':
        manufacturers = Manufacturers.objects.all()
        serializer = ManufacturersSerializer(manufacturers, many=True)
        return JsonResponse(serializer.data, safe=False)
    elif request.method == 'POST':
        manufacturer_data = JSONParser().parse(request)
        serializer = ManufacturersSerializer(data=manufacturer_data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse('Manufacturer added successfully', safe=False)
        return JsonResponse(serializer.errors, status=400)

@csrf_exempt
def SizesApi(request):
    if request.method == 'GET':
        sizes = Sizes.objects.all()
        serializer = SizesSerializer(sizes, many=True)
        print(serializer.data)  # Add this print statement
        return JsonResponse(serializer.data, safe=False)
    elif request.method == 'POST':
        size_data = JSONParser().parse(request)
        serializer = SizesSerializer(data=size_data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse('Size added successfully', safe=False)
        return JsonResponse(serializer.errors, status=400)