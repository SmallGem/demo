import React, {Component} from 'react';
import './alert.css';
import Request from '../../utils/Request';

class CatalogAlert extends Component {
    constructor(props) {
        super(props);
        this.state = {
            catalog: "",
        }
    }

    handleCatalogChange(event) {
        this.setState({
            catalog: event.target.value,
        });
    };

    storeCatalog() {
        const urlShard = "/catalog";
        const data = {
            name: this.state.catalog,
        };

        new Request("POST", urlShard, data);

        this.props.getCatalogs();
        this.props.onClick();
    };

    render() {
        return (
            <div className="box alert-box">
                <div className="field">
                    <label className="label">添加分类</label>
                    <div className="control">
                        <input type="text" className="input"
                               value={this.state.catalog}
                               onChange={this.handleCatalogChange.bind(this)}
                               placeholder="请输入分类名称"/>
                    </div>
                </div>
                <div className="field is-grouped is-grouped-centered">
                    <button className="button is-primary" onClick={() => this.storeCatalog()}>提交</button>
                    <button className="button is-light" onClick={() => this.props.onClick()}>取消</button>
                </div>
            </div>
        )
    }
}

export default CatalogAlert;
