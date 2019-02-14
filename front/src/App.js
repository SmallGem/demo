import React, {Component} from 'react';
import Navbar from './components/Navbar';
import Menu from './components/Menu';
import Home from './pages/Home';
import Item from './pages/item/Item';
import AddItem from './pages/item/Add';
import ModifyItem from './pages/item/Modify';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeMenuItem: "home",
            item: null,
        }
    }

    selectMenuItem(pageId) {
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
            case "modifyItem":
                page = <ModifyItem/>;
                break;
            default:
                page = <Home/>;
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
