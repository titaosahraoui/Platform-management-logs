import { useEffect, useState } from "react";
import { fetchPredictions } from "../api/Predictions";

interface Prediction {
    attack_cat: string;
    severity: string;
    probability: number[];
}

const Predictions = () => {
    const [predictions, setPredictions] = useState<Prediction[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 10; // Number of items per page

    useEffect(() => {
        const getPredictions = async () => {
            const result = await fetchPredictions(page, limit);
            setPredictions(result.data);
            setTotalPages(result.totalPages);
        };

        getPredictions();
    }, [page]); // Re-fetch data when the page changes

    return (
        <div>
            <h2>Predictions</h2>
            <table border={1}>
                <thead>
                    <tr>
                        <th>Attack Category</th>
                        <th>Severity</th>
                        <th>Probability</th>
                    </tr>
                </thead>
                <tbody>
                    {predictions.map((item, index) => (
                        <tr key={index}>
                            <td>{item.attack_cat}</td>
                            <td>{item.severity}</td>
                            <td>{item.probability.join(", ")}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination Controls */}
            <div>
                <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1}>
                    Previous
                </button>
                <span> Page {page} of {totalPages} </span>
                <button onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))} disabled={page === totalPages}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default Predictions;
