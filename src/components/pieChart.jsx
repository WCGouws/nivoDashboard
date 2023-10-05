import { Box, useTheme, useMediaQuery } from "@mui/material";
import { ResponsivePie } from '@nivo/pie'
import { colorTokens } from "../theme";
import { useEffect, useState } from "react";

const PieChart = (props) => {
  const theme = useTheme();
  const colors = colorTokens(theme.palette.mode);
  const [pieData, setPieData] = useState(false)
  const [weekValues, setWeekValues] = useState(null)
  const isMobileSmall = useMediaQuery(theme.breakpoints.down("xs"))
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const isTablet = useMediaQuery(theme.breakpoints.down('md'))
  const isDesktopSmall = useMediaQuery('(max-width: 1100px)')

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
    let refinedData = [];
    if (props.data && props.data !== "" && props.displayAll) {
      for (let item in displayReference) {
        refinedData.push({
          "id": item,
          "label": displayReference[item]["displayName"],
          "value": parseInt(props.data[props.endPoint][item]),
          "color": displayReference[item]["color"]
        })
      }
      setPieData(refinedData)
    } else if (props.data && props.data !== "" && props.mobileCard) {
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
    } else if (props.data && props.data !== "") {
      let refinedData = [];
      const currDate = new Date();
      currDate.setFullYear(currDate.getFullYear() - 1);
      const oneWeek = new Date(currDate);
      const twoWeeks = new Date(currDate);
      const threeWeeks = new Date(currDate);
      const fourWeeks = new Date(currDate);
      oneWeek.setDate(currDate.getDate() + 7);
      twoWeeks.setDate(currDate.getDate() + 14);
      threeWeeks.setDate(currDate.getDate() + 21);
      fourWeeks.setDate(currDate.getDate() + 28);
      let countThisWeek = 0;
      let countTwoWeeks = 0;
      let countThreeWeeks = 0;
      let countFourWeeks = 0;

      let allData = []
      let weekVsValue = {
        "1 Week": [],
        "2 Weeks": [],
        "3 Weeks": [],
        "4 Weeks": []
      }
      const filteredData = props.data["expiringDevices"]['expiring_cards'].filter(item => {
        const itemData = new Date(item["MEDIAEXPIRATION"])

        if ((itemData.getDate() >= currDate.getDate()) && (itemData.getDate() <= oneWeek.getDate())) {
          countThisWeek = countThisWeek + 1;
          allData.push(item)
          weekVsValue["1 Week"].push(item)
          item["rowColor"] = "rgba(162, 8, 40, 0.5)"
          item["rowColorBorder"] = "rgba(162, 8, 40, 0.7)"
        } else if ((itemData.getDate() >= oneWeek.getDate()) && (itemData.getDate() <= twoWeeks.getDate())) {
          countTwoWeeks = countTwoWeeks + 1;
          allData.push(item)
          weekVsValue["2 Weeks"].push(item)
          item["rowColor"] = "rgba(211, 52, 44, 0.5)"
          item["rowColorBorder"] = "rgba(211, 52, 44, 0.7)"
        } else if ((itemData.getDate() >= twoWeeks.getDate()) && (itemData.getDate() <= threeWeeks.getDate())) {
          countThreeWeeks = countThreeWeeks + 1;
          allData.push(item)
          weekVsValue["3 Weeks"].push(item)
          item["rowColor"] = "rgba(240, 111, 73, 0.5)"
          item["rowColorBorder"] = "rgba(240, 111, 73, 0.7)"
        } else if ((itemData.getDate() >= threeWeeks.getDate()) && (itemData.getDate() <= fourWeeks.getDate())) {
          countFourWeeks = countFourWeeks + 1;
          allData.push(item)
          weekVsValue["4 Weeks"].push(item)
          item["rowColor"] = "rgba(250, 175, 104, 0.5)"
          item["rowColorBorder"] = "rgba(250, 175, 104, 0.7)"
        }

        return (
          itemData
        );
      });
      setWeekValues(weekVsValue)

      refinedData.push(
        { "id": "1 Week", "value": countThisWeek },
        { "id": "2 Weeks", "value": countTwoWeeks },
        { "id": "3 Weeks", "value": countThreeWeeks },
        { "id": "4 Weeks", "value": countFourWeeks }
      );

      props.updateTableData({
        data: allData,
        keyFilter: ["VAL_NAM_FIRST", "PATRONID", "MEDIATYPE", "MEDIAEXPIRATION"]
      })
      setPieData(refinedData);
    }
  }

  function handleSegmentClick(node) {
    const id = node.data.id
    const records = weekValues[id]
    props.updateTableData({
      data: records,
      keyFilter: ["VAL_NAM_FIRST", "PATRONID", "MEDIATYPE", "MEDIAEXPIRATION"]
    })
  }

  useEffect(() => {
    handleDataRestructure()
  }, [props.data])

  return (
    <>
      {pieData ? <ResponsivePie
        onClick={props.hasOnClick && handleSegmentClick}
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
        colors={{ scheme: props.colorTheme }}
        margin={isMobile ? { top: 40, right: 0, bottom: 0, left: 0 } : { top: 10, right: 100, bottom: 20, left: 50 }}
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
            anchor: isMobile ? 'top' : 'bottom-right',
            direction: isMobile ? 'row' : 'column',
            justify: false,
            translateX: isMobile ? 0 : 160,
            translateY: isMobile ? -40 : 10,
            itemsSpacing: isMobile ? 2 : 4,
            itemWidth: isMobile ? 74 : 150,
            itemHeight: 20,
            itemTextColor: theme.palette.mode=="dark" ? colors.lightGray[600]: "#333",
            itemDirection: isMobile ? 'top-to-bottom' : 'left-to-right',
            itemOpacity: 1,
            symbolSize: isMobile ? 8 : 12,
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
            <div style={{ background: colors.blue[800], padding: '6px 10px' }}>
              <div>{item.datum.id + " " + item.datum.value}</div>
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