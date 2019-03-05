# -*- coding: utf-8 -*-
import uuid
import json

from flask_restful import Resource, reqparse

from ..db import db
from ..model.cart import Cart

parser = reqparse.RequestParser()
parser.add_argument('items', type=str, required=True, help='{error_msg}')


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

                return cart.items

            return cart.items

    def put(self, user_id):
        args = parser.parse_args()

        cart = Cart.query.filter_by(user_id=user_id).first()
        cart.items = args['items']

        db.session.commit()
        return cart.items

    def delete(self, user_id):
        cart = Cart.query.filter_by(user_id=user_id).first()

        db.session.delete(cart)
        db.session.commit()

        return 'ok'
