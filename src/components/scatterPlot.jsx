import { Box, useTheme } from "@mui/material";
import { ResponsiveScatterPlot } from '@nivo/scatterplot';
import { colorTokens } from "../theme";
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react';

const ScatterPlotChart = (props) => {
  const theme = useTheme();
  const colors = colorTokens(theme.palette.mode);
  const [barData, setBarData] = useState('');
  const [legendList, setLegendList] = useState([])
  let refinedData = [];
  let count = [];
  let dimensions = [];

  

  useEffect(() => {


    async function handleDataRestructure() {
        if (props.data && props.data !== "") {
            
            let data = props.data["lostCards"]['lost_cards'];

            data.forEach((number) =>{
                let item=number["lostcount"]
                count[item]=0;
            })
            
            for (let k=0;k<data.length;k++){
                count[props.data["lostCards"]['lost_cards'][k]["lostcount"]]++;
            }

           for (const key in count){
            dimensions.push(count[key]);
            refinedData.push({"id":key, "data": [{x:key,y:count[key]}]});
           }
            

            setBarData(refinedData);
            setLegendList(dimensions);
        }  else {
        
        }
    }

    handleDataRestructure()

  }, [props.data])



  return(
    <>
        {barData ? <ResponsiveScatterPlot
        data={barData ? barData : data}
        margin={{ top: 60, right: 140, bottom: 70, left: 90 }}
        xScale={{ type: 'linear', min: 0, max: 'auto' }}
        xFormat=">-.2f"
        yScale={{ type: 'linear', min: 0, max: 'auto' }}
        yFormat=">-.2f"
        colors={{ scheme: 'pastel2' }}
        background={'#ffffff'}
        blendMode={"normal"}
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
            },
           
          }}
        
        enableGridX={false}
        
        axisTop={null}
        axisRight={null}
        axisBottom={{
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'amount of times that card was lost',
            legendPosition: 'middle',
            legendOffset: 46
        }}
        axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'amount of people',
            legendPosition: 'middle',
            legendOffset: -60
        }}
        legends={[]}
        tooltip={(item) => {
            return (
              <div style={{ background: colors.blue[800], padding: '6px 30px' }}>
                <div>{item.node.data.x+":"+item.node.data.y}</div>
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
)}

export default ScatterPlotChart;