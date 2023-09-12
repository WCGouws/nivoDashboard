import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { colorTokens } from "../../../theme";
import Header from "../../../components/headers";
import BarChart from "../../../components/barChart";
import LineChart from "../../../components/lineChart";
import PieChart from "../../../components/pieChart";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import StatBox from "../../../components/statBox";
import onDownload from "../../../components/downloadPage";
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { useEffect, useState } from 'react';
import { Grid } from "@mui/material";

// https://raox6sjwhzkfl26hyiiwgcpaem0wbxsh.lambda-url.us-east-1.on.aws/
const DashBoard = (props) => {
    const theme = useTheme();
    const colors = colorTokens(theme.palette.mode);
    const [responseData, setResponseData] = useState('');

    useEffect(() => {
        async function APICall() {
            // let response = await fetch(`http://localhost:3001/${props.endPoint}`);
            let response = await fetch(`https://raox6sjwhzkfl26hyiiwgcpaem0wbxsh.lambda-url.us-east-1.on.aws/?fetchGroup=${props.endPoint}`)
            let data = await response.text()
            data = await JSON.parse(data)
            data = data.body
            for (let item in data) {
                data[item] = parseInt(data[item])
            }
            setResponseData(data);
        }
        APICall()
    }, [props.endPoint])


    return (
        <Box m="20px" >
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Grid container spacing={{ xs: 2, sm: 2, md: 2 }} columns={{ md: 12 }}>
                    <Grid item xs={12} sm={6} md={6}>
                        <Header title="DASHBOARD" subtitle={`MIT Dashboard ${props.endPoint.charAt(0).toUpperCase() + props.endPoint.slice(1)}`} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} textAlign="right">
                        <Box >
                            <Button
                                sx={{ backgroundColor: colors.gray[700], color: colors.gray[100], fontSize: "14px", fontWeight: "bold", padding: "10px 20px" }}
                                onClick={onDownload}>
                                <DownloadOutlinedIcon sx={{ mr: "10px" }} />
                                Download
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <Box gap="20px">
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    <Grid item xs={12} sm={4} md={3}>
                        <Box
                            backgroundColor={colors.black[700]}
                            alignItems="center"
                            justifyContent="center"
                            gridColumn="span 3"
                            padding={2}
                        >

                            <StatBox
                                tilte="Total Patrons:"
                                amount={responseData["PHYSICALCARD"] + responseData["ANDROID"] + responseData["APPLEWATCH"] + responseData["IPHONE"]}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={4} md={3}>
                        <Box backgroundColor={colors.black[700]}
                            alignItems="center"
                            justifyContent="center"
                            gridColumn="span 3"
                            padding={2}>
                            <StatBox
                                tilte="Total Devices:"
                                amount={responseData["ANDROID"] + responseData["IPHONE"] + responseData["APPLEWATCH"]}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={4} md={3}>
                        <Box backgroundColor={colors.black[700]}
                            alignItems="center"
                            justifyContent="center"
                            gridColumn="span 3"
                            padding={2}>
                            <StatBox
                                tilte="Total Cards:"
                                amount={responseData["PHYSICALCARD"]}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={4} md={3}>
                        <Box backgroundColor={colors.black[700]}
                            alignItems="center"
                            justifyContent="center"
                            gridColumn="span 3"
                            padding={2}>
                            <StatBox
                                tilte="Total Mobiles:"
                                amount={responseData["ANDROID"] + responseData["IPHONE"]}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <Box backgroundColor={colors.black[700]}
                            alignItems="center"
                            justifyContent="center"
                            gridColumn="span 3"
                            padding={2}>
                            <Box
                                mt="25px"
                                p="0 30px"
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                            >
                                <Box>
                                    <Typography variant="h5" fontWeight="600" color={colors.indigo[300]}>All Devices</Typography>
                                </Box>
                            </Box>
                            <Box height="250px" mt="20px">
                                <PieChart data={responseData} displayAll={true} watchPhone={false} mobileCard={false} makePie={false} arcLabel={false} />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <Box backgroundColor={colors.black[700]}
                            alignItems="center"
                            justifyContent="center"
                            gridColumn="span 3"
                            padding={2}>
                            <Box
                                mt="25px"
                                p="0 30px"
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                            >
                                <Box>
                                    <Typography variant="h5" fontWeight="600" color={colors.indigo[300]}>All Devices per Patron group</Typography>
                                </Box>
                            </Box>
                            <Box height="250px" mt="20px">
                                {props.endPoint === "all" ?
                                    <BarChart data={responseData} displayAll={true} makeHorizontal={false} />
                                    :
                                    <BarChart data={responseData} displayAll={false} makeHorizontal={false} />
                                }
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <Box backgroundColor={colors.black[700]}
                            alignItems="center"
                            justifyContent="center"
                            gridColumn="span 3"
                            padding={2}>
                            <Box
                                mt="25px"
                                p="0 30px"
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                            >
                                <Box>
                                    <Typography variant="h5" fontWeight="600" color={colors.indigo[300]}></Typography>
                                </Box>
                            </Box>

                            <StatBox
                                tilte="Applewatch & Iphone:"
                                amount={responseData["APPLEWATCH"] + responseData["IPHONE"]}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <Box backgroundColor={colors.black[700]}
                            alignItems="center"
                            justifyContent="center"
                            gridColumn="span 3"
                            padding={2}>
                            <Box
                                mt="25px"
                                p="0 30px"
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                            >
                                <Box>
                                    <Typography variant="h5" fontWeight="600" color={colors.indigo[300]}></Typography>
                                </Box>
                            </Box>
                            <StatBox
                                tilte="Mobile & Card:"
                                amount={responseData["ANDROID"] + responseData["IPHONE"] + responseData["PHYSICALCARD"]}
                            />

                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <Box backgroundColor={colors.black[700]}
                            alignItems="center"
                            justifyContent="center"
                            gridColumn="span 3"
                            padding={2}>
                            <Box
                                mt="25px"
                                p="0 30px"
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                            >
                                <Box>
                                    <Typography variant="h5" fontWeight="600" color={colors.indigo[300]}>AppleWatch & Iphone</Typography>
                                </Box>
                            </Box>
                            <Box height="250px" mt="20px">
                                <BarChart data={responseData} displayAll={false} watchPhone={true} mobileCard={false} makeHorizontal={true} />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <Box backgroundColor={colors.black[700]}
                            alignItems="center"
                            justifyContent="center"
                            gridColumn="span 3"
                            padding={2}>
                            <Box
                                mt="25px"
                                p="0 30px"
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                            >
                                <Box>
                                    <Typography variant="h5" fontWeight="600" color={colors.indigo[300]}>Mobile & Cards</Typography>
                                </Box>
                            </Box>
                            <Box height="250px" mt="20px">
                                <PieChart data={responseData} displayAll={false} watchPhone={false} mobileCard={true} makePie={true} arcLabel={true} />
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>


        </Box >
    )
};

export default DashBoard;