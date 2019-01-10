import os

from flask import Flask, request, flash, redirect, url_for, render_template
from flask_restful import Api
from flask_uploads import UploadSet, configure_uploads

from .db import db
from .api.user import User


def create_app():
    # 创建并设置应用
    app = Flask(__name__, instance_relative_config=True)
    # 测试环境配置文件
    app.config.from_object('application.config')

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
    db.init_app(app)

    # 注册 API 路由
    api = Api(app)

    api.add_resource(User, '/user', '/user/<string:user_id>')

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

    return app
