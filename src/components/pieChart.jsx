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

  useEffect(() => {

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
      let refineData = [];
      let mobileTotal = props.data[props.endPoint]["iphone"] + props.data[props.endPoint]["android"]
      let cardTotal = props.data[props.endPoint]["physical_card"]
      refineData.push(
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

      setPieData(refineData)
    } else if (props.data && props.data !== "" && props.watchPhone) {
        let refinedData = [];
        const currDate = new Date();
        currDate.setFullYear(currDate.getFullYear()-1);
        const oneWeek = new Date(currDate);
        const twoWeeks = new Date(currDate);
        const threeWeeks = new Date(currDate);
        const fourWeeks = new Date(currDate);
        oneWeek.setDate(currDate.getDate()+7);
        twoWeeks.setDate(currDate.getDate()+14);
        threeWeeks.setDate(currDate.getDate()+21);
        fourWeeks.setDate(currDate.getDate()+28);
        let countThisWeek = 0;
        let countTwoWeeks = 0;
        let countThreeWeeks = 0;
        let countFourWeeks = 0;
        const filteredData = props.data["expiringDevices"]['exp_cards'].filter(item => {
          const itemData = new Date(item["MEDIAEXPIRATION"])
                  
          if ((itemData.getDate() >= currDate.getDate())&&(itemData.getDate()<=oneWeek.getDate())){
              countThisWeek=countThisWeek+1;
          } else if((itemData.getDate() >= oneWeek.getDate())&&(itemData.getDate()<=twoWeeks.getDate())){
              countTwoWeeks=countTwoWeeks+1;
          } else if((itemData.getDate() >= twoWeeks.getDate())&&(itemData.getDate()<=threeWeeks.getDate())){
              countThreeWeeks=countThreeWeeks+1;
          } else if((itemData.getDate() >= threeWeeks.getDate())&&(itemData.getDate()<=fourWeeks.getDate())){
              countFourWeeks=countFourWeeks+1;     
          }
                  
          return (
            itemData
          );
        });
            
        refinedData.push(
            {"id":"Cards expiring in 1 week", "value": countThisWeek},
            {"id":"Cards expiring in 2 weeks", "value": countTwoWeeks},
            {"id":"Cards expiring in 3 weeks", "value": countThreeWeeks},
            {"id":"Cards expiring in 4 weeks", "value": countFourWeeks}
        );
        setPieData(refinedData);
    }
  }, [props.data])

  return (
    <>
      {pieData ? <ResponsivePie
        data={pieData ? pieData : mockData}
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
            itemTextColor: colors.lightGray[600],
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