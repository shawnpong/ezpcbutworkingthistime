from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from myapp.models import MyModel
from myapp.serializers import MyModelSerializer

@csrf_exempt
def MyModelApi(request, id = 0):
    if request.method == 'GET':
        mymodel = MyModel.objects.all()
        mymodel_serializer = MyModelSerializer(mymodel, many = True)
        return JsonResponse(mymodel_serializer.data, safe = False)
    elif request.method == 'POST':
        mymodel_data = JSONParser().parse(request)
        mymodel_serializer = MyModelSerializer(data = mymodel_data)
        if mymodel_serializer.is_valid():
            mymodel_serializer.save()
            return JsonResponse('Added Successfully', safe = False)
        return JsonResponse('Failed to Add', safe = False)
    elif request.method == 'PUT':
        mymodel_data = JSONParser().parse(request)
        mymodel = MyModel.objects.get(MyModelId = mymodel_data ['MyModelId'])
        mymodel_serializer = MyModelSerializer(mymodel, data = mymodel_data)
        if mymodel_serializer.is_valid():
            mymodel_serializer.save()
            return JsonResponse('Update Successfully', safe = False)
        return JsonResponse('Failed to Update')
    elif request.method == 'DELETE':
        mymodel = MyModel.objects.get(MyModelId = id)
        mymodel.delete()
        return JsonResponse('Deleted Successfully', safe = False)