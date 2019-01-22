import React, {Component} from 'react';

class CatalogAlert extends Component {
    render() {
        return (
            <div className="box alert-box">
                <div className="field">
                    <label className="label">添加分类</label>
                    <div className="control"><input type="text" className="input" placeholder="请输入分类名称"/></div>
                </div>
            </div>
        )
    }
}
