import React, {Component} from 'react';
import Navbar from './components/Navbar';
import Menu from './components/Menu';
import Home from './pages/Home';
import Catalog from './pages/catalog/Catalog';
import AddCatalog from './pages/catalog/Add';
import ModifyCatalog from './pages/catalog/Modify';
import Item from './pages/item/Item';
import AddItem from './pages/item/Add';
import ModifyItem from './pages/item/Modify';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeMenuItem: "home",
        }
    }

    selectMenuItem = (pageId) => {

        this.setState({
            activeMenuItem: pageId,
        })
    };

    renderPage() {
        let page;
        switch (this.state.activeMenuItem) {
            case "home":
                page = <Home/>;
                break;
            case "catalogs":
                page = <Catalog/>;
                break;
            case "addCatalog":
                page = <AddCatalog/>;
                break;
            case "modifyCatalog":
                page = <ModifyCatalog/>;
                break;
            case "items":
                page = <Item/>;
                break;
            case "addItem":
                page = <AddItem/>;
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
                            <div className="container is-widescreen">
                                {this.renderPage()}
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
