# -*- coding: utf-8 -*-
from ..db import db, BaseMixin


# 类 用户昵称 列 字符串最长16 头像 性别 国家 省份 城市 开放式认证系统 会话秘钥(唯一的，可空)
class User(db.Model, BaseMixin):

    nickname = db.Column(db.String(16))
    avatar = db.Column(db.String(128))
    gender = db.Column(db.Integer)
    country = db.Column(db.String(16))
    province = db.Column(db.String(16))
    city = db.Column(db.String(16))
    openid = db.Column(db.String(64), unique=True, nullable=False)
    session_key = db.Column(db.String(64), unique=True, nullable=False)

    # 数据格式化为字典，隐藏数据
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
