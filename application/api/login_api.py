# -*- coding: utf-8 -*-
from flask import current_app
from flask_restful import Resource, reqparse

from ..controller.request_controller import get
from ..db import db
from ..model.user import User

parser = reqparse.RequestParser()
parser.add_argument('code', type=str, required=True, help='{error_msg}')


class LoginApi(Resource):

    def post(self):
        args = parser.parse_args()

        app_id = current_app.config['APP_ID']
        secret = current_app.config['APP_SECRET']
        code = args['code']
        url_shard = 'sns/jscode2session?appid=' + app_id + '&secret=' + secret + '&js_code=' + code + '&grant_type=authorization_code'

        result = get(url_shard)

        if result['errcode'] != 0:
            return result

        user = User(
            openid=result['openid'],
            session_key=result['session_key']
        )

        db.session.add(user)
        db.session.commit()

        return {
            'errcode': 0,
            'errmsg': 'ok',
            'user_id': user.id
        }
