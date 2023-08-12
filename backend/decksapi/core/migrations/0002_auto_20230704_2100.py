# Generated by Django 3.2.16 on 2023-07-04 18:00

import core.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='card',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to=core.models.user_directory_path),
        ),
        migrations.AlterField(
            model_name='card',
            name='back_side',
            field=models.CharField(max_length=200, verbose_name='Answer'),
        ),
        migrations.AlterField(
            model_name='card',
            name='example',
            field=models.TextField(blank=True, verbose_name='Example'),
        ),
        migrations.AlterField(
            model_name='card',
            name='front_side',
            field=models.CharField(max_length=200, verbose_name='Front'),
        ),
        migrations.AlterField(
            model_name='card',
            name='level',
            field=models.PositiveIntegerField(default=0, verbose_name='level'),
        ),
        migrations.AlterField(
            model_name='card',
            name='next_use_date',
            field=models.DateTimeField(auto_now_add=True, verbose_name='next appears date'),
        ),
        migrations.AlterField(
            model_name='card',
            name='prompt',
            field=models.CharField(blank=True, max_length=200, null=True, verbose_name='Definition'),
        ),
        migrations.AlterField(
            model_name='deck',
            name='cards_per_day',
            field=models.PositiveIntegerField(default=10, verbose_name='Amount per day'),
        ),
        migrations.AlterField(
            model_name='deck',
            name='title',
            field=models.CharField(max_length=200, verbose_name='Title'),
        ),
    ]
