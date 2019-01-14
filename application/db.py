# -*- coding: utf-8 -*-
import uuid
from datetime import datetime

from flask import current_app
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.dialects.postgresql import UUID

db = SQLAlchemy()


class BaseMixin(object):

    id = db.Column(UUID(as_uuid=True), primary_key=True, unique=True, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, onupdate=datetime.utcnow)
