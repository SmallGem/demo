# -*- coding: utf-8 -*-
import requests

from flask import current_app


def get(url_shard):

    url = current_app.config['API_URL'] + url_shard
    result = requests.get(url)
    result.raise_for_status()

    return result


def post(url_shard, data):

    url = current_app.config['API_URL'] + url_shard
    result = requests.post(url, data)
    result.raise_for_status()

    return result
