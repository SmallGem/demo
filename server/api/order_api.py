# -*- coding: utf-8 -*-
from time import localtime, strftime, time

from flask_restful import Resource, reqparse

from ..model import db
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

        order_number = 'NM' + str(int(time())) + str(strftime('%Y%m%d', localtime()))
        order = Order(
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
        args = parser.parse_args()

        order = Order.query.get(user_id)

        if args['item'] != order.item:
            order.item = args['item']
        if args['price'] != order.price:
            order.price = args['price']
        if args['address'] != order.address:
            order.address = args['address']

        db.session.commit()

        return order.to_dist()

    def delete(self, user_id):
        order = Order.query.get(user_id)

        db.session.delete(order)
        db.session.commit()

        return 'ok'
