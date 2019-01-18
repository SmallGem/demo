# -*- coding: utf-8 -*-
from sqlalchemy.dialects.postgresql import UUID

from ..db import db, BaseMixin
from ..model.catalog import Catalog


class Item(db.Model, BaseMixin):

    name = db.Column(db.String(16), unique=True, nullable=False)
    image = db.Column(db.String(128))
    description = db.Column(db.String(200))
    price = db.Column(db.DECIMAL(6, 2), nullable=False)
    catalog_id = db.Column(UUID, nullable=True)

    def to_dist(self):
        return {
            'id': str(self.id),
            'name': self.name,
            'image': self.image,
            'description': self.description,
            'price': str(self.price),
            'catalog': Catalog.query.get(self.catalog_id).to_dist()
        }