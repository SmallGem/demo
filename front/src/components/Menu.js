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
                {/*<p className="menu-label">普通</p>*/}
                {/*<ul className="menu-list">*/}
                    {/*<li>{this.renderMenuItem("home", "控制面板")}</li>*/}
                {/*</ul>*/}
                <p className="menu-label">门店管理</p>
                <ul className="menu-list">
                    <li>{this.renderMenuItem("items", "商品列表")}</li>
                    <li>{this.renderMenuItem("orders", "订单列表")}</li>
                    <li>{this.renderMenuItem("users", "用户列表")}</li>
                </ul>
            </aside>
        )
    }
}

export default Menu;
