import axios from "axios";

export const fetchNotebookData = async () => {
    try {
        const response = await axios.get("http://localhost:5000/api/notebook");
        return response.data.extractedData;
    } catch (error) {
        console.error("Error fetching notebook data:", error);
        return [];
    }
};


export const fetchCorrelationData = async () => {
    try {
        const response = await axios.get("http://localhost:5000/api/correlation");
        return response.data; // Returns labels and values
    } catch (error) {
        console.error("Error fetching correlation heatmap:", error);
        return { labels: [], values: [] };
    }
};

