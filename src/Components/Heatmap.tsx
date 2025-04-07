import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { fetchCorrelationData } from "../api/notebook";

const Heatmap = () => {
    const [data, setData] = useState<{ labels: string[]; values: number[][] }>({
        labels: [],
        values: [],
    });

    const chartRef = useRef<SVGSVGElement | null>(null);

    useEffect(() => {
        const getData = async () => {
            const heatmapData = await fetchCorrelationData();
            setData(heatmapData);
        };

        getData();
    }, []);

    useEffect(() => {
        if (!chartRef.current || data.labels.length === 0) return;

        // Clear previous chart
        d3.select(chartRef.current).selectAll("*").remove();

        const width = 1000;
        const height = 800;
        const margin = { top: 100, right: 50, bottom: 100, left: 150 };

        const numRows = data.labels.length;
        const numCols = data.labels.length;
        const cellSize = Math.min(
            (width - margin.left - margin.right) / numCols,
            (height - margin.top - margin.bottom) / numRows
        );

        // Create SVG
        const svg = d3
            .select(chartRef.current)
            .attr("width", width)
            .attr("height", height);

        // Create scales
        const xScale = d3
            .scaleBand()
            .domain(data.labels)
            .range([margin.left, width - margin.right])
            .padding(0.05);

        const yScale = d3
            .scaleBand()
            .domain(data.labels)
            .range([margin.top, height - margin.bottom])
            .padding(0.05);

        const colorScale = d3.scaleSequential(d3.interpolateRdBu).domain([-1, 1]);

        // Draw heatmap cells
        svg.selectAll("rect")
            .data(data.values.flat())
            .enter()
            .append("rect")
            .attr("x", (_, i) => xScale(data.labels[i % numCols])!)
            .attr("y", (_, i) => yScale(data.labels[Math.floor(i / numCols)])!)
            .attr("width", cellSize)
            .attr("height", cellSize)
            .attr("fill", (d) => colorScale(d)!) // Correct mapping
            .attr("stroke", "#ddd");

        // Add X axis
        svg.append("g")
            .attr("transform", `translate(0, ${height - margin.bottom})`)
            .call(d3.axisBottom(xScale))
            .selectAll("text")
            .attr("transform", "rotate(-45)")
            .style("text-anchor", "end");

        // Add Y axis
        svg.append("g")
            .attr("transform", `translate(${margin.left}, 0)`)
            .call(d3.axisLeft(yScale));
    }, [data]);

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Feature Correlation Heatmap</h2>
            <svg ref={chartRef}></svg>
        </div>
    );
};

export default Heatmap;
