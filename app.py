# -*- coding: utf-8 -*-
from flask_migrate import Migrate

from server import create_app
from server.model import db
from server.model.address import Address
from server.model.cart import Cart
from server.model.catalog import Catalog
from server.model.item import Item
from server.model.order import Order
from server.model.token import Token
from server.model.user import User

app = create_app()
migrate = Migrate(app, db)


@app.shell_context_processor
def make_shell_context():
    return dict(
        db=db,
        User=User,
        Address=Address,
        Catalog=Catalog,
        Item=Item,
        Cart=Cart,
        Order=Order,
        Token=Token
    )
