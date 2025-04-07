import { useEffect, useState } from "react";
import { fetchNotebookData } from "../api/notebook";
import * as d3 from "d3";

const NotebookData = () => {
    const [data, setData] = useState<string[]>([]);
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

    useEffect(() => {
        const getData = async () => {
            const notebookOutputs = await fetchNotebookData();
            setData(notebookOutputs);
        };
        getData();
    }, []);

    useEffect(() => {
        if (data.length > 0) {
            const svg = d3.select("#chart").html("") // Clear previous SVG
                .append("svg")
                .attr("width", 600)
                .attr("height", 400);

            svg.selectAll("text")
                .data(data)
                .enter()
                .append("text")
                .attr("x", 50)
                .attr("y", (d, i) => 50 + i * 20)
                .text(d => d)
                .attr("fill", "black")
                .style("opacity", 0)
                .transition()
                .duration(500)
                .style("opacity", 1);
        }
    }, [data]);

    const sortData = () => {
        const sortedData = [...data].sort((a, b) => {
            return sortOrder === "asc" ? a.localeCompare(b) : b.localeCompare(a);
        });

        setData(sortedData);
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    };

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <div id="chart" className="mb-6"></div>
            <div className="overflow-x-auto">
                <table className="border-collapse w-full shadow-lg">
                    <thead>
                        <tr className="bg-gray-800 text-white">
                            <th
                                className="p-2 cursor-pointer hover:bg-gray-700 transition"
                                onClick={sortData}
                            >
                                Output ⬆⬇
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr
                                key={index}
                                className="hover:bg-gray-100 transition cursor-pointer"
                            >
                                <td className="border p-2">{item}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default NotebookData;
