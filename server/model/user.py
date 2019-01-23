# -*- coding: utf-8 -*-
from ..db import db, BaseMixin


class User(db.Model, BaseMixin):

    nickname = db.Column(db.String(16))
    avatar = db.Column(db.String(128))
    gender = db.Column(db.Integer)
    country = db.Column(db.String(16))
    province = db.Column(db.String(16))
    city = db.Column(db.String(16))
    openid = db.Column(db.String(64), unique=True, nullable=False)
    session_key = db.Column(db.String(64), unique=True, nullable=False)

    def to_dist(self):
        return {
            'id': str(self.id),
            'nickname': self.nickname,
            'avatar': self.avatar,
            'gender': self.gender,
            'country': self.country,
            'province': self.province,
            'city': self.city
        }
