# -*- coding: utf-8 -*-
import requests

from flask import current_app


def get(url_shard):

    url = current_app.config['API_URL'] + url_shard
    result = requests.get(url)
    return result


def post(url_shard, data):

    url = current_app.config['API_URL'] + url_shard
    result = requests.post(url, data)

    return result
