from django.urls import path
from myapp import views

urlpatterns = [
    path('mymodel/', views.MyModelApi.as_view(), name='mymodel-api'),
    path('mymodel/<int:id>/', views.MyModelApi.as_view()),
    path('sizes/', views.SizesApi.as_view(), name='sizes-api'),
    path('sizes/<int:id>/', views.SizesApi.as_view()),
    path('manufacturers/', views.ManufacturersApi.as_view(), name='manufacturers-api'),
    # Add other app-specific URLs here
]
