import React, {Component} from 'react';
import Request from '../../utils/Request';

class ItemList extends Component {
    static deleteItem(itemId) {
        console.log(itemId);
        let urlShard = "/item/" + itemId;
        new Request("DELETE", urlShard);
    }

    render() {
        return this.props.items.map(item => {
            let id = item.id;
            let name = item.name;
            let image = item.image;
            let description = item.description;
            let price = item.price;
            let sold = item.sold;
            console.log(id);

            return (
                <tr key={id}>
                    <th>{name}</th>
                    <td><img src={image} alt={name}/></td>
                    <td>{description}</td>
                    <td>￥{price}</td>
                    <td>{sold}</td>
                    <td>
                        <button
                            className="button is-info"
                            onClick={() => this.props.modifyItem(item)}
                        >
                            修改
                        </button>
                        <button
                            className="button is-danger"
                            onClick={() => ItemList.deleteItem(id)}
                        >
                            删除
                        </button>
                    </td>
                </tr>
            )
        });
    }
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
                <ItemList
                    items={this.props.items || []}
                    modifyItem={item => this.props.modifyItem(item)}
                />
                </tbody>
            </table>
        )
    }
}

export default ItemTable;
