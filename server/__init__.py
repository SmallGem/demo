# -*- coding: utf-8 -*-
import os

from flask import Flask, request, flash, redirect, url_for, render_template, session, make_response
from flask_uploads import UploadSet, configure_uploads


def create_app():
    # 创建并设置应用
    app = Flask(__name__, instance_relative_config=True)
    # 开发环境配置文件
    app.config.from_object('server.config')

    # 生产环境配置文件
    # with app.open_instance_resource('config.py') as f:
    #     f.read()
    #     app.config.from_pyfile('config.py', silent=True)

    # 确保实例文件夹存在
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    # 加载数据库
    from .db import db
    db.init_app(app)

    # 注册 API 路由
    from flask_restful import Api
    api = Api(app)

    from .api.user_api import UserAPI
    from .api.catalog_api import CatalogAPI
    from .api.item_api import ItemAPI
    from .api.cart_api import CartAPI
    from .api.order_api import OrderAPI
    from .api.address_api import AddressAPI
    from .api.search_api import SearchAPI
    api.add_resource(UserAPI, '/user', '/user/<string:user_id>')
    api.add_resource(CatalogAPI, '/catalog', '/catalog/<string:catalog_id>')
    api.add_resource(ItemAPI, '/item', '/item/<string:item_id>')
    api.add_resource(CartAPI, '/cart', '/cart/<string:user_id>')
    api.add_resource(OrderAPI, '/order', '/order/<string:user_id>')
    api.add_resource(AddressAPI, '/address', '/address/<string:user_id>')
    api.add_resource(SearchAPI, '/search', '/search/<string:item_name>')

    @app.route('/')
    def index():
        return render_template('index.html')

    @app.route('/login', methods=('GET', 'POST'))
    def login():
        if request.method == 'POST':
            username = request.form['username']
            password = request.form['password']

            if username == 'admin' and password == 'admin':
                response = make_response(redirect(url_for('index')))
                response.set_cookie('username', username)
                return response

        return redirect(url_for('index'))

    @app.route('/logout')
    def logout():
        response = make_response(redirect(url_for('index')))
        response.delete_cookie('username')
        return response

    # 测试代码
    avatar = UploadSet('avatar', default_dest=lambda instance: app.instance_path + '/avatar')
    configure_uploads(app, avatar)

    @app.route('/upload', methods=['GET', 'POST'])
    def upload():
        if request.method == 'POST' and 'avatar' in request.files:
            filename = avatar.save(request.files['avatar'])
            flash("Avatar saved.")
            return redirect(url_for('show', name=filename))
        return render_template('upload.html')

    @app.route('/photo/<name>')
    def show(name):
        url = avatar.url(name)
        return render_template('show.html', url=url)

    @app.route('/cookie')
    def cookie():
        session['session-name'] = 'Tricker Pan'
        return 'Hello, session'

    return app
