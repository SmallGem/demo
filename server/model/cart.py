# -*- coding: utf-8 -*-
from sqlalchemy.dialects.postgresql import JSON, UUID

from ..db import db, BaseMixin


class Cart(db.Model, BaseMixin):

    items = db.Column(JSON)
    user_id = db.Column(UUID(as_uuid=True), unique=True, nullable=False)

    def to_dist(self):
        return {
            'items': self.items
        }
