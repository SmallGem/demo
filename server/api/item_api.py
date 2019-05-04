# -*- coding: utf-8 -*-
from flask_restful import Resource, reqparse, current_app
from flask_uploads import UploadSet
from werkzeug.datastructures import FileStorage

from ..model import db
from ..model.item import Item

parser = reqparse.RequestParser()
parser.add_argument('name', type=str, required=True, help='{error_msg}')
parser.add_argument('image', type=FileStorage, location='files', help='{error_msg}')
parser.add_argument('description', type=str, help='{error_msg}')
parser.add_argument('price', type=float, required=True, help='{error_msg}')
parser.add_argument('catalog_id', type=str, required=True, help='{error_msg}')

image_upload = UploadSet('image', default_dest=lambda instance: current_app.instance_path + '/item_image')


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

        if args['image'] is not None:
            image = image_upload.save(args['image'])
            image = image_upload.url(image)
        else:
            image = None

        item = Item(
            name=args['name'],
            image=image,
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

        if args['image'] is not None:
            image = image_upload.save(args['image'])
            image = image_upload.url(image)
            item.image = image
        if args['name'] != item.name:
            item.name = args['name']
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
