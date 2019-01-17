import React, {Component} from "react"
import LineChart from '../components/chart/LineChart'

class Home extends Component {
    render() {
        return (
            <div className="tile is-ancestor">
                <LineChart/>
            </div>
        )
    }
}

export default Home;
