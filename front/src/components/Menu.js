import React, {Component} from "react"

class Menu extends Component {
    renderMenuItem(pageId, pageName) {
        return (
            <a
                className={pageId === this.props.value ? "is-active" : ""}
                onClick={() => this.props.onClick(pageId)}
            >
                {pageName}
            </a>
        )
    }

    render() {
        return (
            <aside className="menu is-light">
                <p className="menu-label">普通</p>
                <ul className="menu-list">
                    <li>{this.renderMenuItem("home", "控制面板")}</li>
                </ul>
                <p className="menu-label">商品管理</p>
                <ul className="menu-list">
                    <li>
                        {this.renderMenuItem("catalogs", "分类")}
                        <ul>
                            <li>{this.renderMenuItem("addCatalog", "添加")}</li>
                            <li>{this.renderMenuItem("modifyCatalog", "修改")}</li>
                        </ul>
                    </li>
                    <li>
                        {this.renderMenuItem("items", "商品")}
                        <ul>
                            <li>{this.renderMenuItem("addItem", "添加")}</li>
                            <li>{this.renderMenuItem("modifyItem", "修改")}</li>
                        </ul>
                    </li>
                </ul>
                <p className="menu-label">订单管理</p>
                <ul className="menu-list">
                    <li>
                        {this.renderMenuItem("orders", "订单")}
                        <ul>
                            <li>{this.renderMenuItem("addOrder", "添加")}</li>
                            <li>{this.renderMenuItem("modifyOrder", "修改")}</li>
                        </ul>
                    </li>
                </ul>
                <p className="menu-label">用户管理</p>
                <ul className="menu-list">
                    <li>{this.renderMenuItem("users", "所有用户")}</li>
                </ul>
            </aside>
        )
    }
}

export default Menu;
