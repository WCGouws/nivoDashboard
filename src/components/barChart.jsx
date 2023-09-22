import { Box, useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { colorTokens } from "../theme";
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react';

const BarChart = (props) => {
  const theme = useTheme();
  const colors = colorTokens(theme.palette.mode);
  const [barData, setBarData] = useState('');
  const [legendList, setLegendList] = useState([
    'iphone',
    'iwatch',
    'android',
    'physical_card',
  ])

  const displayReference = {
    "physical_card": {
      displayName: "Physical Card",
      color: "hsl(277, 70%, 50%)"
    },
    "android": {
      displayName: "Android",
      color: "hsl(314, 70%, 50%)"
    },
    "iphone": {
      displayName: "iPhone",
      color: "hsl(125, 70%, 50%)"
    },
    "iwatch": {
      displayName: "Apple Watch",
      color: "hsl(332, 70%, 50%)"
    },
  }

  useEffect(() => {

    async function handleDataRestructure() {
      if (props.displayAll) {
        // const seperates = await fetchSeparates();
        const patronGroupsOnly = {
          "Student": props.data["student"],
          "Employee": props.data["employee"],
          "Affiliate": props.data["affiliate"],
        }

        let refinedData = [];

        for (let patronGroup in patronGroupsOnly) {
          let miniObj = { "column": patronGroup }
          for (let device in patronGroupsOnly[patronGroup]) {
            if (device !== "devices_total") {
              miniObj[device] = patronGroupsOnly[patronGroup][device]
              miniObj[`${device}Color`] = displayReference[device]["color"]
            }
          }
          refinedData.push(miniObj)
        }
        setBarData(refinedData)

      } else if (props.data && props.data !== "" && props.watchPhone) {
        let refinedData = [];
        let watchTotal = props.data[props.endPoint]["iwatch"]
        let phoneTotal = props.data[props.endPoint]["iphone"]
        refinedData.push(
          {
            "column": "iwatch",
            "iwatch": watchTotal,
            "iwatchColor": "hsl(332, 70%, 50%)"
          },
          {
            "column": "iphone",
            "iphone": phoneTotal,
            "iphoneColor": "hsl(125, 70%, 50%)"
          }
        )
        setBarData(refinedData)

      } else {

        if (props.data && props.data !== "") {
          let refinedData = [];
          for (let device in props.data[props.endPoint]) {
            refinedData.push({
              "column": device,
              [device]: props.data[props.endPoint][device],
              [`${device}Color`]: displayReference[device]["color"]
            })
          }
          setBarData(refinedData)
        }
      }
    }

    handleDataRestructure()

  }, [props.data])

  useEffect(() => {
    if (props.watchPhone) {
      setLegendList([
        'iphone',
        'iwatch'
      ])
    }
  }, [])

  return (
    <>
      {barData ?
        <ResponsiveBar

          data={barData ? barData : data}
          layout={props.makeHorizontal ? "horizontal" : "vertical"}
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
          keys={legendList}
          indexBy="column"
          margin={{ top: 50, right: 150, bottom: 50, left: 90 }}
          padding={0.35}
          valueScale={{ type: 'linear' }}
          indexScale={{ type: 'band', round: true }}
          colors={{ scheme: 'set3' }}
          min-width={0}
          defs={[
            {
              id: 'dots',
              type: 'patternDots',
              background: 'inherit',
              color: '#38bcb2',
              size: 4,
              padding: 1,
              stagger: true
            },
            {
              id: 'lines',
              type: 'patternLines',
              background: 'inherit',
              color: '#eed312',
              rotation: -45,
              lineWidth: 6,
              spacing: 10
            }
          ]}
          fill={[
            {
              match: {
                id: 'IPHONE'
              },
              id: 'dots'
            },
            {
              match: {
                id: 'ANDROID'
              },
              id: 'lines'
            }
          ]}
          borderRadius={4}
          borderColor={{
            from: 'color',
            modifiers: [
              [
                'darker',
                '1.2'
              ]
            ]
          }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: '',
            legendPosition: 'middle',
            legendOffset: 32
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: '',
            legendPosition: 'middle',
            legendOffset: -40
          }}
          enableLabel={false}
          labelSkipWidth={7}
          labelSkipHeight={12}
          labelTextColor="#090b0e"
          legends={[
            {
              dataFrom: 'keys',
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: 120,
              translateY: 0,
              itemsSpacing: 2,
              itemWidth: 100,
              itemHeight: 20,
              itemDirection: 'left-to-right',
              itemOpacity: 0.85,
              symbolSize: 20,
              effects: [
                {
                  on: 'hover',
                  style: {
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
          role="application"
          isFocusable={true}
          ariaLabel="Nivo bar chart demo"
          barAriaLabel={e => e.id + ": " + e.formattedValue + " in country: " + e.indexValue}
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

export default BarChart;