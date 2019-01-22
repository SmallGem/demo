import React, {Component} from "react"
import LineChart from '../components/chart/LineChart'

class Home extends Component {
    render() {
        return (
            <div className="container is-widescreen">
                <div className="tile is-ancestor">
                    <LineChart/>
                </div>
            </div>
        )
    }
}

export default Home;
