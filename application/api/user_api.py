# -*- coding: utf-8 -*-
from flask_restful import Resource, reqparse

parser = reqparse.RequestParser()
parser.add_argument('nickname', type=str, required=True, help='{error_msg}')


class UserAPI(Resource):

    def get(self, user_id=None):
        if user_id is None:
            return {'msg': 'Don\'t have id.', 'method': 'get'}
        else:
            return {'msg': 'Accept ' + user_id + '.', 'method': 'get'}

    def post(self):
        args = parser.parse_args()
        return {'msg': 'Accept post', 'nickname': args['nickname'], 'method': 'post'}

    def put(self, user_id):
        args = parser.parse_args()
        return {'msg': 'Accept ' + user_id + '.', 'nickname': args['nickname'], 'method': 'put'}

    def delete(self, user_id):
        return {'msg': 'Accept ' + user_id + '.', 'method': 'delete'}
