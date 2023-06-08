# Generated by Django 3.2.16 on 2023-06-08 15:45

import core.models
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='CustomUser',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('email', models.EmailField(max_length=255, unique=True)),
                ('username', models.CharField(blank=True, max_length=255, null=True, unique=True, validators=[core.models.CustomUser.username_validator])),
                ('first_name', models.CharField(max_length=255)),
                ('last_name', models.CharField(max_length=255)),
                ('is_active', models.BooleanField(default=True)),
                ('is_staff', models.BooleanField(default=False)),
                ('is_admin', models.BooleanField(default=False)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.Group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.Permission', verbose_name='user permissions')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Deck',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200, verbose_name='Название')),
                ('slug', models.SlugField(unique=True)),
                ('description', models.TextField(blank=True)),
                ('cards_per_day', models.PositiveIntegerField(default=0, verbose_name='Кол-во')),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='decks', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Card',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('front_side', models.CharField(max_length=200, verbose_name='Лицо')),
                ('prompt', models.CharField(blank=True, max_length=200, null=True, verbose_name='Дефиниция')),
                ('back_side', models.CharField(max_length=200, verbose_name='Ответ')),
                ('audio', models.FileField(blank=True, null=True, upload_to='audio/')),
                ('example', models.TextField(blank=True, verbose_name='Пример')),
                ('pub_date', models.DateTimeField(auto_now_add=True)),
                ('next_use_date', models.DateTimeField(auto_now_add=True, verbose_name='Дата след. показа')),
                ('level', models.PositiveIntegerField(default=0, verbose_name='Уровень')),
                ('deck', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='cards', to='core.deck')),
            ],
        ),
    ]
