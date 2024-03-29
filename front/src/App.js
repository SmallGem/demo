import React, {Component} from 'react';
import Navbar from './components/Navbar';
import Menu from './components/Menu';
import Home from './pages/Home';
import Item from './pages/item/Item';
import AddItem from './pages/item/Add';
import Order from './pages/order/Order';
import User from './pages/user/User';
import AddOrder from "./pages/order/Add";


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeMenuItem: "orders",
            item: null,
            order: null,
        }
    }

    selectMenuItem(pageId) {
        if (this.state.item) {
            this.setState({
                activeMenuItem: pageId,
                item: null
            });
            return;
        }

        this.setState({
            activeMenuItem: pageId,
        })
    };

    modifyItem(item) {
        this.setState({
            item: item,
            activeMenuItem: "addItem",
        })
    }

    modifyOrder(order) {
        this.setState({
            order: order,
            activeMenuItem: "addOrder",
        })
    }

    renderPage() {
        let page;
        switch (this.state.activeMenuItem) {
            case "home":
                page = <Home/>;
                break;
            case "items":
                page = <Item
                    selectMenuItem={pageId => this.selectMenuItem(pageId)}
                    modifyItem={item => this.modifyItem(item)}
                />;
                break;
            case "addItem":
                page = <AddItem
                    selectMenuItem={pageId => this.selectMenuItem(pageId)}
                    item={this.state.item}
                />;
                break;
            case "orders":
                page = <Order
                    selectMenuOrder={pageId => this.selectMenuOrder(pageId)}
                    modifyOrder={order => this.modifyOrder(order)}
                />;
                break;
            case "addOrder":
                page = <AddOrder
                    selectMenuOrder={pageId => this.selectMenuOrder(pageId)}
                    order={this.state.order}
                />;
                break;
            case "users":
                page = <User/>;
                break;
            default:
                page = <Order/>;
        }
        return page
    };

    render() {
        return (
            <div>
                <Navbar/>
                <div className="columns">
                    <div className="column is-one-fifth">
                        <section className="section">
                            <Menu
                                value={this.state.activeMenuItem}
                                onClick={(pageId) => this.selectMenuItem(pageId)}
                            />
                        </section>
                    </div>
                    <div className="column is-four-fifths">
                        <section className="section">
                            {this.renderPage()}
                        </section>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
