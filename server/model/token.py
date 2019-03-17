# -*- coding: utf-8 -*-
from datetime import datetime

from ..db import db


# 类 记号 id=列，整数型主键=true，唯一=true，可空=false
# 访问令牌 列
# 有效期
# 签入时间 日期时间 可空 违约=世界时间 更新中世界时间
class Token(db.Model):

    id = db.Column(db.Integer, primary_key=True, unique=True, nullable=False)
    access_token = db.Column(db.String(512), nullable=False)
    expires_in = db.Column(db.Integer, nullable=False)
    expired_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow(), onupdate=datetime.utcnow())
