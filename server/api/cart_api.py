# -*- coding: utf-8 -*-
import uuid

from flask_restful import Resource, reqparse

from ..db import db
from ..model.cart import Cart

parser = reqparse.RequestParser()
parser.add_argument('items', type=str, help='{error_msg}')


class CartAPI(Resource):

    def get(self, user_id):
        if user_id is None:
            carts = [cart.to_dist() for cart in Cart.query.all()]

            return carts
        else:
            cart = Cart.query.filter_by(user_id=user_id).first()

            if cart is None:
                cart_id = uuid.uuid1()
                cart = Cart(
                    id=cart_id,
                    user_id=user_id,
                )

                db.session.add(cart)
                db.session.commit()

                return cart.to_dist()

            return cart.to_dist()

    def put(self, user_id):
        args = parser.parse_args()

        cart = Cart.query.filter_by(user_id=user_id).first()
        if args['items'] != cart.items:
            cart.items = args['items']

        db.session.commit()

        return cart.to_dist()

    def delete(self, user_id):
        cart = Cart.query.filter_by(user_id=user_id).first()

        db.session.delete(cart)
        db.session.commit()

        return 'ok'
