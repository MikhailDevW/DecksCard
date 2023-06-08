from rest_framework import permissions


class OwnerOnly(permissions.BasePermission):
    '''Если колода принадлежит автору... то ОК'''
    def has_permission(self, request, view):
        if request.user.decks.filter(
            id=view.kwargs.get('deck_id')
        ).exists():
            return True
        return False

    def has_object_permission(self, request, view, obj):
        return (
            obj.deck.id == int(view.kwargs.get('deck_id'))
        )
