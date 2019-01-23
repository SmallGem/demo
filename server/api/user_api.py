# -*- coding: utf-8 -*-
import uuid

from flask import current_app, session
from flask_restful import Resource, reqparse

from ..controller.request_controller import get
from ..db import db
from ..model.user import User

parser = reqparse.RequestParser()
parser.add_argument('nickname', type=str, help='{error_msg}')
parser.add_argument('avatar', type=str, help='{error_msg}')
parser.add_argument('gender', type=int, help='{error_msg}')
parser.add_argument('country', type=str, help='{error_msg}')
parser.add_argument('province', type=str, help='{error_msg}')
parser.add_argument('city', type=str, help='{error_msg}')

parser_post = parser.copy()
parser_post.add_argument('code', type=str, required=True, help='{error_msg}')


class UserAPI(Resource):

    def get(self, user_id=None):
        if user_id is None:
            users = [user.to_dist() for user in User.query.all()]

            return users
        else:
            user = User.query.get(user_id)

            return user.to_dist()

    def post(self):
        args = parser_post.parse_args()

        app_id = current_app.config['APP_ID']
        app_secret = current_app.config['APP_SECRET']
        code = args['code']
        url_shard = 'sns/jscode2session?appid=' + app_id + '&secret=' + app_secret \
                    + '&js_code=' + code + '&grant_type=authorization_code'

        result = get(url_shard)

        if 'errcode' in result:
            return result

        user = User.query.filter_by(openid=result['openid']).first()
        if user:
            if args['nickname'] != user.nickname:
                user.nickname = args['nickname']
            if args['avatar'] != user.avatar:
                user.avatar = args['avatar']
            if args['gender'] != user.gender:
                user.gender = args['gender']
            if args['country'] != user.country:
                user.country = args['country']
            if args['province'] != user.province:
                user.province = args['province']
            if args['city'] != user.city:
                user.city = args['city']
            if result['session_key'] != user.session_key:
                user.session_key = result['session_key']

            db.session.commit()

            return user.to_dist()

        user_id = uuid.uuid1()
        user = User(
            id=user_id,
            nickname=args['nickname'],
            avatar=args['avatar'],
            gender=args['gender'],
            country=args['country'],
            province=args['province'],
            city=args['city'],
            openid=result['openid'],
            session_key=result['session_key']
        )

        db.session.add(user)
        db.session.commit()

        return user.to_dist()

    def put(self, user_id):
        args = parser.parse_args()

        user = User.query.get(user_id)
        if args['nickname'] != user.nickname:
            user.nickname = args['nickname']
        if args['avatar'] != user.avatar:
            user.avatar = args['avatar']
        if args['gender'] != user.gender:
            user.gender = args['gender']
        if args['country'] != user.country:
            user.country = args['country']
        if args['province'] != user.province:
            user.province = args['province']
        if args['city'] != user.city:
            user.city = args['city']

        db.session.commit()

        return user.to_dist()

    def delete(self, user_id):
        user = User.query.get(user_id)

        db.session.delete(user)
        db.session.commit()
