import React, {Component} from 'react';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            navbarIsActive: false
        };
    }

    componentWillMount() {
        const username = () => {
            const cookie = document.cookie;
            const sessionName = "username";
            if (cookie.length > 0) {
                const sessionStart = cookie.indexOf(sessionName + "=");
                if (sessionStart !== -1) {
                    const sessionEnd = cookie.indexOf(";", sessionStart + sessionName.length + 1);
                    if (sessionEnd === -1) return cookie.substring(sessionStart + sessionName.length + 1);
                    return cookie.substring(sessionStart + sessionName.length + 1, sessionEnd);
                }
            }
        };

        this.setState({
            username: username()
        })
    }

    navbarSwitch = () => {
        this.setState({
            navbarIsActive: !this.state.navbarIsActive,
        });
    };

    render() {
        return (
            <nav className="navbar is-dark" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <div className="navbar-item">
                        <img src="https://bulma.io/images/bulma-logo.png" alt="logo" width="122" height="28"/>
                    </div>
                    <div onClick={this.navbarSwitch} role="button"
                         className={this.state.navbarIsActive ? "navbar-burger burger is-active" : "navbar-burger burger"}
                         aria-label="menu" aria-expanded="false">
                        <span aria-hidden="true"/>
                        <span aria-hidden="true"/>
                        <span aria-hidden="true"/>
                    </div>
                </div>

                <div id="navbarBasicExample"
                     className={this.state.navbarIsActive ? "navbar-menu is-active" : "navbar-menu"}>
                    <div className="navbar-start">
                        <div className="navbar-item">
                            管理后台
                        </div>
                    </div>
                    <div className="navbar-end">
                        <div className="navbar-item has-dropdown is-hoverable">
                            <div className="navbar-link">
                                {this.state.username}
                            </div>
                            <div className="navbar-dropdown is-right">
                                <div className="navbar-item">
                                    <a href="http://application.test:5000/logout" className="button is-danger">退出</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        )
    }
}

export default Navbar;
