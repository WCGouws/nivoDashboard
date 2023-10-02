import { Box, useTheme } from "@mui/material";
import { ResponsivePie } from '@nivo/pie'
import { colorTokens } from "../theme";
import { useEffect, useState } from "react";

const PieChart = (props) => {
  const theme = useTheme();
  const colors = colorTokens(theme.palette.mode);
  const [pieData, setPieData] = useState(false)

  const displayReference = {
    "physical_card": {
      displayName: "Physical Card",
      color: "hsl(318, 70%, 50%)"
    },
    "android": {
      displayName: "Android",
      color: "hsl(125, 70%, 50%)"
    },
    "iphone": {
      displayName: "iPhone",
      color: "hsl(205, 70%, 50%)"
    },
    "iwatch": {
      displayName: "Apple Watch",
      color: "hsl(56, 70%, 50%)"
    },
  }

  function handleDataRestructure() {
    if (props.data && props.data !== "" && props.displayAll) {
      let refineData = [];
      for (let item in displayReference) {
        refineData.push({
          "id": item,
          "label": displayReference[item]["displayName"],
          "value": parseInt(props.data[props.endPoint][item]),
          "color": displayReference[item]["color"]
        })
      }
      setPieData(refineData)
    } else if (props.data && props.data !== "" && props.mobileCard) {
      let refinedData = [];
      let mobileTotal = props.data[props.endPoint]["iphone"] + props.data[props.endPoint]["android"]
      let cardTotal = props.data[props.endPoint]["physical_card"]
      refinedData.push(
        {
          "id": "Mobile",
          "label": "Mobile",
          "value": mobileTotal,
          "color": "hsl(125, 70%, 50%)"
        },
        {
          "id": "Card",
          "label": "Card",
          "value": cardTotal,
          "color": "hsl(318, 70%, 50%)"
        })

      setPieData(refinedData)
    }
  }

  useEffect(() => {
    handleDataRestructure()
  }, [props.data])

  return (
    <>
      {pieData ? <ResponsivePie
        data={pieData}
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
            },
            legends: {
              text: {
                fill: colors.lightGray[700]
              }
            }
          }
        }}
        colors={{ scheme: 'pastel2' }}
        margin={{ top: 10, right: 100, bottom: 20, left: 50 }}
        min-width={0}
        innerRadius={props.makePie ? 0 : 0.3}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
          from: 'color',
          modifiers: [
            [
              'darker',
              0.2
            ]
          ]
        }}
        enableArcLinkLabels={false}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsDiagonalLength={10}
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        enableArcLabels={props.arcLabel ? true : false}

        arcLabelsTextColor="#090b0e"
        legends={[
          {
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 80,
            translateY: 10,
            itemsSpacing: 4,
            itemWidth: 150,
            itemHeight: 20,
            itemTextColor: theme.palette.mode=="dark" ? colors.lightGray[600]: "#333",
            itemDirection: 'left-to-right',
            itemOpacity: 1,
            symbolSize: 12,
            symbolShape: 'circle',
            effects: [
              {
                on: 'hover',
                style: {
                  itemTextColor: colors.lightGray[700]
                }
              }
            ]
          }
        ]}
        tooltip={(item) => {
          return (
            <div style={{ background: colors.blue[800], padding: '6px 30px' }}>
              <div>{item.datum.value}</div>
            </div>
          )
        }}
      /> :
        <Box display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <img src="loading.gif" alt="Loading indicator not found" style={{ width: "4rem", marginTop: "4rem" }} />
        </Box>}

    </>

  )
}

export default PieChart;