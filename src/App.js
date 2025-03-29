import React, { useState } from "react";
import Papa from "papaparse";
import DataTable from "react-data-table-component";
import axios from "axios"; 
import Table from "./Table";

const App = () => {
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [totalSalary, setTotalSalary] = useState(0);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      Papa.parse(file, {
        complete: (result) => {
          const parsedData = result.data;
          setHeaders(parsedData[0]); 
          const rows = parsedData.slice(1); 
          setData(rows);
          calculateTotalSalary(rows);
        },
        header: false,
        skipEmptyLines: true,
      });
    }
  };

  const calculateTotalSalary = (data) => {
    const total = data.reduce((sum, row) => sum + parseFloat(row[2] || 0), 0); 
    setTotalSalary(total);
  };

 


  const handleProceedToDisbursal = async () => {
    try {
  
      const employeeData = data.map((row) => ({
        employeeId: row[0],
        name: row[1], 
        netSalary: row[2], 
        lopDays: row[3], 
        pf: row[4], 
        esi: row[5],
        tds: row[6],
      }));

     
      const response = await axios.post('https://some-end-point', {
        employees: employeeData,
      });

    
      if (response.status === 200) {
        alert('Disbursal process started successfully!');
      } else {
        alert('There was an issue with the disbursal process.');
      }
    } catch (error) {
      console.error('Error during disbursal process:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-center text-gray-800">
        Payroll Finance Dashboard
      </h1>

      <div className="mt-6">
        <input
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          className="block mx-auto mb-4 p-2 border border-gray-300 rounded"
        />
      </div>

      {data.length > 0 && (
        <>
        
         <Table data={data} headers={headers}/>

          <div className="mt-4 text-right">
            <h4 className="text-xl font-semibold text-gray-700">
              Total Net Salary: ₹{totalSalary}
            </h4>
          </div>

       
          <button
            onClick={handleProceedToDisbursal}
            className="mt-6 w-full py-2 px-4 bg-green-500 text-white font-bold rounded-md hover:bg-green-600"
          >
            Proceed to Disbursal
          </button>
        </>
      )}
    </div>
  );
};

export default App;
