
import BarChart from "../Components/BarChart";
import DeviceKPIChart from "../Components/DeviceKpiChart";
import Heatmap from "../Components/Heatmap";
import NotebookData from "../Components/NotebookVisualization";


const Dashboard = () => {

    return (
        <div className="flex flex-wrap gap-5 p-5">
            <h1>Dashboard</h1>
            <div>
                <DeviceKPIChart />
            </div>
            <div>
                <BarChart />
            </div>
            <div>
                <Heatmap />
            </div>
            <div>
                <NotebookData />
            </div>
        </div>
    );
};

export default Dashboard;
