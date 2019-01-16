import React, {Component} from 'react';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            navbarIsActive: false
        };
    }

    navbarSwitch = () => {
        this.setState({
            navbarIsActive: !this.state.navbarIsActive,
        });
    };

    render() {
        return (
            <nav className="navbar" role={"navigation"} aria-label={"main navigation"}>
                <div className="navbar-brand">
                    <a href="https://bulma.io" className="navbar-item">
                        <img src="https://bulma.io/images/bulma-logo.png" alt="logo" width={"122"} height={"28"}/>
                    </a>
                    <a onClick={this.navbarSwitch} role={"button"}
                       className={this.state.navbarIsActive ? "navbar-burger burger is-active" : "navbar-burger burger"}
                       aria-label={"menu"} aria-expanded={"false"} data-target="navbarBasicExample">
                        <span aria-hidden={"true"}></span>
                        <span aria-hidden={"true"}></span>
                        <span aria-hidden={"true"}></span>
                    </a>
                </div>

                <div id="navbarBasicExample" className={this.state.navbarIsActive ? "navbar-menu is-active" : "navbar-menu"}>
                    <div className="navbar-start">
                        <a className="navbar-item">Home</a>
                        <a className="navbar-item">Documentation</a>
                        <div className="navbar-item has-dropdown is-hoverable">
                            <a className="navbar-link">More</a>
                            <div className="navbar-dropdown">
                                <a className="navbar-item">About</a>
                                <a className="navbar-item">Jobs</a>
                                <a className="navbar-item">Contact</a>
                                <hr className="navbar-divider"/>
                                <a className="navbar-item">Report an issue</a>
                            </div>
                        </div>
                    </div>

                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="buttons">
                                <a className="button is-primary">Sign up</a>
                                <a className="button is-light">Log in</a>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        )
    }
}

export default Navbar;
