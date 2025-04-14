import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import axios from 'axios';

interface KPI {
    timestamp: string;
    cpu_usage: number;
    memory_usage: number;
    disk_usage: number;
    network_io: {
        bytes_sent: number;
        bytes_recv: number;
        packets_sent: number;
        packets_recv: number;
        errin: number;
        errout: number;
        dropin: number;
        dropout: number;
    };
}

declare module "d3" {
    interface Arc<This, Datum> {
        (this: This, d?: Datum): string;
    }
}

const DeviceKPIGauges: React.FC = () => {
    // Refs and state
    const cpuGaugeRef = useRef<SVGSVGElement>(null);
    const memoryGaugeRef = useRef<SVGSVGElement>(null);
    const diskGaugeRef = useRef<SVGSVGElement>(null);
    const [data, setData] = useState<KPI[]>([]);
    const [lastUpdated, setLastUpdated] = useState<string>('');
    const prevDataRef = useRef<KPI[]>([]);



    // 1. First define all helper functions
    const drawGauge = (
        container: SVGSVGElement | null,
        value: number,
        title: string,
        color: string,
        unit: string
    ) => {
        if (!container) return;

        // Clear ALL existing content first
        const selection = d3.select(container);
        selection.selectAll("*").remove();

        const width = 200;
        const height = 200;
        const radius = Math.min(width, height) / 2 - 10;

        const svg = selection
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", `translate(${width / 2}, ${height / 2})`);

        // Background arc
        const backgroundArc = d3.arc()
            .innerRadius(radius * 0.7)
            .outerRadius(radius)
            .startAngle(-Math.PI * 0.8)
            .endAngle(Math.PI * 0.8)
            .cornerRadius(5);

        svg.append("path")
            .attr("d", backgroundArc())
            .attr("fill", "#eee");

        // Value arc
        const foregroundArc = d3.arc()
            .innerRadius(radius * 0.7)
            .outerRadius(radius)
            .startAngle(-Math.PI * 0.8)
            .endAngle(-Math.PI * 0.8 + (Math.PI * 1.6 * Math.min(value, 100) / 100))
            .cornerRadius(5);

        svg.append("path")
            .attr("d", foregroundArc())
            .attr("fill", color);

        // Add tick marks
        const tickData = [0, 25, 50, 75, 100];
        const ticks = svg.selectAll(".tick")
            .data(tickData)
            .enter()
            .append("g")
            .attr("transform", (d) => {
                const angle = -Math.PI * 0.8 + (Math.PI * 1.6 * d / 100);
                return `rotate(${angle * 180 / Math.PI}) translate(0, ${-radius - 5})`;
            });

        ticks.append("line")
            .attr("x2", 0)
            .attr("y2", 10)
            .attr("stroke", "#000")
            .attr("stroke-width", 1);

        ticks.append("text")
            .attr("x", 0)
            .attr("y", 20)
            .attr("text-anchor", "middle")
            .attr("font-size", "10px")
            .text(d => d);

        // Add center text with value
        svg.append("text")
            .attr("text-anchor", "middle")
            .attr("font-size", "24px")
            .attr("font-weight", "bold")
            .attr("dy", "0.3em")
            .text(`${value.toFixed(1)}${unit}`);

        svg.append("text")
            .attr("text-anchor", "middle")
            .attr("font-size", "14px")
            .attr("dy", "2.5em")
            .text(title);
    };

    const animateGaugeTransition = (
        container: SVGSVGElement | null,
        prevValue: number,
        newValue: number,
        color: string,
        unit: string
    ) => {
        if (!container) return;

        const selection = d3.select(container);
        const width = 200;
        const height = 200;
        const radius = Math.min(width, height) / 2 - 10;

        // Update existing arc or create new one
        const arc = selection.select<SVGPathElement>('.value-arc');

        if (arc.empty()) {
            drawGauge(container, newValue, unit === '%' ? 'CPU Usage' : unit === 'MB' ? 'Memory Usage' : 'Disk Usage', color, unit);
            return;
        }

        // Animate the arc
        arc.transition()
            .duration(1000)
            .attrTween("d", () => {
                const interpolate = d3.interpolate(prevValue, newValue);
                return (t: number) => {
                    const value = interpolate(t);
                    return d3.arc()
                        .innerRadius(radius * 0.7)
                        .outerRadius(radius)
                        .startAngle(-Math.PI * 0.8)
                        .endAngle(-Math.PI * 0.8 + (Math.PI * 1.6 * Math.min(value, 100) / 100))();
                };
            });

        // Animate the text
        selection.select(".value-text")
            .transition()
            .duration(1000)
            .tween("text", () => {
                const interpolate = d3.interpolate(prevValue, newValue);
                return (t: number) => {
                    selection.select(".value-text")
                        .text(`${interpolate(t).toFixed(1)}${unit}`);
                };
            });
    };

    // 2. Then define the effects
    useEffect(() => {
        // Initialize gauges
        drawGauge(cpuGaugeRef.current, 0, 'CPU Usage', '#4e79a7', '%');
        drawGauge(memoryGaugeRef.current, 0, 'Memory Usage', '#e15759', '%');
        drawGauge(diskGaugeRef.current, 0, 'Disk Usage', '#76b7b2', '%');
    }, []);

    useEffect(() => {
        let isMounted = true;
        const abortController = new AbortController();

        const fetchData = async () => {
            try {
                const response = await axios.get<KPI[]>('http://localhost:5000/api/kpis', {
                    headers: { 'Cache-Control': 'no-cache' },
                    signal: abortController.signal
                });

                if (isMounted && response.data) {
                    const responseData = Array.isArray(response.data)
                        ? response.data
                        : [response.data];

                    setData(prev => {
                        const newData = [...prev, ...responseData].slice(-100);
                        prevDataRef.current = prev;
                        return newData;
                    });
                    setLastUpdated(new Date().toISOString());
                }
            } catch (err) {
                if (!axios.isCancel(err)) {
                    console.error('Fetch error:', err);
                }
            }
        };

        fetchData();
        const interval = setInterval(fetchData, 60000);

        return () => {
            isMounted = false;
            abortController.abort();
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        if (data.length > 0) {
            const latestData = data[data.length - 1];
            const previousData = prevDataRef.current[prevDataRef.current.length - 1] || latestData;

            animateGaugeTransition(cpuGaugeRef.current, previousData.cpu_usage, latestData.cpu_usage, '#4e79a7', '%');
            animateGaugeTransition(memoryGaugeRef.current, previousData.memory_usage, latestData.memory_usage, '#e15759', '%');
            animateGaugeTransition(diskGaugeRef.current, previousData.disk_usage, latestData.disk_usage, '#76b7b2', '%');
        }
    }, [data]);

    // 3. Finally the render JSX
    return (
        <div className="flex flex-wrap justify-center gap-5 p-5">
            <div className="text-center bg-white w-[300px] h-[250px] rounded-xl lg:text-lg shadow-xl">
                <h3 className="text-lg font-medium mb-2">CPU Usage</h3>
                <svg ref={cpuGaugeRef} className="w-48 h-48 mx-auto"></svg>
                {data.length > 0 && (
                    <p className="text-sm text-gray-500 mt-2">
                        Updated: {new Date(lastUpdated).toLocaleTimeString()}
                    </p>
                )}
            </div>
            <div className="text-center bg-white w-[300px] h-[250px] rounded-xl lg:text-lg shadow-xl">
                <h3 className="text-lg font-medium mb-2">Memory Usage</h3>
                <svg ref={memoryGaugeRef} className="w-48 h-48 mx-auto"></svg>
            </div>
            <div className="text-center bg-[#D7E0EA] w-[300px] h-[250px] rounded-xl lg:text-lg shadow-xl">
                <h3 className="text-lg font-medium mb-2">Disk Usage</h3>
                <svg ref={diskGaugeRef} className="w-48 h-48 mx-auto"></svg>
            </div>
        </div>
    );
};

export default DeviceKPIGauges;