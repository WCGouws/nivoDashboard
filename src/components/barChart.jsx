import { Box, useTheme, useMediaQuery } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { colorTokens } from "../theme";
import { useEffect, useState } from 'react';

const BarChart = (props) => {
  const theme = useTheme();
  const colors = colorTokens(theme.palette.mode);
  const [barData, setBarData] = useState('');
  const [legendList, setLegendList] = useState('')
  const isMobileSmall = useMediaQuery(theme.breakpoints.down("xs"))
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const isTablet = useMediaQuery(theme.breakpoints.down('md'))
  const isDesktopSmall = useMediaQuery('(max-width: 1100px)')

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
      displayName: "iWatch",
      color: "hsl(332, 70%, 50%)"
    },
  }

  function handleDataRestructure() {
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
            miniObj[displayReference[device]["displayName"]] = patronGroupsOnly[patronGroup][device]
            miniObj[`${displayReference[device]["displayName"]}Color`] = displayReference[device]["color"]
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
          "column": "iWatch",
          "iWatch": watchTotal,
          "iWatchColor": "hsl(332, 70%, 50%)"
        },
        {
          "column": "iPhone",
          "iPhone": phoneTotal,
          "iPhoneColor": "hsl(125, 70%, 50%)"
        }
      )
      setBarData(refinedData)

    } else {

      if (props.data && props.data !== "") {
        let refinedData = [];
        for (let device in props.data[props.endPoint]) {
          if (device !== "devices_total") {
            refinedData.push({
              "column": displayReference[device]["displayName"],
              [displayReference[device]["displayName"]]: props.data[props.endPoint][device],
              [`${displayReference[device]["displayName"]}Color`]: displayReference[device]["color"]
            })
          }
        }
        setBarData(refinedData)
      }
    }
  }

  useEffect(() => {
    handleDataRestructure()
  }, [props.data])

  useEffect(() => {
    if (props.watchPhone) {
      setLegendList([
        'iPhone',
        'iWatch'
      ])
    } else {
      setLegendList([
        'iPhone',
        'iWatch',
        'Android',
        'Physical Card',
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
                  fill: theme.palette.mode == "dark" ? colors.lightGray[700] : colors.black[200]
                }
              },
              ticks: {
                line: {
                  stroke: colors.lightGray[700],
                  strokeWidth: 1
                },
                text: {
                  fill: theme.palette.mode == "dark" ? colors.lightGray[700] : "#333"
                }
              }
            },
            legends: {
              text: {
                fill: theme.palette.mode == "dark" ? colors.lightGray[700] : colors.black[100]
              }
            }
          }}
          keys={legendList}
          indexBy="column"
          margin={isMobile ? { top: 50, right: 5, bottom: 20, left: 35 } : { top: 50, right: 150, bottom: 50, left: 90 }}
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
            tickValues: isMobile ? 5 : 10,
            tickPadding: 5,
            tickRotation: 0,
            legend: '',
            legendPosition: 'middle',
            legendOffset: isMobile ? 20 : 32
          }}
          axisLeft={{
            tickSize: isMobile ? 1 : 3,
            tickValues: isMobile ? 5 : 12,
            tickPadding: isMobile ? 1 : 5,
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
              anchor: isMobile ? 'top' : 'bottom-right',
              direction: isMobile ? 'row' : 'column',
              justify: false,
              translateX: isMobile ? -10 : 120,
              translateY: isMobile ? -48 : 0,
              itemsSpacing: isMobile ? 1 : 2,
              itemWidth: isMobile ? 60 : 100,
              itemHeight: 20,
              itemDirection: isMobile ? 'top-to-bottom' : 'left-to-right',
              itemOpacity: 0.85,
              symbolSize: isMobile ? 10 : 20,
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
              <div style={{ background: colors.blue[800], padding: '6px 10px' }}>
                <div>{item.id + " " + item.value}</div>
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