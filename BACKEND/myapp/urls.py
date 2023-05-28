from django.urls import re_path, path
from myapp import views

urlpatterns = [
    path('mymodel/', views.MyModelApi, name = 'mymodel-api'),
    path('mymodel/<int:id>/', views.MyModelApi)
]