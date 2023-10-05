import React, { useEffect, useState } from 'react';

const TableNonPopup = ({ tableData, tabValue, lostCards, printedCards }) => {
  const [dataToShow, setDataToShow] = useState(null);


  useEffect(() => {
    // if (!keyFilter) { // perhaps make tableData.keyFilter
    //   // Set default key values? Is this safe?
    // }
  }, [])

  useEffect(() => {
    if (tableData) {
      setDataToShow(tableData)
    }
  }, [tableData])


  useEffect(() => {
    if (tabValue === "lost") {
      let lostCardsObj = {
        data: lostCards,
        keyFilter: ["VAL_NAM_FIRST", "VAL_NAM_LAST", "VAL_UNIV_ID", "lostcount"]
      }
      setDataToShow(lostCardsObj)
    } else if (tabValue === "printed") {
      let printedCardsObj = {
        data: printedCards,
        keyFilter: ["VAL_NAM_FIRST", "VAL_NAM_LAST", "PATRONID", "mediacount", "MEDIATYPE"]
      }
      setDataToShow(printedCardsObj)
    }
  }, [tabValue])

  return (
    <>
      {!dataToShow || dataToShow.data.length === 0 ?
        <h3>No data to display.</h3>
        :
        <div>
          {/* <h2>Segment Data</h2> */}
          <table className="table table-non-popup">
            <thead>
              <tr>
                <th className='table-header-index'>#</th>
                {dataToShow.keyFilter.map((key, i) =>
                  <th className='table-header-style' key={i} scope="col">{key}</th>
                )}
              </tr>
            </thead>
            <tbody className='table-body'>
              {dataToShow.data.map((record, i) => (
                <tr key={i} style={{ backgroundColor: record["rowColor"] ? record["rowColor"] : "rgba(255, 255, 255, 0.1)", borderBottom: record["rowColorBorder"] }}>
                  <th scope='row'>{i + 1}</th>
                  {dataToShow.keyFilter.map((key, i) =>
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