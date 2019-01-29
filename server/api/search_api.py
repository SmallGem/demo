# -*- coding: utf-8 -*-
from flask_restful import Resource, reqparse

from ..model.item import Item

parser = reqparse.RequestParser()
parser.add_argument('name', type=str, required=True, help='{error_msg}')


class SearchAPI(Resource):

    def get(self, item_name):
        print(item_name)
        items = [item.to_dist() for item in Item.query.filter(Item.name.like(item_name)).all()]

        return items

    def post(self):
        args = parser.parse_args()
        print(args['name'])

        items = [item.to_dist() for item in Item.query.filter(Item.name.like('%' + args['name'] + '%')).all()]

        return items
