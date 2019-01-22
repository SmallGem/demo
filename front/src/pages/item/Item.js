import React, {Component} from 'react';
import './item.css';
import Request from '../../utils/Request';
import ItemTable from '../../components/table/ItemTable';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
            catalogs: [{
                id: 0,
                name: "全部"
            }],
            catalogSwitchIsActive: false,
            activeCatalog: "全部",
            items: [],
        }
    }

    getCatalogs = (catalogId = null) => {
        const urlShard = catalogId ? "/catalog/" + catalogId : "/catalog";
        return new Request("GET", urlShard);
    };

    getItems = (catalogId) => {
        const urlShard = catalogId === 0 ? "/item" : "/item/" + catalogId;
        return new Request("GET", urlShard);
    };

    switchCatalogs = () => {
        this.setState({
            catalogSwitchIsActive: !this.state.catalogSwitchIsActive,
        });
    };

    selectCatalog = (catalogId, catalogName) => {
        let items;
        items = this.getItems(catalogId);
        console.log(items);

        this.setState({
            catalogSwitchIsActive: false,
            activeCatalog: catalogName,
            items: items,
        });
    };

    componentWillMount() {
        let catalogs, items;

        catalogs = this.getCatalogs();
        items = this.getItems(0);

        this.setState({
            catalogs: this.state.catalogs.concat(catalogs),
            items: items,
        });
    }

    renderCatalogs() {
        let catalogs = this.state.catalogs.map(catalog => {
            let id = catalog.id;
            let name = catalog.name;
            return (
                <a className={this.state.activeCatalog === name ? "dropdown-item is-active" : "dropdown-item"}
                   onClick={() => this.selectCatalog(id, name)}>
                    {name}
                </a>
            )
        });

        return (
            <div className={this.state.catalogSwitchIsActive ? "dropdown is-active" : "dropdown"}>
                <div className="dropdown-trigger" onClick={() => this.switchCatalogs()}>
                    <button className="button" aria-haspopup="true" aria-controls="dropdown-menu">
                        <span>{this.state.activeCatalog}</span>
                        <span className="icon is-small">
                            <FontAwesomeIcon icon="angle-down"/>
                        </span>
                    </button>
                </div>
                <div className="dropdown-menu" id="dropdown-menu" role="menu">
                    <div className="dropdown-content">
                        {catalogs}
                    </div>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div className="container is-widescreen">
                <h2 className="title is-2">商品列表</h2>
                <nav className="level">
                    <div className="level-left">
                        <div className="level-item">
                            {this.renderCatalogs()}
                        </div>
                        <div className="level-item">
                            <button className="button is-success">添加分类</button>
                        </div>
                        <div className="level-item">
                            <button className="button is-success">添加商品</button>
                        </div>
                    </div>
                </nav>
                <ItemTable items={this.state.items}/>
            </div>
        )
    }
}

export default Item;
