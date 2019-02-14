import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

class CatalogDropdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isActive: false,
        };
    }

    switchCatalogs() {
        this.setState({
            isActive: !this.state.isActive,
        })
    }

    selectCatalog(catalogId, catalogName) {
        this.setState({
            isActive: false,
        });
        this.props.onClick(catalogId, catalogName);
    }

    renderCatalogList() {
        return this.props.catalogs.map(catalog => {
            return (
                <a className={this.props.activeCatalog === catalog.name ? "dropdown-item is-active" : "dropdown-item"}
                   onClick={() => this.selectCatalog(catalog.id, catalog.name)}
                   key={catalog.id}
                >
                    {catalog.name}
                </a>
            );
        });
    }

    render() {
        return (
            <div className={this.state.isActive ? "dropdown is-active" : "dropdown"}>
                <div className="dropdown-trigger" onClick={() => this.switchCatalogs()}>
                    <button className="button" aria-haspopup="true" aria-controls="dropdown-menu">
                        <span>{this.props.activeCatalog}</span>
                        <span className="icon is-small">
                            <FontAwesomeIcon icon="angle-down"/>
                        </span>
                    </button>
                </div>
                <div className="dropdown-menu" id="dropdown-menu" role="menu">
                    <div className="dropdown-content">
                        {this.renderCatalogList()}
                    </div>
                </div>
            </div>
        );
    }
}

export default CatalogDropdown;
