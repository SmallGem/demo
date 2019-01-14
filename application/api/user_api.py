# -*- coding: utf-8 -*-
from flask_restful import Resource, reqparse

from ..db import db
from ..model.user import User

parser = reqparse.RequestParser()
parser.add_argument('nickname', type=str, help='{error_msg}')
parser.add_argument('avatar', type=str, help='{error_msg}')
parser.add_argument('gender', type=int, help='{error_msg}')
parser.add_argument('country', type=str, help='{error_msg}')
parser.add_argument('province', type=str, help='{error_msg}')
parser.add_argument('city', type=str, help='{error_msg}')


class UserAPI(Resource):

    def get(self, user_id=None):
        if user_id is None:
            users = [user.to_dist() for user in User.query.all()]

            return users
        else:
            user = User.query.get(user_id)

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
