# from django.core.exceptions import ValidationError
from django.db import models
from django.conf import settings
from django.core.validators import MinValueValidator

from users.models import CustomUser
from .utils import encode_uid


class Deck(models.Model):
    """Данный класс описывает таблицу колод карточек."""
    title = models.CharField(
        'Title',
        max_length=settings.DECK_TITLE_LENGTH,
    )
    slug = models.SlugField(
        'Slug',
        unique=True,
        max_length=settings.DECK_SLUG_LENGTH,
    )
    description = models.TextField(
        'Deck description',
        blank=True,
    )
    cards_per_day = models.PositiveIntegerField(
        'Amount per day',
        default=settings.CARDS_PER_DAY_DEFAULT,
        validators=[MinValueValidator(1), ],
    )
    author = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE,
        related_name='decks',
        verbose_name='Author',
    )

    def __str__(self) -> str:
        return self.title

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        if not self.slug:
            self.slug = encode_uid(self.id)
            self.save()

    class Mets:
        verbose_name = 'Deck'
        verbose_name_plural = 'Decks'


def user_directory_path(instance, filename):
    # file will be uploaded to MEDIA_ROOT/user_<id>/<filename>
    return f'user_{instance.deck.author.id}/{filename}'


class Card(models.Model):
    """
    Данный класс модели поисывает карточку, которую видит пользватель.
    """
    front_side = models.CharField(
        'Front',
        max_length=settings.CARD_MAX_LENGTH,
    )
    prompt = models.CharField(
        max_length=settings.CARD_MAX_LENGTH,
        verbose_name='Definition',
        blank=True, null=True,
    )
    back_side = models.CharField(
        max_length=settings.CARD_MAX_LENGTH,
        verbose_name='Answer',
    )
    audio = models.FileField(
        upload_to='audio/',
        blank=True, null=True,
    )
    image = models.ImageField(
        upload_to=user_directory_path,
        blank=True, null=True,
    )
    example = models.TextField(
        blank=True,
        verbose_name='Example',
    )
    '''скрытые поля'''
    pub_date = models.DateTimeField(
        auto_now_add=True,
    )
    next_use_date = models.DateTimeField(
        auto_now_add=True,
        verbose_name='next appears date',
    )
    level = models.PositiveIntegerField(
        default=0,
        verbose_name='level',
    )

    deck = models.ForeignKey(
        Deck,
        on_delete=models.CASCADE,
        related_name='cards',
    )

    def __str__(self) -> str:
        return self.front_side

    # def delete(self, *args, **kwargs):
    #     self.image.delete()
    #     super().delete(*args, **kwargs)

    class Mets:
        ordering = ('-next_use_date',)
        verbose_name = 'Card'
        verbose_name_plural = 'Cards'
