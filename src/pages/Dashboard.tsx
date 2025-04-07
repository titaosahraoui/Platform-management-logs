
import BarChart from "../Components/BarChart";
import Heatmap from "../Components/Heatmap";
import NotebookData from "../Components/NotebookVisualization";


const Dashboard = () => {

    return (
        <div>
            <h1>Dashboard</h1>
            <h2 className="text-2xl font-bold mb-4">Notebook Output</h2>
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
