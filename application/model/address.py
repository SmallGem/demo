# -*- coding: utf-8 -*-
from sqlalchemy.dialects.postgresql import UUID

from ..db import db, BaseMixin


class Address(db.Model, BaseMixin):

    name = db.Column(db.String(8), nullable=False)
    gender = db.Column(db.Integer, nullable=False)
    mobile = db.Column(db.String(11), nullable=False)
    address = db.Column(db.String(200), nullable=False)
    user_id = db.Column(UUID, nullable=False)
