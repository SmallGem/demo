# -*- coding: utf-8 -*-
from time import time
import uuid

from sqlalchemy.dialects.postgresql import JSON, UUID

from ..db import db, BaseMixin


class Order(db.Model, BaseMixin):

    number = db.Column(db.String(64), unique=True, nullable=False)
    items = db.Column(JSON, nullable=False)
    price = db.Column(db.DECIMAL(6, 2), nullable=False)
    address_id = db.Column(UUID, nullable=False)
    user_id = db.Column(UUID, nullable=False)
