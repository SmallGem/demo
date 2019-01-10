# -*- coding: utf-8 -*-
from sqlalchemy.dialects.postgresql import JSON, UUID

from ..db import db, BaseMixin


class Cart(db.Model, BaseMixin):

    items = db.Column(JSON, nullable=False)
    user_id = db.Column(UUID, db.ForeignKey('user.id'), unique=True, nullable=False)
