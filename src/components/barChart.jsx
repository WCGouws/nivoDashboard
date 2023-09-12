import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { colorTokens } from "../theme";
import { barMockData as data } from "../data/mockData";
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react';


const BarChart = (props) => {
    const theme = useTheme();
    const colors = colorTokens(theme.palette.mode);
    const [barData, setBarData] = useState('');

    const displayReference = {
        "PHYSICALCARD": {
            displayName: "Physical Card",
            color: "hsl(277, 70%, 50%)"
        },
        "ANDROID": {
            displayName: "Android",
            color: "hsl(314, 70%, 50%)"
        },
        "IPHONE": {
            displayName: "iPhone",
            color: "hsl(125, 70%, 50%)"
        },
        "APPLEWATCH": {
            displayName: "Apple Watch",
            color: "hsl(332, 70%, 50%)"
        },
    }

    async function fetchSeparates() {
        const [studentsRes, staffRes, affiliatesRes] = await Promise.all([
            fetch("https://raox6sjwhzkfl26hyiiwgcpaem0wbxsh.lambda-url.us-east-1.on.aws/?fetchGroup=students"),
            fetch("https://raox6sjwhzkfl26hyiiwgcpaem0wbxsh.lambda-url.us-east-1.on.aws/?fetchGroup=staff"),
            fetch("https://raox6sjwhzkfl26hyiiwgcpaem0wbxsh.lambda-url.us-east-1.on.aws/?fetchGroup=affiliates")

        ])
        // const [studentsRes, staffRes, affiliatesRes] = await Promise.all([
        //     fetch("http://localhost:3001/students"),
        //     fetch("http://localhost:3001/staff"),
        //     fetch("http://localhost:3001/affiliates")
        // ])

        let students = await studentsRes.text();
        let staff = await staffRes.text();
        let affiliates = await affiliatesRes.text();

        students = await JSON.parse(students)
        staff = await JSON.parse(staff)
        affiliates = await JSON.parse(affiliates)

        const response = {
            "Students": students.body,
            "Staff": staff.body,
            "Affiliates": affiliates.body
        }

        return response;
    }

    useEffect(() => {

        async function handleDataRestructure() {
            if (props.displayAll) {
                const seperates = await fetchSeparates();

                let refinedData = [];

                for (let patron in seperates) {
                    let miniObj = { "column": patron }
                    for (let device in seperates[patron]) {
                        miniObj[device] = seperates[patron][device]
                        miniObj[`${device}Color`] = displayReference[device]["color"]
                    }
                    refinedData.push(miniObj)
                }
                setBarData(refinedData)
            } else if (props.data && props.data !== "" && props.watchPhone) {
                let refinedData = [];
                let watchTotal = props.data["APPLEWATCH"]
                let phoneTotal = props.data["IPHONE"]
                refinedData.push(
                    {
                        "column": "APPLEWATCH",
                        "APPLEWATCH": watchTotal,
                        "APPLEWATCHColor": "hsl(332, 70%, 50%)"
                    },
                    {
                        "column": "IPHONE",
                        "IPHONE": phoneTotal,
                        "IPHONEColor": "hsl(125, 70%, 50%)"
                    }
                )
                setBarData(refinedData)
            } else {
                if (props.data && props.data !== "") {
                    let refinedData = [];
                    for (let device in props.data) {
                        refinedData.push({
                            "column": device,
                            [device]: props.data[device],
                            [`${device}Color`]: displayReference[device]["color"]
                        })
                    }
                    setBarData(refinedData)
                }
            }
        }

        handleDataRestructure()

    }, [props.data])

    return (
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
            keys={[
                'IPHONE',
                'APPLEWATCH',
                'ANDROID',
                'PHYSICALCARD',

            ]}
            indexBy="column"
            margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
            padding={0.35}
            valueScale={{ type: 'linear' }}
            indexScale={{ type: 'band', round: true }}
            colors={{ scheme: 'nivo' }}
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
                legend: 'Patron',
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
            labelTextColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        1.6
                    ]
                ]
            }}
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
            role="application"
            isFocusable={true}
            ariaLabel="Nivo bar chart demo"
            barAriaLabel={e => e.id + ": " + e.formattedValue + " in country: " + e.indexValue}
        />
    )
}

export default BarChart;