import React, {Component} from "react"
import Chart from "chart.js/dist/Chart.bundle.min";

class Home extends Component {
    componentDidMount() {
        const ctx = document.getElementById("exampleChart");
        const datasets = [{
            label: "# of Sales Volume",
            data: [12, 19, 3, 0, 2, 3, 16],
            backgroundColor: "rgba(255, 159, 64, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
            lineTension: 0,
            pointBackgroundColor: "rgba(153, 102, 255, 0.2)",
            pointBorderColor: "rgba(75, 192, 192, 0.2)",
            PointBorderWidth: 1,
        }];
        const chart = new Chart(ctx, {
            type: "line",
            data: {
                labels: ["Sum", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"],
                datasets: datasets
            }
        });
    }

    render() {
        return (
            <div className="tile is-ancestor">
                <canvas id="exampleChart"/>
            </div>
        )
    }
}

export default Home;
