# -*- coding: utf-8 -*-
import requests

from flask import current_app

url_prefix = current_app().config['API_URL']


def get(url_shard):

    url = url_prefix + url_shard
    result = requests.get(url)

    return result


def post(url_shard, data):

    url = url_prefix + url_shard
    result = requests.post(url, data)
