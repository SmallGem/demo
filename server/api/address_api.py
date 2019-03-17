# -*- coding: utf-8 -*-
import uuid

from flask_restful import Resource, reqparse

from ..db import db
from ..model.address import Address
# 解析器=请求解析，请求解析器 req=request
parser = reqparse.RequestParser()
# 解析器附加参数 名字，性别，电话号，地址(类型，必须，帮助=错误信息)
parser.add_argument('name', type=str, required=True, help='{error_msg}')
parser.add_argument('gender', type=int, required=True, help='{error_msg}')
parser.add_argument('mobile', type=str, required=True, help='{error_msg}')
parser.add_argument('address', type=str, required=True, help='{error_msg}')

# post解析器=拷贝解析器
parser_post = parser.copy()
# post解析器.附加参数

parser_post.add_argument('user_id', type=str, required=True, help='{error_msg}')


class AddressAPI(Resource):

    def get(self, user_id):
        if user_id is None:
            addresses = [address.to_dist() for address in Address.query.all()]

            return addresses
        else:
            addresses = [address.to_dist() for address in Address.query.filter_by(user_id=user_id).all()]

            return addresses

    def post(self):
        args = parser_post.parse_args()

        address_id = uuid.uuid1()
        address = Address(
            id=address_id,
            name=args['name'],
            gender=args['gender'],
            mobile=args['mobile'],
            address=args['address'],
            user_id=args['user_id']
        )

        db.session.add(address)
        db.session.commit()

        return address.to_dist()

    def put(self, user_id):
        args = parser.parse_args()

        address = Address.query.get(user_id)
        if args['name'] != address.name:
            address.name = args['name']
        if args['gender'] != address.gender:
            address.gender = args['gender']
        if args['mobile'] != address.mobile:
            address.mobile = args['mobile']
        if args['address'] != address.address:
            address.address = args['address']

        db.session.commit()

        return address.to_dist()

    def delete(self, user_id):
        address = Address.query.get(user_id)

        db.session.delete(address)
        db.session.commit()

        return {
            'errcode': 0,
            'errmsg': 'ok'
        }
