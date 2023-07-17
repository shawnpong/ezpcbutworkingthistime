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

urlpatterns = [
    path("admin/", admin.site.urls),
    path("mymodel/", MyModelApi),
    path("mymodel/batch_create/", MyModelBatchCreateApi),
    path("manufacturers/", ManufacturersApi),
    path("manufacturers/batch_create/", ManufacturersBatchCreateApi),
    path("sizes/", SizesApi),
    path("sizes/batch_create/", SizesBatchCreateApi),
]
