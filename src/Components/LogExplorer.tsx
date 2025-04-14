import { useState, useEffect } from 'react';
import axios from 'axios';
import Papa from 'papaparse';

type FileItem = {
  name: string;
  type: 'FILE' | 'DIRECTORY';
  size: number;
  modificationTime: string;
};

type HdfsResponse = {
  path: string;
  items: FileItem[];
};

const LogExplorer: React.FC = () => {
  const [currentPath, setCurrentPath] = useState('/data');
  const [items, setItems] = useState<FileItem[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [csvData, setCsvData] = useState<Record<string, string>[]>([]); // To store parsed CSV data
  const [isPreviewing, setIsPreviewing] = useState(false); // Flag for CSV preview mode

  useEffect(() => {
    axios
      .get<HdfsResponse>(`http://localhost:5000/api/logs?path=${currentPath}`)
      .then((res) => setItems(res.data.items))
      .catch(console.error);
  }, [currentPath]);

  const handleOpen = (item: FileItem) => {
    if (item.type === 'DIRECTORY') {
      setHistory([...history, currentPath]);
      setCurrentPath(`${currentPath}/${item.name}`);
    } else {
      if (item.name.endsWith('.csv')) {
        // Show CSV preview
        previewCsv(item);
      } else {
        alert(`You selected a file: ${item.name}`);
      }
    }
  };

  const handleBack = () => {
    const previous = history.pop();
    if (previous) {
      setCurrentPath(previous);
      setHistory([...history]);
    }
  };

  const previewCsv = (item: FileItem) => {
    // Fetch CSV file content from your backend (assuming it's a direct download URL)
    axios
      .get(`http://localhost:5000/api/logs/content?path=${currentPath}/${item.name}`)
      .then((response) => {
        // Parse CSV data using PapaParse
        Papa.parse(response.data, {
          complete: (result) => {
            setCsvData(result.data as Record<string, string>[]); // Store parsed CSV data
            setIsPreviewing(true); // Activate preview mode
          },
        });
      })
      .catch((err) => console.error('Error loading CSV:', err));
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">HDFS Log Explorer</h2>
      <p className="text-gray-600 mb-2">Current Path: {currentPath}</p>
      {history.length > 0 && (
        <button onClick={handleBack} className="mb-4 px-2 py-1 bg-gray-200 rounded">
          ⬅️ Back
        </button>
      )}
      <ul className="border rounded shadow p-2 bg-white">
        {items.map((item, idx) => (
          <li
            key={idx}
            className="flex justify-between p-2 border-b hover:bg-gray-100 cursor-pointer"
            onClick={() => handleOpen(item)}
          >
            <span>
              {item.type === 'DIRECTORY' ? '📁' : '📄'} {item.name}
            </span>
            <span className="text-sm text-gray-500">
              {item.type === 'FILE' ? `${item.size} bytes` : ''}
            </span>
          </li>
        ))}
      </ul>

      {/* Display CSV Preview */}
      {isPreviewing && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">CSV File Preview</h3>
          <table className="table-auto w-full border-collapse">
            <thead>
              <tr>
                {csvData[0] && Object.keys(csvData[0]).map((key, index) => (
                  <th key={index} className="border p-2">{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {csvData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {Object.values(row).map((value, cellIndex) => (
                    <td key={cellIndex} className="border p-2">{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LogExplorer;
