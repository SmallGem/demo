import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

class Login extends Component {
    render() {
        return (
            <section className="hero is-fullheight">
                <div className="hero-body">
                    <div className="container">
                        <div className="columns is-desktop is-centered">
                            <div className="column is-one-third-desktop">
                                <form className="box" method="POST" action="http://application.test:5000/login">
                                    <div className="field">
                                        <label className="label">账号</label>
                                        <div className="control has-icons-left has-icons-right">
                                            <input className="input is-success" name="username" type="text" placeholder="请输入账号"/>
                                            <span className="icon is-small is-left">
                                                <FontAwesomeIcon icon="user"/>
                                            </span>
                                            <span className="icon is-small is-right">
                                                <FontAwesomeIcon icon="check"/>
                                            </span>
                                        </div>
                                        <p className="help is-success">This username is available</p>
                                    </div>
                                    <div className="field">
                                        <label className="label">密码</label>
                                        <div className="control has-icons-left has-icons-right">
                                            <input className="input is-danger" name="password" type="password" placeholder="请输入密码"/>
                                            <span className="icon is-small is-left">
                                                <FontAwesomeIcon icon="unlock"/>
                                            </span>
                                            <span className="icon is-small is-right">
                                                <FontAwesomeIcon icon="exclamation-triangle"/>
                                            </span>
                                        </div>
                                        <p className="help is-danger">This email is invalid</p>
                                    </div>
                                    <div className="field">
                                        <div className="control">
                                            <label className="checkbox">
                                                <input type="checkbox"/>
                                                记住我
                                            </label>
                                        </div>
                                    </div>
                                    <div className="field">
                                        <div className="control">
                                            <input type="submit" className="button is-success is-fullwidth" value="登录"/>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default Login;
