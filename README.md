# 毕业设计
------

### 配置后台

```bash
# 生成虚拟环境
:~/demo$ python -m venv venv  
# 激活虚拟环境
# Unix
:~/demo$ source venv/bin/activate
# Windows
:~/demo$ venv\Scripts\activate
# 升级 pip
:~/demo$ pip install --upgrade pip
# 安装依赖
:~/demo$ pip install -r requirements.txt
# 设置环境变量
# Unix
:~/demo$ source init.sh
# Windows
:~/demo$ init.bat
```

### 配置前台

```bash
# 安装包
:~/demo/front$ yarn install
# 构建文件
:~/demo/front$ yarn build
```

### 运行项目

```bash
# 运行项目
:~/demo$ flask run
```



### 小程序端

使用微信开发者工具打开 `~/demo/miniprogram` 文件夹，并设置不检测 http 协议。
