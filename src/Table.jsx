import React from 'react'
import DataTable from 'react-data-table-component';

const Table = ({data,headers}) => {


    const columns = headers.map((header, index) => ({
        name: header,
        selector: (row) => row[index],  
        sortable: true,
        grow: 1, 
        wrap: true,
        style: index < 1  ? { position: 'sticky', left: 0, zIndex: 50,backgroundColor:'white' } : {}, 
      }));

  return (
    <div>
        <DataTable
            columns={columns}
            data={data}
            pagination
            highlightOnHover
            responsive
            striped
            dense
            fixedHeader
            fixedHeaderScrollHeight="300px"
            className="border border-gray-300 rounded-lg"
          />
    </div>
  )
}

export default Table