import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Papa,{ParseResult} from 'papaparse';

interface CsvData {
  col1: string;
  col2: number;
  col3: string;
}

function CSVData() {
  const [csvData, setCsvData] = useState([]);

  useEffect(() => {
    // CSVデータを取得するURLを指定
    const csvDataURL = 'http://localhost:5173/test.csv';

    // axiosを使用してHTTPリクエストを送信
    axios.get(csvDataURL)
      .then((response) => {
        // HTTP応答からCSVデータを取得
        const csvText = response.data;

        // Papaparseを使用してCSVデータをパース
        Papa.parse(csvText, {
          header: false,
          dynamicTyping: false,
          complete: (results: ParseResult<CsvData>) => {
            setCsvData(results.data);
          },
          skipEmptyLines: true,
        });
      })
      .catch((error) => {
        console.error('データの取得に失敗しました:', error);
      });
  }, []);

  return (
    <div>
      <table>
        <thead>
          <tr>
            {csvData[0] &&
              Object.keys(csvData[0]).map((header, index) => (
                <th key={index}>{header}</th>
              ))}
          </tr>
        </thead>
        <tbody>
          {csvData.map((row, index) => (
            <tr key={index}>
              {Object.values(row).map((value, index) => {
                return (
                  <td key={index}>{value}</td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CSVData;
