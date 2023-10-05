from rest_framework.pagination import PageNumberPagination


class CustomUsersPaginator(PageNumberPagination):
    page_size_query_param = 'limit'
