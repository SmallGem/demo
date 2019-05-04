# -*- coding: utf-8 -*-
# db和BaseMixin来着上两层db
from . import db, BaseMixin


# 类 目录 名字 列 字符串 唯一=true 可空=false
class Catalog(db.Model, BaseMixin):

    name = db.Column(db.String(6), unique=True, nullable=False)

    def __init__(self, **kwargs):
        super(Catalog, self).__init__(**kwargs)

    # 格式化为字典，可隐藏数据，返回字符串id 名字
    def to_dist(self):
        return {
            'id': str(self.id),
            'name': self.name
        }
