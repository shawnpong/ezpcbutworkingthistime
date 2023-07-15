# Generated by Django 4.2.1 on 2023-07-15 20:00

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Manufacturers',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Manufacturer', models.CharField(max_length=100, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='MyModel',
            fields=[
                ('MyModelId', models.BigAutoField(primary_key=True, serialize=False)),
                ('Manufacturer', models.CharField(max_length=100)),
                ('Name', models.CharField(max_length=100, unique=True)),
                ('Size', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Sizes',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Size', models.CharField(max_length=100, unique=True)),
            ],
        ),
    ]
