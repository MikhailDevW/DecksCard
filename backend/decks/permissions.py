from .utils import decode_uid
from rest_framework import permissions


class OwnerOnly(permissions.BasePermission):
    '''Если колода принадлежит автору... то ОК'''
    def has_permission(self, request, view):
        if request.user.decks.filter(
            id=decode_uid(view.kwargs.get('slug'))
        ).exists():
            return True
        return False
