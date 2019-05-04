"""empty message

Revision ID: fbad8301c014
Revises: 
Create Date: 2019-05-05 01:47:16.257981

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = 'fbad8301c014'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('address',
    sa.Column('id', postgresql.UUID(as_uuid=True), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.Column('name', sa.String(length=8), nullable=False),
    sa.Column('gender', sa.Integer(), nullable=False),
    sa.Column('mobile', sa.String(length=11), nullable=False),
    sa.Column('address', sa.String(length=200), nullable=False),
    sa.Column('user_id', postgresql.UUID(as_uuid=True), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('cart',
    sa.Column('id', postgresql.UUID(as_uuid=True), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.Column('items', postgresql.JSON(astext_type=sa.Text()), nullable=True),
    sa.Column('user_id', postgresql.UUID(as_uuid=True), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('user_id')
    )
    op.create_table('catalog',
    sa.Column('id', postgresql.UUID(as_uuid=True), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.Column('name', sa.String(length=6), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name')
    )
    op.create_table('item',
    sa.Column('id', postgresql.UUID(as_uuid=True), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.Column('name', sa.String(length=16), nullable=False),
    sa.Column('image', sa.String(length=128), nullable=True),
    sa.Column('description', sa.String(length=200), nullable=True),
    sa.Column('price', sa.DECIMAL(precision=6, scale=2), nullable=False),
    sa.Column('sold', sa.Integer(), nullable=True),
    sa.Column('catalog_id', postgresql.UUID(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name')
    )
    op.create_table('order',
    sa.Column('id', postgresql.UUID(as_uuid=True), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.Column('number', sa.String(length=64), nullable=False),
    sa.Column('items', postgresql.JSON(astext_type=sa.Text()), nullable=False),
    sa.Column('price', sa.DECIMAL(precision=6, scale=2), nullable=False),
    sa.Column('address_id', postgresql.UUID(as_uuid=True), nullable=False),
    sa.Column('user_id', postgresql.UUID(as_uuid=True), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('number')
    )
    op.create_table('token',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('access_token', sa.String(length=512), nullable=False),
    sa.Column('expires_in', sa.Integer(), nullable=False),
    sa.Column('expired_at', sa.DateTime(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('id')
    )
    op.create_table('user',
    sa.Column('id', postgresql.UUID(as_uuid=True), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.Column('nickname', sa.String(length=16), nullable=True),
    sa.Column('avatar', sa.String(length=128), nullable=True),
    sa.Column('gender', sa.Integer(), nullable=True),
    sa.Column('country', sa.String(length=16), nullable=True),
    sa.Column('province', sa.String(length=16), nullable=True),
    sa.Column('city', sa.String(length=16), nullable=True),
    sa.Column('openid', sa.String(length=64), nullable=False),
    sa.Column('session_key', sa.String(length=64), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('openid'),
    sa.UniqueConstraint('session_key')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('user')
    op.drop_table('token')
    op.drop_table('order')
    op.drop_table('item')
    op.drop_table('catalog')
    op.drop_table('cart')
    op.drop_table('address')
    # ### end Alembic commands ###
