import { Box, Checkbox, FormControlLabel, useTheme } from "@mui/material";
import { ResponsiveLine } from '@nivo/line'
import { colorTokens } from "../theme";
import { useEffect, useState } from "react";
import { useRef } from "react";

const LineChart = (props) => {
  const theme = useTheme();
  const colors = colorTokens(theme.palette.mode);
  const [lineData, setLineData] = useState(false);
  const [displayFilter, setDisplayFilter] = useState({
    "Day": true,
    "Month": false,
    "Year": false
  })
  const [currentFilter, setCurrentFilter] = useState("Day")

  function handleDisplaySwitch(e) {
    if (e.target.checked) {
      let name = e.target.name;
      let resetBoxes = displayFilter
      for (let filter in displayFilter) {
        if (filter === name) { 
          resetBoxes[filter] = true 
        } else { 
          resetBoxes[filter] = false 
        }
      }
      setDisplayFilter(resetBoxes)
      setCurrentFilter(name)
    }
  }

  function handleDataRestructure() {

    if (props.data && props.data !== "") {
      let refinedData = [{
        "id": "Amount Created",
        "color": "hsl(183, 100%, 50%)",
        "data": []
      }];
      
      // Reduce amount of data if we're displaying on a day-to-day basis, as it's too much for the line chart to handle
      let OTData = props.data[`devicesOver${currentFilter}`]["mob_cred_ot"]
      if (currentFilter === "Day") {
        OTData = OTData.slice(-20)
      }

      for (let date of OTData) {
        refinedData[0].data.push({
          "x": date.date,
          "y": date.count
        })
      }
      setLineData(refinedData)
    }
  }

  useEffect(() => {
    handleDataRestructure()
  }, [props.data, currentFilter])

  return (
    <>
      <Box p="0 30px">
        <FormControlLabel name="Day" control={<Checkbox checked={displayFilter["Day"]}/>} label="Day" onClick={(e) => handleDisplaySwitch(e)} />
        <FormControlLabel name="Month" control={<Checkbox checked={displayFilter["Month"]} />} label="Month" onClick={(e) => handleDisplaySwitch(e)} />
        <FormControlLabel name="Year" control={<Checkbox checked={displayFilter["Year"]} />} label="Year" onClick={(e) => handleDisplaySwitch(e)} />
      </Box>

      {lineData ?
        <ResponsiveLine
          data={lineData}
          colors={{ scheme: 'paired' }}
          theme={{
            axis: {
              domain: {
                line: {
                  stroke: colors.indigo[700]
                }
              },
              legend: {
                text: {
                  fill: colors.lightGray[700]
                }
              },
              ticks: {
                line: {
                  stroke: colors.lightGray[700],
                  strokeWidth: 1
                },
                text: {
                  fill: colors.lightGray[700]
                }
              }
            },
            legends: {
              text: {
                fill: colors.lightGray[700]
              }
            }
          }}
          margin={{ top: 30, right: 120, bottom: 60, left: 40 }}
          xScale={{ type: 'point' }}
          min-width={0}
          yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: true,
            reverse: false
          }}
          yFormat=" >-.2f"
          curve="natural"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Date',
            legendOffset: 34,
            legendPosition: 'middle'
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 1,
            legend: 'Amount',
            legendOffset: -46,
            legendPosition: 'middle'
          }}
          enableGridX={false}
          lineWidth={2}
          pointColor={{ theme: 'background' }}
          pointBorderWidth={1}
          pointBorderColor={{ from: 'serieColor' }}
          pointLabelYOffset={-12}
          useMesh={true}
          legends={[
            {
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: 107,
              translateY: -33,
              itemsSpacing: 0,
              itemDirection: 'left-to-right',
              itemWidth: 80,
              itemHeight: 18,
              itemOpacity: 0.75,
              symbolSize: 10,
              symbolShape: 'circle',
              symbolBorderColor: 'rgba(0, 0, 0, .5)',
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemBackground: 'rgba(0, 0, 0, .03)',
                    itemOpacity: 1
                  }
                }
              ]
            }
          ]}
          tooltip={(item) => {
            return (
              <div style={{ background: colors.blue[800], padding: '6px 30px' }}>
                <div>{item.value}</div>
              </div>
            )
          }}
        /> :
        <Box display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <img src="loading.gif" alt="Loading indicator not found" style={{ width: "4rem", marginTop: "4rem" }} />
        </Box>
      }
    </>

  )
}

export default LineChart;