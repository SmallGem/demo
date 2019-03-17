# -*- coding: utf-8 -*-
from sqlalchemy.dialects.postgresql import JSON, UUID

from ..db import db, BaseMixin


# 购物车 商品 列josn，用户id，列，uuid(通用的唯一识别码) 唯一  不可空
class Cart(db.Model, BaseMixin):

    items = db.Column(JSON)
    user_id = db.Column(UUID(as_uuid=True), unique=True, nullable=False)

    # 格式化为字典，可隐藏数据，返回商品
    def to_dist(self):
        return {
            'items': self.items
        }
