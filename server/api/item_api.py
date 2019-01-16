# -*- coding: utf-8 -*-
import uuid

from flask_restful import Resource, reqparse

from ..db import db
from ..model.item import Item

parser = reqparse.RequestParser()
parser.add_argument('name', type=str, required=True, help='{error_msg}')
parser.add_argument('image', type=str, help='{error_msg}')
parser.add_argument('description', type=str, help='{error_msg}')
parser.add_argument('price', type=float, required=True, help='{error_msg}')
parser.add_argument('catalog_id', type=str, required=True, help='{error_msg}')


class ItemAPI(Resource):

    def get(self, item_id=None):
        if item_id is None:
            items = [item.to_dist() for item in Item.query.all()]

            return items
        else:
            items = [item.to_dist() for item in Item.query.filter_by(catalog_id=item_id).all()]

            return items

    def post(self):
        args = parser.parse_args()

        item_id = uuid.uuid1()
        item = Item(
            id=item_id,
            name=args['name'],
            image=args['image'],
            description=args['description'],
            price=args['price'],
            catalog_id=args['catalog_id']
        )

        db.session.add(item)
        db.session.commit()

        return item.to_dist()

    def put(self, item_id):
        args = parser.parse_args()

        item = Item.query.get(item_id)
        if args['name'] != item.name:
            item.name = args['name']
        if args['image'] != item.image:
            item.image = args['image']
        if args['description'] != item.description:
            item.description = args['description']
        if args['price'] != item.price:
            item.price = args['price']
        if args['catalog_id'] != item.catalog_id:
            item.catalog_id = args['catalog_id']

        db.session.commit()

        return item.to_dist()

    def delete(self, item_id):
        item = Item.query.get(item_id)

        db.session.delete(item)
        db.session.commit()

        return 'ok'
