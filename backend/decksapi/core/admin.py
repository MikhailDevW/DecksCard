from django.contrib import admin
from core.models import Card, CustomUser, Deck


@admin.register(CustomUser)
class CustomUserAdmin(admin.ModelAdmin):
    list_display = (
        'id', 'email', 'username', 'is_active', 'is_staff', 'role',
    )
    search_fields = ('email',)
    empty_value_display = 'No data'


@admin.register(Deck)
class DeckAdmin(admin.ModelAdmin):
    list_display = (
        'id', 'title', 'slug', 'description', 'cards_per_day', 'author'
    )
    search_fields = ('title',)
    list_filter = ('title',)
    empty_value_display = '-пусто-'


@admin.register(Card)
class CardAdmin(admin.ModelAdmin):
    list_display = (
        'id', 'front_side', 'back_side', 'pub_date', 'next_use_date', 'level'
    )
    search_fields = ('front_side',)
    list_filter = ('front_side',)
    empty_value_display = '-пусто-'
