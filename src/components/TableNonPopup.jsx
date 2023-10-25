import React, { useEffect, useState } from 'react';
import NotifyPopup from './NotifyPopup';
import { useTheme } from "@mui/material";


const TableNonPopup = ({ tableData, tabValue, lostCards, printedCards }) => {
  const [dataToShow, setDataToShow] = useState(null);
  const theme = useTheme();
  const [popupConfig, setPopupConfig] = useState({
    show: false,
    type: "", // expiring, lost card, etc
    data: null
  });

  const handleClosePopup = () => setPopupConfig({ show: false, type: "", data: null });
  const handleShowPopup = (record) => setPopupConfig({ show: true, type: getType(), data: record })

  function getType(){
    if(tabValue === "lost"){
      return "concerning amount of lost cards";
    } else if(tabValue === "printed"){
      return "concerning amount of printed cards";
    } else if(tabValue === "expiring"){
      return "expiring ID";
    }
  }

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
          {/* Eventually want to make the below popup only show in the table, maybe. */}
          <NotifyPopup handleClose={handleClosePopup} popupConfig={popupConfig} />
          <table className="table-non-popup">
            <thead>
              <tr>
                <th className={theme.palette.mode == "dark" ? 'table-header-index' : 'table-header-index-lightmode '}>#</th>
                {dataToShow.keyFilter.map((key, i) =>
                  <th className={theme.palette.mode == "dark" ? 'table-header-style' : 'table-header-style-lightmode'} key={i} scope="col">{key}</th>
                )}
              </tr>
            </thead>
            <tbody className='table-body'>
              {dataToShow.data.map((record, i) => (
                <tr key={i} style={{ backgroundColor: record["rowColor"] ? record["rowColor"] : "rgba(0, 0, 0, 0.1)" }} onClick={() => handleShowPopup(record)}>
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