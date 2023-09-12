import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { colorTokens } from "../../../theme";
import Header from "../../../components/headers";
import BarChart from "../../../components/barChart";
import LineChart from "../../../components/lineChart";
import PieChart from "../../../components/pieChart";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import StatBox from "../../../components/statBox";

const Student = () => {
    const theme = useTheme();
    const colors = colorTokens(theme.palette.mode);

    return (<Box m="20px" >
        <Box display="flex" justifyContent="space-between" alignItems="center">
            <Header title="STUDENTS" subtitle="MIT Student Overview" />


            <Box>
                <Button
                    sx={{ backgroundColor: colors.gray[700], color: colors.gray[100], fontSize: "14px", fontWeight: "bold", padding: "10px 20px" }}
                >
                    <DownloadOutlinedIcon sx={{ mr: "10px" }} />
                    Download
                </Button>
            </Box>
        </Box>
        <Box
            display="grid"
            gridTemplateColumns="repeat(12,1fr)"
            gridAutoRows="140px"
            gap="20px"
        >

            <Box
                gridColumn="span 3"
                backgroundColor={colors.black[700]}
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <StatBox
                    tilte="Total Patrons:"
                    subtitle="15 000"
                />
            </Box>
            <Box
                gridColumn="span 3"
                backgroundColor={colors.black[700]}
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <StatBox
                    tilte="Total Devices:"
                    subtitle="12 000"
                />
            </Box>
            <Box
                gridColumn="span 3"
                backgroundColor={colors.black[700]}
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <StatBox
                    tilte="Total Cards:"
                    subtitle="3 000"
                />
            </Box>
            <Box
                gridColumn="span 3"
                backgroundColor={colors.black[700]}
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <StatBox
                    tilte="Total Mobiles:"
                    subtitle="10 500"
                />
            </Box>

            <Box
                gridColumn="span 5"
                gridRow="span 2"
                backgroundColor={colors.black[700]}
            >
                <Box
                    mt="25px"
                    p="0 30px"
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Box>
                        <Typography variant="h5" fontWeight="600" color={colors.indigo[300]}>Devices</Typography>
                    </Box>
                </Box>
                <Box height="250px" mt="20px">
                    <LineChart />
                </Box>
            </Box>
            <Box
                gridColumn="span 5"
                gridRow="span 2"
                backgroundColor={colors.black[700]}
            >
                <Box
                    mt="25px"
                    p="0 30px"
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Box>
                        <Typography variant="h5" fontWeight="600" color={colors.indigo[300]}>Patrons</Typography>
                    </Box>
                </Box>
                <Box height="240px" mt="20px">
                    <BarChart />
                </Box>
            </Box>
            <Box
                gridColumn="span 2"
                gridRow="span 2"
                backgroundColor={colors.black[700]}
            >
                <Box
                    mt="25px"
                    p="0 30px"
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Box>
                        <Typography variant="h5" fontWeight="600" color={colors.indigo[300]}>Other</Typography>
                    </Box>
                </Box>
                <Box height="270px" mt="10px">
                    <PieChart />
                </Box>
            </Box>
            <Box
                gridColumn="span 3"
                gridRow="span 2"
                backgroundColor={colors.black[700]}
            >
                <Box
                    mt="25px"
                    p="0 30px"
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Box>
                        <Typography variant="h5" fontWeight="600" color={colors.indigo[300]}>Other</Typography>
                    </Box>
                </Box>
                <Box height="250px" mt="20px">

                </Box>
            </Box>
            <Box
                gridColumn="span 3"
                gridRow="span 2"
                backgroundColor={colors.black[700]}
            >
                <Box
                    mt="25px"
                    p="0 30px"
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Box>
                        <Typography variant="h5" fontWeight="600" color={colors.indigo[300]}>Other</Typography>
                    </Box>
                </Box>
                <Box height="240px" mt="20px">
                    <BarChart />
                </Box>
            </Box>
            <Box
                gridColumn="span 3"
                gridRow="span 2"
                backgroundColor={colors.black[700]}
            >
                <Box
                    mt="25px"
                    p="0 30px"
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Box>
                        <Typography variant="h5" fontWeight="600" color={colors.indigo[300]}>Other</Typography>
                    </Box>
                </Box>
                <Box height="290px" mt="5px">
                    <PieChart />
                </Box>
            </Box>
            <Box
                gridColumn="span 3"
                gridRow="span 2"
                backgroundColor={colors.black[700]}
            >
                <Box
                    mt="25px"
                    p="0 30px"
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Box>
                        <Typography variant="h5" fontWeight="600" color={colors.indigo[300]}>Other</Typography>
                    </Box>
                </Box>
                <Box height="240px" mt="20px">

                </Box>
            </Box>
        </Box>
    </Box>
    )
};

export default Student;