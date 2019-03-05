# -*- coding: utf-8 -*-
from datetime import datetime
from time import localtime, strftime, time
import uuid

from flask_restful import Resource, reqparse

from ..db import db
from ..model.order import Order

parser = reqparse.RequestParser()
parser.add_argument('items', type=str, required=True, help='{error_msg}')
parser.add_argument('price', type=float, required=True, help='{error_msg}')
parser.add_argument('address_id', type=str, required=True, help='{error_msg}')

parser_post = parser.copy()
parser_post.add_argument('user_id', type=str, required=True, help='{error_msg}')


class OrderAPI(Resource):

    def get(self, user_id=None):
        if user_id is None:
            orders = [order.to_dist() for order in Order.query.all()]
        else:
            orders = [order.to_dist() for order in Order.query.filter_by(user_id=user_id)]

        return orders

    def post(self):
        args = parser_post.parse_args()
        print(args['items'])

        order_id = uuid.uuid1()
        order_number = 'NM' + str(int(time())) + str(strftime('%Y%m%d', localtime()))
        order = Order(
            id=order_id,
            number=order_number,
            items=args['items'],
            price=args['price'],
            address_id=args['address_id'],
            user_id=args['user_id']
        )

        db.session.add(order)
        db.session.commit()

        return order.to_dist()

    def put(self, user_id):
        pass

    def delete(self, user_id):
        pass
