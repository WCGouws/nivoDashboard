import { useTheme } from "@mui/material";
import { ResponsiveLine } from '@nivo/line'
import { colorTokens } from "../theme";
import { useEffect, useState } from "react";

const LineChart = (props) => {
  const theme = useTheme();
  const colors = colorTokens(theme.palette.mode);
  const [lineData, setLineData] = useState(false);

  const displayReference = {
    "PHYSICALCARD": {
      displayName: "Physical Card",
      color: "hsl(194, 70%, 50%)"
    },
    "ANDROID": {
      displayName: "Android",
      color: "hsl(290, 70%, 50%))"
    },
    "IPHONE": {
      displayName: "iPhone",
      color: "hsl(121, 70%, 50%)"
    },
    "APPLEWATCH": {
      displayName: "Apple Watch",
      color: "hsl(93, 70%, 50%)"
    },
  }

  useEffect(() => {
    if (props.data && props.data !== "") {
      let refineData = [];
      for (let device in props.data) {
        refineData.push({
          "id": device,
          "color": displayReference[device]["color"],
          "data": [{
            "x": displayReference[device]["displayName"],
            "y": parseInt(props.data[device]),
          }],
        })
      }
      setLineData(refineData)
    }

  }, [props.data])
  return (
    <ResponsiveLine
      data={lineData ? lineData : data}
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
        legend: 'Device',
        legendOffset: 34,
        legendPosition: 'middle'
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 1,
        legend: 'count',
        legendOffset: -46,
        legendPosition: 'middle'
      }}
      enableGridX={false}
      lineWidth={1}
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
    />
  )
}

export default LineChart;