# -*- coding: utf-8 -*-
from time import time
import uuid

from sqlalchemy.dialects.postgresql import JSON, UUID

from . import db, BaseMixin
from ..model.address import Address


# 类 下订单 数字 商品 价格=列(十进制(最多六位，可以有两位小数)) 用户id
class Order(db.Model, BaseMixin):

    number = db.Column(db.String(64), unique=True, nullable=False)
    items = db.Column(JSON, nullable=False)
    price = db.Column(db.DECIMAL(6, 2), nullable=False)
    address_id = db.Column(UUID(as_uuid=True), nullable=False)
    user_id = db.Column(UUID(as_uuid=True), nullable=False)

    def __init__(self, **kwargs):
        super(Order, self).__init__(**kwargs)

    # 格式化为字典，可隐藏数据 返回id，数字，商品，价格，地址，创造
    def to_dist(self):
        return {
            'id': str(self.id),
            'number': self.number,
            'items': self.items,
            'price': str(self.price),
            'address': Address.query.get(self.address_id).to_dist(),
            'created_at': str(self.created_at)
        }
