from http import HTTPStatus

import pytest


@pytest.mark.django_db(transaction=True)
class Test00UserRegistration:
    url_signup = '/api/users/'
    url_token = '/api/auth/token/'

    def test_00_nodata_signup(self, client):
        response = client.post(self.url_signup)

        assert response.status_code != HTTPStatus.NOT_FOUND, (
            f'Эндпоинт `{self.url_signup}` не найден. Проверьте настройки '
            'в *urls.py*.'
        )
    # assert response.status_code == HTTPStatus.BAD_REQUEST, (
    #     f'Если POST-запрос, отправленный на эндпоинт `{self.url_signup}`, '
    #     'не содержит необходимых данных, должен вернуться ответ со '
    #     'статусом 400.'
    # )
    # response_json = response.json()
    # empty_fields = ['email', 'password']
    # for field in empty_fields:
    #     assert (field in response_json
    #             and isinstance(response_json.get(field), list)), (
    #         f'Если в POST-запросе к `{self.url_signup}` не переданы '
    #         'необходимые данные, в ответе должна возвращаться информация '
    #         'об обязательных для заполнения полях.'
    #     )

    # def test_00_invalid_data_signup(self, client, django_user_model):
    #     invalid_data = {
    #         'email': 'invalid_email',
    #         'password': 'invalid_pass'
    #     }
    #     users_count = django_user_model.objects.count()

    #     response = client.post(self.url_signup, data=invalid_data)
    #     data_json = response.json()

    #     assert response.status_code != HTTPStatus.NOT_FOUND, (
    #         f'Эндпоинт `{self.url_signup}` не найден. Проверьте настройки '
    #         'в *urls.py*.'
    #     )
    #     assert response.status_code == HTTPStatus.BAD_REQUEST, (
    #         f'Если POST-запрос к эндпоинту `{self.url_signup}` содержит '
    #         'некорректные данные, должен вернуться ответ со статусом 400.'
    #     )
    #     assert users_count == django_user_model.objects.count(), (
    #         f'Еслли POST-запрос к эндпоинту {self.url_signup} содержит'
    #         'некорректные данные, не должен создаваться пользователь в БД.'
    #     )
    #     for field in invalid_data:
    #         assert (field in data_json
    #                 and isinstance(data_json.get(field), list)), (
    #             f'Если в  POST-запросе к `{self.url_signup}` переданы '
#             'некорректные данные, в ответе должна возвращаться информация '
    #             'о неправильно заполненных полях.'
    #         )
