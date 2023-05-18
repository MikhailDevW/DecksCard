from rest_framework import permissions


class OwnerOnly(permissions.BasePermission):
    '''Если колода принадлежит автору... то ОК'''
    def has_permission(self, request, view):
        deck = request.META['HTTP_REFERER'].split('/')[-2]
        if request.user.decks.filter(id=deck).exists():
            return True
        return False
        # return (request.user.is_authenticated)

    def has_object_permission(self, request, view, obj):
        return (
            obj.author == request.user
        )


class OwnerOrReadOnly(OwnerOnly):
    def has_object_permission(self, request, view, obj):
        return (
            obj.author == request.user
            or request.method in permissions.SAFE_METHODS
        )
