# -*- coding: utf-8 -*-
from datetime import datetime, timedelta

from flask import current_app

from ..db import db
from ..model.token import Token
from .request_controller import get


def get_access_token():
    token = Token.query.get(1)

    if not token:
        return get_access_token_from_api(new=True)

    if datetime.utcnow() > token.expired_at:
        return get_access_token_from_api()

    return token.access_token


def get_access_token_from_api(new=False):

    app_id = current_app.config['APP_ID']
    app_secret = current_app.config['APP_SECRET']
    url_shard = 'cgi-bin/token?grant_type=client_credential&appid=' + app_id + '&secret=' + app_secret

    result = get(url_shard).json()

    if 'errcode' in result:
        return result
    if new:
        _add_access_token(result)
    else:
        _update_access_token(result)

    return result['access_token']


def _add_access_token(result):

    token = Token(
        access_token=result['access_token'],
        expires_in=result['expires_in'],
        expired_at=datetime.utcnow() + timedelta(seconds=result['expires_in'])
    )
    db.session.add(token)
    db.session.commit()


def _update_access_token(result):

    token = Token.query.get(1)
    token.access_token = result['access_token']
    token.expires_in = result['expires_ind']
    db.session.comiit()
