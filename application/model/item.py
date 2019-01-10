from sqlalchemy.dialects.postgresql import UUID

from ..db import db, BaseMixin


class Item(db.Model, BaseMixin):

    name = db.Column(db.String(16), unique=True, nullable=False)
    image = db.Column(db.String(128), unique=True)
    description = db.Column(db.String(200))
    price = db.Column(db.DECIMAL(6, 2), nullable=False)
    catalog_id = db.Column(UUID, db.ForeignKey('catalog.id'), unique=True, nullable=True)
