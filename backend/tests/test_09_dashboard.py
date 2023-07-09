from http import HTTPStatus

import pytest

# from tests.utils import (check_pagination, check_permissions,
#                          create_categories, create_genre, create_titles)


@pytest.mark.django_db(transaction=True)
class Test04TitleAPI:
    url_dashboard = '/api/v1/dashboard/'

    def test_01_dashboard_not_auth(self, client):
        response = client.get(self.url_dashboard)
        assert response.status_code != HTTPStatus.NOT_FOUND, (
            f'Эндпоинт {self.url_dashboard} не найден.Проверьте настройки в '
            '*urls.py*.'
        )
        assert response.status_code == HTTPStatus.UNAUTHORIZED, (
            f'Проверьте, что GET-запрос неавторизованного пользователя к '
            f'{self.url_dashboard} возвращает ответ со статусом 401.'
        )
        valid_data = {
            'title': 'Test Deck',
        }
        # 1. анонимус не може создать колоду
        # 2. анонимус не может отредактировать или удалить чью-то колоду
        # 3. анонимус
        response = client.post(self.url_dashboard, data=valid_data)
        assert response.status_code == HTTPStatus.UNAUTHORIZED, (
            'запрос должен вернуть....'
        )
        response = client.delete(self.url_dashboard)
        assert response.status_code == 401
