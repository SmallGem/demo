# -*- coding: utf-8 -*-
from ..db import db, BaseMixin


class Catalog(db.Model, BaseMixin):

    catalog = db.Column(db.String(6), unique=True, nullable=False)

    def to_dist(self):
        return {
            'id': str(self.id),
            'catalog': self.catalog
        }
