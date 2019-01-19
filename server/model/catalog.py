# -*- coding: utf-8 -*-
from ..db import db, BaseMixin


class Catalog(db.Model, BaseMixin):

    name = db.Column(db.String(6), unique=True, nullable=False)

    def to_dist(self):
        return {
            'id': str(self.id),
            'name': self.name
        }
