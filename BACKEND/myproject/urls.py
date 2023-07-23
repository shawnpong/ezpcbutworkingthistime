from django.contrib import admin
from django.urls import path
from myapp.views import (
    MyModelApi,
    ManufacturersApi,
    SizesApi,
    MyModelBatchCreateApi,
    ManufacturersBatchCreateApi,
    SizesBatchCreateApi,
)

# Define the URL patterns for the Django application
urlpatterns = [
    # Admin page URL, typically used for managing the application through the admin interface
    path("admin/", admin.site.urls),

    # API endpoints for MyModel
    path("mymodel/", MyModelApi),                    # GET and POST request handling
    path("mymodel/<int:id>/", MyModelApi),           # GET, PUT, and DELETE request handling for specific MyModel objects
    path("mymodel/batch_create/", MyModelBatchCreateApi),  # POST request for creating multiple MyModel objects

    # API endpoints for Manufacturers
    path("manufacturers/", ManufacturersApi),        # GET and POST request handling
    path("manufacturers/batch_create/", ManufacturersBatchCreateApi),  # POST request for creating multiple Manufacturer objects

    # API endpoints for Sizes
    path("sizes/", SizesApi),                        # GET and POST request handling
    path("sizes/batch_create/", SizesBatchCreateApi),# POST request for creating multiple Size objects
]
