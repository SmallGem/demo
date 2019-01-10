# -*- coding: utf-8 -*-
from flask import current_app


def get_access_token():
    app_id = current_app.config['APP_ID']
    app_secret = current_app.config['APP_SECRET']
    url_shard = 'token?grant_type=client_credential&appid=' + app_id + '&secret=' + app_secret
