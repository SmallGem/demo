# -*- coding: utf-8 -*-
import uuid

from flask_restful import Resource, reqparse

from ..db import db
from ..model.address import Address

parser = reqparse.RequestParser()
parser.add_argument('name', type=str, required=True, help='{error_msg}')
parser.add_argument('gender', type=int, required=True, help='{error_msg}')
parser.add_argument('mobile', type=str, required=True, help='{error_msg}')
parser.add_argument('address', type=str, required=True, help='{error_msg}')

parser_post = parser.copy()
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

    def put(self, user_id):
        pass

    def delete(self, user_id):
        pass
