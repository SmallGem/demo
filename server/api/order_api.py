# -*- coding: utf-8 -*-
from flask_restful import Resource, reqparse

from ..db import db
from ..model.order import Order


class OrderAPI(Resource):

    def get(self, user_id):
        if user_id is None:
            pass
        else:
            pass

    def post(self):
        pass

    def put(self, user_id):
        pass

    def delete(self, user_id):
        pass
