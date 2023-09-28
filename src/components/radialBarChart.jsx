import { ResponsiveRadialBar } from '@nivo/radial-bar'
import { Box, useTheme } from "@mui/material";
import { colorTokens } from "../theme";
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react';


const RadialBarChart = (props) => {

    const theme = useTheme();
    const colors = colorTokens(theme.palette.mode);
    const [barData, setBarData] = useState('');
    const [legendList, setLegendList] = useState([
        'Cards expiring in the next 30 days',
        'Cards expiring next Month',
        'Cards expiring in this week',
    ])
    let refinedData = [];

    useEffect(() => {

        async function handleDataRestructure() {
            if (props.data && props.data !== ""){
                const currDate = new Date();
                currDate.setFullYear(currDate.getFullYear()-1);
                const currYear = currDate.getFullYear();
                const currMonth = currDate.getMonth() + 1;
                const nextMonth = currMonth+1;
                const oneWeek = new Date(currDate);
                oneWeek.setDate(currDate.getDate()+7);
                const twoMonths = currMonth+1;
                let countThisMonth = 0;
                let countNextMonth = 0;
                let countTwoMonths = 0;
                const filteredData = props.data["expiringDevices"]['exp_cards'].filter(item => {
                    const itemData = new Date(item["MEDIAEXPIRATION"])
                    
                    if ((itemData.getFullYear() == currYear)&&(itemData.getMonth()+1==currMonth)){
                        countThisMonth=countThisMonth+1;
                    } else if((itemData.getFullYear() == currYear)&&(itemData.getMonth()+1==nextMonth)){
                        countNextMonth=countNextMonth+1;
                    } else if((itemData.getFullYear() == currYear)&&(itemData.getMonth()+1==twoMonths)){
                        countTwoMonths=countTwoMonths+1;
                    } else {
                        
                    }
                    
                    return (
                        itemData
                    );
                });
                
                refinedData.push(
                    {"id":"this month", "data": [{x:"amount1",y:countThisMonth}]},
                    {"id":"next month", "data": [{x:"amount2",y:countNextMonth}] },
                    {"id":"the month after next", "data": [{x:"amount3",y:countTwoMonths}] }
                );
                setBarData(refinedData);
            }
            
        }
    
        handleDataRestructure()
      }, [props.data])


    return(
        <>
            {barData ? <ResponsiveRadialBar
                data={barData ? barData : data}
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
                tooltip={(item) => {
                    return (
                      <div style={{ background: colors.blue[800], padding: '6px 30px' }}>
                        <div>{item.bar.data.y}</div>
                      </div>
                    )
                  }}
                />:
                <Box display="flex"
                    justifyContent="center"
                    alignItems="center"
                    >
                    <img src="loading.gif" alt="Loading indicator not found" style={{ width: "4rem", marginTop: "4rem" }} />
                </Box>
            }
        </>
    );
    
    }

    export default RadialBarChart;