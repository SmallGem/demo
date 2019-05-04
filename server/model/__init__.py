# -*- coding: utf-8 -*-
import json
from datetime import datetime
from uuid import uuid1

from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.dialects.postgresql import UUID

db = SQLAlchemy()


# 类 id，创建，更新
class BaseMixin(object):

    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid1)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, onupdate=datetime.utcnow)

    def to_dist(self):
        """ 数据格式化为字典，可隐藏数据 """
        return {}

    def to_json(self):
        """ 字典格式化为 JSON """
        return json.dumps(self.to_dist())
