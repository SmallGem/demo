import React, {Component} from 'react';
import './item.css';
import Request from '../../utils/Request';
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
        items = this.getItems(0);;

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

    renderItems() {
        return this.state.items.map(item => {
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
        });
    }

    render() {
        return (
            <div>
                <h2 className="title is-2">商品列表</h2>
                {this.renderCatalogs()}
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
                    {this.renderItems()}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Item;
