# -*- coding: utf-8 -*-
from sqlalchemy.dialects.postgresql import UUID

from ..db import db, BaseMixin


# 地址 名字 性别 电话号 地址 用户id
class Address(db.Model, BaseMixin):

    name = db.Column(db.String(8), nullable=False)
    gender = db.Column(db.Integer, nullable=False)
    mobile = db.Column(db.String(11), nullable=False)
    address = db.Column(db.String(200), nullable=False)
    user_id = db.Column(UUID(as_uuid=True), nullable=False)

    # 格式化为字典，可隐藏数据
    def to_dist(self):
        return {
            'id': str(self.id),
            'name': self.name,
            'gender': self.gender,
            'mobile': self.mobile,
            'address': self.address
        }
