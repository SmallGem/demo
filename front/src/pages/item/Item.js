import React, {Component} from 'react';
import './item.css';
import Request from '../../utils/Request';
import CatalogDropdown from '../../components/dropdown/CatalogDropdown';
import ItemTable from '../../components/table/ItemTable';
import CatalogAlert from '../../components/alert/CatalogAlert';

class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
            catalogs: [{
                id: 0,
                name: "全部"
            }],
            catalogSwitchIsActive: false,
            activeCatalog: {
                id: 0,
                name: "全部"
            },
            activeCatalogAlert: false,
            items: [],
        }
    }

    getCatalogs(catalogId = null) {
        const urlShard = catalogId ? "/catalog/" + catalogId : "/catalog";
        let catalogs = new Request("GET", urlShard);

        this.setState({
            catalogs: [{
                id: 0,
                name: "全部"
            }].concat(catalogs),
        });
    }

    getItems(catalogId) {
        const urlShard = catalogId === 0 ? "/item" : "/item/" + catalogId;
        let items = new Request("GET", urlShard);

        this.setState({
            items: items,
        });
    }

    switchCatalogs() {
        this.setState({
            catalogSwitchIsActive: !this.state.catalogSwitchIsActive,
        });
    }

    selectCatalog(catalogId, catalogName) {
        this.getItems(catalogId);

        this.setState({
            catalogSwitchIsActive: false,
            activeCatalog: {
                id: catalogId,
                name: catalogName
            },
        });
    }

    deleteCatalogAndItems() {
        const catalogId = this.state.activeCatalog.id;
        const urlShard = "/catalog/" + catalogId;

        new Request("DELETE", urlShard);

        this.getCatalogs();
    }

    openCatalogAlert() {
        this.setState({
            activeCatalogAlert: true,
        });
    };

    closeCatalogAlert() {
        this.setState({
            activeCatalogAlert: false,
        })
    };

    componentWillMount() {
        this.getCatalogs();
        this.getItems(0);
    }

    renderCatalogAlert() {
        if (this.state.activeCatalogAlert) {
            return (
                <CatalogAlert
                    getCatalogs={() => this.getCatalogs()}
                    onClick={() => this.closeCatalogAlert()}
                />
            );
        }

        return null;
    }

    render() {
        return (
            <div className="container is-widescreen">
                <h2 className="title is-2">商品列表</h2>
                <nav className="level">
                    <div className="level-left">
                        <div className="level-item">
                            <CatalogDropdown
                                catalogs={this.state.catalogs}
                                activeCatalog={this.state.activeCatalog.name}
                                onClick={(catalogId, catalogName) => this.selectCatalog(catalogId, catalogName)}
                            />
                        </div>
                        <div className="level-item">
                            <button className="button is-primary" onClick={() => this.openCatalogAlert()}>添加分类</button>
                        </div>
                        <div className="level-item">
                            <button
                                className="button is-danger"
                                onClick={() => this.deleteCatalogAndItems()}
                            >
                                删除分类及分类内物品
                            </button>
                        </div>
                        <div className="level-item">
                            <button
                                className="button is-primary"
                                onClick={() => this.props.selectMenuItem("addItem")}
                            >
                                添加商品
                            </button>
                        </div>
                    </div>
                </nav>
                <ItemTable
                    items={this.state.items}
                    modifyItem={item => this.props.modifyItem(item)}
                />
                {this.renderCatalogAlert()}
            </div>
        )
    }
}

export default Item;
