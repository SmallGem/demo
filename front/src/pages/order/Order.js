import React, {Component} from 'react';
import Request from '../../utils/Request';
import OrderTable from "../../components/table/OrderTable";
import ItemTable from "../item/Item";

class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: []
        }
    }

    componentWillMount() {
        let urlShard = "/order";
        let orders = new Request('GET', urlShard);
        console.log(orders);

        this.setState({
            orders: orders,
        })
    }

    render() {
        return (
            <div className="container is-widescreen">
                <h2 className="title is-2">订单列表</h2>
                <OrderTable
                    orders={this.state.orders}
                    modifyOrder={order => this.props.modifyOrder(order)}
                />
            </div>
        )
    }
}

export default Order;
