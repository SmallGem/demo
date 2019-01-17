import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Navbar from './components/Navbar';
import Menu from './components/Menu';
import Breadcrumb from './components/Breadcrumb'
import Home from './pages/Home';

class App extends Component {
    render() {
        return (
            <div>
                <Navbar/>
                <div className="columns">
                    <div className="column is-one-fifth">
                        <section className="section">
                            <Menu/>
                        </section>
                    </div>
                    <div className="column is-four-fifths">
                        <section className="section">
                            <Breadcrumb/>
                        </section>
                        <section className="section">
                            <div className="container is-widescreen">
                                <Home/>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
