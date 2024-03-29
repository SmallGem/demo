import React, {Component} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Request from "../../utils/Request";

class OrderList extends Component {
    static deleteOrder(orderId) {
        console.log(orderId);
        let urlShard = "/order/" + orderId;
        new Request("DELETE", urlShard);
    }

    render() {
        return this.props.orders.map(order => {
            console.log(order);
            let id = order.id;
            let number = order.number;
            let price = order.price;
            let address = order.address;
            let created_at = order.created_at;

            let items = JSON.parse(order.items);
            items = items.map(item => {
                return <p>{item.name} * {item.count}份</p>
            });

            let gender;
            switch (address.gender) {
                case 1:
                    gender = "先生";
                    break;
                case 2:
                    gender = "女士";
                    break;
                default:
                    gender = "保密";
            }

            return (
                <tr key={id}>
                    <th>{number}</th>
                    <th>{items}</th>
                    <th>￥{price}</th>
                    <th>
                        <p>{address.name} {gender}</p>
                        <p>手机号: {address.mobile}</p>
                        <p>{address.address}</p>
                    </th>
                    <th>{created_at}</th>
                    <td>
                        <button className="button is-info" onClick={() => this.props.modifyOrder(order)}>修改</button>
                        <button className="button is-danger" onClick={() => OrderList.deleteOrder(id)}>删除</button>
                    </td>
                </tr>
            )
        })
    }
}

class OrderTable
    extends Component {
    render() {
        return (
            <table className="table is-hoverable is-bordered">
                <thead>
                <tr>
                    <th>订单编号</th>
                    <th>商品</th>
                    <th>总价</th>
                    <th>地址</th>
                    <th>时间</th>
                    <th className="order-option">操作</th>
                </tr>
                </thead>
                <tbody>
                <OrderList
                    orders={this.props.orders || []}
                    modifyOrder={order => this.props.modifyOrder(order)}
                />
                </tbody>
            </table>
        )
    }
}

export default OrderTable;
