import { Box, Checkbox, FormControl, FormControlLabel, InputLabel, Select, useTheme, MenuItem, useMediaQuery } from "@mui/material";
import { ResponsiveLine } from '@nivo/line'
import { colorTokens } from "../theme";
import { useEffect, useState } from "react";

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
  const [dayRange, setDayRange] = useState(-30);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  function handleDayRangeChange(e) {
    setDayRange(e.target.value);
  };

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
        OTData = OTData.slice(dayRange)
        if (dayRange === -365) {
          let stripped = []
          for (let i = 0; i < OTData.length; i += 5) {
            stripped.push(OTData[i]);
          }
          OTData = stripped;
        }
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
  }, [props.data, currentFilter, dayRange])

  return (

    <>
      <Box p="0 30px">
        <FormControlLabel name="Day" control={<Checkbox checked={displayFilter["Day"]} />} label="Day" onClick={(e) => handleDisplaySwitch(e)} />
        <FormControlLabel name="Month" control={<Checkbox checked={displayFilter["Month"]} />} label="Month" onClick={(e) => handleDisplaySwitch(e)} />
        <FormControlLabel name="Year" control={<Checkbox checked={displayFilter["Year"]} />} label="Year" onClick={(e) => handleDisplaySwitch(e)} />
        {currentFilter === "Day" &&
          <FormControl size="small">
            <InputLabel id="demo-simple-select-label">Range</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={dayRange}
              label="Day Range"
              onChange={handleDayRangeChange}
            >
              <MenuItem value={-30}>30 days</MenuItem>
              <MenuItem value={-90}>90 days</MenuItem>
              <MenuItem value={-365}>1 year</MenuItem>
            </Select>
          </FormControl>
        }
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
          margin={isMobile ? { top: 45, right: 15, bottom: 110, left: 35 } : { top: 15, right: 120, bottom: 79, left: 40 }}
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
            tickSize: 2,
            tickPadding: 5,
            tickValues: isMobile ? 5 : 10,
            tickRotation: -90,
            legend: 'Date',
            legendOffset: 75,
            legendPosition: 'middle'
          }}
          axisLeft={{
            tickSize: isMobile ? 1 : 3,
            tickPadding: isMobile ? 3 : 3,
            tickValues: isMobile ? 5 : 10,
            tickRotation: 1,
            legend: 'Amount',
            legendOffset: isMobile ? -30 : -36,
            legendPosition: 'middle'
          }}
          enableGridX={false}
          // enableGridY={false}
          lineWidth={2}
          pointColor={{ theme: 'background' }}
          pointBorderWidth={1}
          pointBorderColor={{ from: 'serieColor' }}
          pointLabelYOffset={-12}
          useMesh={true}
          legends={[
            {
              anchor: isMobile ? 'top' : 'bottom-right',
              direction: isMobile ? 'row' : 'column',
              justify: false,
              translateX: isMobile ? -8 : 100,
              translateY: isMobile ? -35 : -33,
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
                <div>{item.point.data.y}</div>
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