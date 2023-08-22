import { useTheme } from "@mui/material";
import { ResponsiveLine } from '@nivo/line'
import { colorTokens } from "../theme";
import { lineMockData as data } from "../data/mockData";

const LineChart = () => {
    const theme = useTheme();
    const colors = colorTokens(theme.palette.mode);

    return (
        <ResponsiveLine
            data={data}
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