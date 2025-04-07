import axios from "axios";


export const fetchPredictions = async (page = 1, limit = 10) => {
    try {
        const response = await axios.get(`http://localhost:5000/api/predictions?page=${page}&limit=${limit}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching predictions:", error);
        return { data: [], totalPages: 0 };
    }
};


