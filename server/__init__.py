# -*- coding: utf-8 -*-
import os

from flask import Flask, request, flash, redirect, url_for, render_template, session, make_response


def create_app():
    # 创建并设置应用
    app = Flask(__name__, instance_relative_config=True)
    # 开发环境配置文件
    app.config.from_object('server.config')

    # 生产环境配置文件
    # with app.open_instance_resource('config.py') as f:
    #     f.read()
    #     app.config.from_pyfile('config.py', silent=True)

    # 确保实例文件夹存在,os.makedirs创建目录，除了操作系统错误
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    # 为测试用跨域设置
    from flask_cors import CORS  # 导入跨域包

    CORS(app)

    # 加载数据库
    from .db import db
    db.init_app(app)

    # 上传设置
    from flask_uploads import UploadSet, configure_uploads

    image_upload = UploadSet('image', default_dest=lambda instance: app.instance_path + '/item_image')
    configure_uploads(app, image_upload)

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

    # 路线，入口，返回入口
    @app.route('/')
    def index():
        return render_template('index.html')

    # 登录，方法GET，POST，如果请求方法为POST 用户名请求用户表单，密码请求密码表单
    @app.route('/login', methods=('GET', 'POST'))
    def login():
        if request.method == 'POST':
            username = request.form['username']
            password = request.form['password']

            # 如果用户名为admin并且密码为admin，响应=制造响应重定向入口，返回响应
            if username == 'admin' and password == 'admin':
                response = make_response(redirect(url_for('index')))
                response.set_cookie('username', username)
                return response

        # 返回重定向入口
        return redirect(url_for('index'))

    # 注销
    @app.route('/logout')
    def logout():
        # 响应=制造响应重定向入口
        response = make_response(redirect(url_for('index')))
        # 响应删除键为username的cookie
        response.delete_cookie('username')
        # 返回响应
        return response

    return app
