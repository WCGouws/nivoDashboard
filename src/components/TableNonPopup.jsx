import React, { useEffect, useState } from 'react';

const TableNonPopup = ({ tableData }) => {

  useEffect(() => {
    // if (!keyFilter) { // perhaps make tableData.keyFilter
    //   // Set default key values? Is this safe?
    // }
  }, [])


  return (
    <>
      {!tableData ?
        <h3>No data to display.</h3>
        :
        <div>
          {/* <h2>Segment Data</h2> */}
          <table className="table table-non-popup">
            <thead>
              <tr>
                <th>#</th>
                {tableData.keyFilter.map((key, i) =>
                  <th className='table-header-style' key={i} scope="col">{key}</th>
                )}
              </tr>
            </thead>
            <tbody className='table-body'>
              {tableData.data.map((record, i) => (
                <tr key={i} style={{backgroundColor: record["rowColor"], borderBottom: record["rowColorBorder"]}}>
                  <th scope='row'>{i + 1}</th>
                  {tableData.keyFilter.map((key, i) =>
                    <td key={i}>{record[key]}</td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      }
    </>

  );
}

export default TableNonPopup;