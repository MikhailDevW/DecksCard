from .models import Card, Deck


def example_deck(user) -> str:
    example_deck = Deck.objects.create(
        title='Example (RU_EN)',
        author=user,
    )
    Card.objects.bulk_create(
        [
            Card(
                front_side='кошка',
                back_side='cat',
                deck=example_deck
            ),
            Card(
                front_side='собака',
                back_side='dog',
                deck=example_deck
            ),
        ]
    )
    return 'Deck created: OK'
