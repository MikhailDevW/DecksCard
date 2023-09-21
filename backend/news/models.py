from django.db import models


class Tag(models.Model):
    name = models.CharField(
        max_length=100,
    )

    def __str__(self) -> str:
        return self.name


class News(models.Model):
    title = models.CharField(
        max_length=100,
    )
    text = models.TextField(blank=False)
    tags = models.ManyToManyField(
        Tag,
        related_name='news',
        through='NewsInTag',
    )

    def __str__(self) -> str:
        return f'{self.title}'


class NewsInTag(models.Model):
    news = models.ForeignKey(
        News,
        on_delete=models.CASCADE,
        related_name='tags_used',
    )
    tag = models.ForeignKey(
        Tag,
        on_delete=models.CASCADE,
        related_name='news_used',
    )
    star = models.IntegerField()
    comment = models.TextField()

    def __str__(self) -> str:
        return f'comm:{self.comment} - star:{self.star}'

    class Meta:
        pass


# class Editor(models.Model):
#     name = models.CharField(
#         max_length=50,
#     )
#     subscribed_to = models.ManyToManyField(
#         'self',
#         symmetrical=False,
#     )

#     def __str__(self) -> str:
#         return f'{self.name}'


# class Subscript(models.Model):
#     subscriber = models.ForeignKey(
#         Editor,
#     )
#     subscribe = models.ForeignKey(
#         Editor,
#     )
