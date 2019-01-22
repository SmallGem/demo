import React, {Component} from 'react';

function ItemList(props) {
    return props.items.map(item => {
        let id = item.id;
        let name = item.name;
        let image = item.image;
        let description = item.description;
        let price = item.price;
        let sold = item.sold;

        return (
            <tr>
                <th>{name}</th>
                <td><img src={image} alt={name}/></td>
                <td>{description}</td>
                <td>￥{price}</td>
                <td>{sold}</td>
                <td>
                    <button className="button is-info">修改</button>
                    <button className="button is-danger">删除</button>
                </td>
            </tr>
        )
    })
}

class ItemTable extends Component {
    render() {
        return (
            <table className="table is-hoverable is-bordered">
                <thead>
                <tr>
                    <th className="item-name">名称</th>
                    <th className="item-image">图片</th>
                    <th className="item-description">介绍</th>
                    <th className="item-price">价格</th>
                    <th className="item-sold">已售</th>
                    <th className="item-option">操作</th>
                </tr>
                </thead>
                <tbody>
                <ItemList items={this.props.items}/>
                </tbody>
            </table>
        )
    }
}

export default ItemTable;
