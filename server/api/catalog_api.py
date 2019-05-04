# -*- coding: utf-8 -*-
from flask_restful import Resource, reqparse

from ..model import db
from ..model.catalog import Catalog
from ..model.item import Item

parser = reqparse.RequestParser()
parser.add_argument('name', type=str, required=True, help='{error_msg}')


class CatalogAPI(Resource):

    def get(self, catalog_id=None):
        if catalog_id is None:
            catalogs = [catalog.to_dist() for catalog in Catalog.query.all()]
            print(catalogs)
            return catalogs
        else:
            catalog = Catalog.query.get(catalog_id)

            return catalog.to_dist()

    def post(self):
        args = parser.parse_args()

        catalog = Catalog(
            name=args['name']
        )

        db.session.add(catalog)
        db.session.commit()

        return catalog.to_dist()

    def put(self, catalog_id):
        args = parser.parse_args()

        catalog = Catalog.query.get(catalog_id)
        if args['name'] != catalog.name:
            catalog.name = args['name']

        db.session.commit()

        return catalog.to_dist()

    def delete(self, catalog_id):
        catalog = Catalog.query.get(catalog_id)
        items = Item.query.filter_by(catalog_id=catalog_id).all()

        db.session.delete(catalog)
        for item in items:
            db.session.delete(item)
        db.session.commit()

        return {
            'errcode': 0,
            'errmsg': 'ok'
        }
