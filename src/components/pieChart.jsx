import { useTheme } from "@mui/material";
import { ResponsivePie } from '@nivo/pie'
import { colorTokens } from "../theme";
import { PieMockData as data } from "../data/mockData";

const PieChart = () => {
    const theme = useTheme();
    const colors = colorTokens(theme.palette.mode);

    return (
        <ResponsivePie
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
            margin={{ top: 40, right: 130, bottom: 80, left: 50 }}
            innerRadius={0.5}
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
            arcLabelsTextColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        2
                    ]
                ]
            }}
            legends={[
                {
                    anchor: 'right',
                    direction: 'column',
                    justify: false,
                    translateX: 80,
                    translateY: 10,
                    itemsSpacing: 0,
                    itemWidth: 69,
                    itemHeight: 20,
                    itemTextColor: '#999',
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
        />
    )
}

export default PieChart;