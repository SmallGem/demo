# -*- coding: utf-8 -*-
from datetime import datetime

from ..db import db


class Token(db.Model):

    id = db.Column(db.Integer, primary_key=True, unique=True, nullable=False)
    access_token = db.Column(db.String(512), nullable=False)
    expires_in = db.Column(db.Integer, nullable=False)
    expired_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow(), onupdate=datetime.utcnow())
