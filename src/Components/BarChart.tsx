import { useEffect, useRef } from "react";
import * as d3 from "d3";

// Your JSON output from Python
const jsonData = {
    labels: ["Normal", "Generic", "Exploits", "Fuzzers", "DoS", "Reconnaissance", "Analysis", "Backdoor", "Shellcode", "Worms"],
    values: [37000, 18871, 11132, 6062, 4089, 3496, 677, 583, 378, 44]
};

const BarChart = () => {
    const chartRef = useRef<SVGSVGElement | null>(null);

    useEffect(() => {
        if (!chartRef.current) return;

        // Clear any existing SVG content
        d3.select(chartRef.current).selectAll("*").remove();

        // Set chart dimensions
        const width = 600;
        const height = 400;
        const margin = { top: 20, right: 30, bottom: 70, left: 60 };

        // Create SVG canvas
        const svg = d3.select(chartRef.current)
            .attr("width", width)
            .attr("height", height);

        // Create scales
        const x = d3.scaleBand()
            .domain(jsonData.labels)
            .range([margin.left, width - margin.right])
            .padding(0.3);

        const y = d3.scaleLinear()
            .domain([0, d3.max(jsonData.values) as number])
            .nice()
            .range([height - margin.bottom, margin.top]);

        // Draw bars
        svg.selectAll(".bar")
            .data(jsonData.values)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", (_, i) => x(jsonData.labels[i]) as number)
            .attr("y", d => y(d))
            .attr("width", x.bandwidth())
            .attr("height", d => height - margin.bottom - y(d))
            .attr("fill", "steelblue");

        // Add X Axis
        svg.append("g")
            .attr("transform", `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(x))
            .selectAll("text")
            .attr("transform", "rotate(-45)")
            .style("text-anchor", "end");

        // Add Y Axis
        svg.append("g")
            .attr("transform", `translate(${margin.left},0)`)
            .call(d3.axisLeft(y));

    }, []);

    return (
        <div>
            <h2>Attack Category Distribution</h2>
            <svg ref={chartRef}></svg>
        </div>
    );
};

export default BarChart;
