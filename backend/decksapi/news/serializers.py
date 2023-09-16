from rest_framework import serializers

from .models import News, Tag, NewsInTag


class TagsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = (
            'id',
            'name',
        )


class TagWriteSerializer(serializers.ModelSerializer):
    tag = serializers.PrimaryKeyRelatedField(
        queryset=Tag.objects.all()
    )

    class Meta:
        model = NewsInTag
        fields = (
            'tag',
            'comment',
            'star',
        )
        read_only_fields = ('tag',)


class NewsCreateUpdateSerializer(serializers.ModelSerializer):
    tags = TagWriteSerializer(
        many=True,
        source='tags_used',
    )

    class Meta:
        model = News
        fields = (
            'title',
            'text',
            'tags',
        )

    def create(self, validated_data):
        tags = validated_data.pop('tags_used')
        news = News.objects.create(**validated_data)

        for tag in tags:
            current_tag = tag.get('tag')
            star = tag.get('star')
            news.tags.add(
                current_tag,
                through_defaults={
                    'star': star,
                    'comment': tag.get('comment')
                }
            )

        return news


class NewsTagsReadSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(
        source='tag.id',
    )
    name = serializers.CharField(
        source='tag.name',
    )
    star = serializers.ReadOnlyField()

    class Meta:
        model = NewsInTag
        fields = (
            'id',
            'name',
            'star',
            'comment',
        )


class NewsReadSerializer(serializers.ModelSerializer):
    tags = NewsTagsReadSerializer(
        source='tags_used',
        many=True,
    )

    class Meta:
        model = News
        fields = (
            'title',
            'text',
            'tags',
        )
