# -*- coding: utf-8 -*-
import uuid

from flask_restful import Resource, reqparse

from ..db import db
from ..model.catalog import Catalog

parser = reqparse.RequestParser()
parser.add_argument('catalog', type=str, required=True, help='{error_msg}')


class CatalogAPI(Resource):

    def get(self, catalog_id=None):
        if catalog_id is None:
            catalogs = [catalog.to_dist() for catalog in Catalog.query.all()]

            return catalogs
        else:
            catalog = Catalog.query.get(catalog_id)

            return catalog.to_dist()

    def post(self):
        args = parser.parse_args()

        catalog_id = uuid.uuid1()
        catalog = Catalog(
            id=catalog_id,
            catalog=args['catalog']
        )

        db.session.add(catalog)
        db.session.commit()

        return catalog.to_dist()

    def put(self, catalog_id):
        args = parser.parse_args()

        catalog = Catalog.query.get(catalog_id)
        if args['catalog'] != catalog.catalog:
            catalog.catalog = args['catalog']

        db.session.commit()

        return catalog.to_dist()

    def delete(self, catalog_id):
        catalog = Catalog.query.get(catalog_id)

        db.session.delete(catalog)
        db.session.commit()

        return 'ok'
