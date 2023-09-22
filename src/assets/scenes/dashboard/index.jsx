import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { colorTokens } from "../../../theme";
import Header from "../../../components/headers";
import BarChart from "../../../components/barChart";
import PieChart from "../../../components/pieChart";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import StatBox from "../../../components/statBox";
import { useEffect, useState } from 'react';
import { Grid } from "@mui/material";
import { usePDF } from 'react-to-pdf';
import LineChart from "../../../components/lineChart";

const DashBoard = (props) => {
  const theme = useTheme();
  const colors = colorTokens(theme.palette.mode);
  const { toPDF, targetRef } = usePDF({ filename: `MIT Dashboard - ${props.endPoint}` });
  const [responseData, setResponseData] = useState('');

  // CM Server integration
  useEffect(() => {

    async function callAPI() {
      const baseURL = "http://localhost:3000/api/v1"
      const [allDevices, studentDevices, employeeDevices, affiliateDevices, allDevicesOT, devicesOTYear, devicesOTMonth, expiringDevices] = await Promise.all([
        JSON.parse(await (await fetch(`${baseURL}/devices/all`)).text()),
        JSON.parse(await (await fetch(`${baseURL}/student`)).text()),
        JSON.parse(await (await fetch(`${baseURL}/employee`)).text()),
        JSON.parse(await (await fetch(`${baseURL}/affiliate`)).text()),
        JSON.parse(await (await fetch(`${baseURL}/devices/mob_cred_ot`)).text()),
        JSON.parse(await (await fetch(`${baseURL}/devices/mob_cred_ot/year`)).text()),
        JSON.parse(await (await fetch(`${baseURL}/devices/mob_cred_ot/month`)).text()),
        JSON.parse(await (await fetch(`${baseURL}/devices/expiring_cards`)).text()),
      ])

      setResponseData({
        "all": allDevices,
        "student": studentDevices,
        "employee": employeeDevices,
        "affiliate": affiliateDevices,
        "devicesOverDay": allDevicesOT,
        "devicesOverYear": devicesOTYear,
        "devicesOverMonth": devicesOTMonth,
        "expiringDevices": expiringDevices
      })
      
    }

    callAPI()

  }, [props.endPoint])


  return (
    <Box p="80px" pt="0px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Grid container spacing={{ xs: 2, sm: 2, md: 2 }} columns={{ md: 12 }}>
          <Grid item xs={12} sm={6} md={6}>
            <Header title="DASHBOARD" subtitle={`MIT Dashboard ${props.endPoint.charAt(0).toUpperCase() + props.endPoint.slice(1)}`} />
          </Grid>
          <Grid item xs={12} sm={6} md={6} textAlign="right">
            <Box >
              <Button
                sx={{ backgroundColor: colors.gray[700], color: colors.gray[100], fontSize: "14px", fontWeight: "bold", padding: "10px 20px" }}
                onClick={() => toPDF()}>
                <DownloadOutlinedIcon sx={{ mr: "10px" }} />
                Download
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box gap="20px" ref={targetRef}>
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
                amount={responseData && responseData[props.endPoint]["physical_card"] + responseData[props.endPoint]["android"] + responseData[props.endPoint]["iwatch"] + responseData[props.endPoint]["iphone"]}
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
                amount={responseData && responseData[props.endPoint]["android"] + responseData[props.endPoint]["iwatch"] + responseData[props.endPoint]["iphone"]}
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
                amount={responseData && responseData[props.endPoint]["physical_card"]}
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
                amount={responseData && responseData[props.endPoint]["android"] + responseData[props.endPoint]["iphone"]}
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
                <PieChart data={responseData} displayAll={true} watchPhone={false} mobileCard={false} makePie={false} arcLabel={true} endPoint={props.endPoint} />
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
                  <Typography variant="h5" fontWeight="600" color={colors.indigo[300]}>All Devices</Typography>
                </Box>
              </Box>
              <Box height="250px" mt="20px">
                {props.endPoint === "all" ?
                  <BarChart data={responseData} displayAll={true} makeHorizontal={false} endPoint={props.endPoint} />
                  :
                  <BarChart data={responseData} displayAll={false} makeHorizontal={false} endPoint={props.endPoint} />
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
                amount={responseData && responseData[props.endPoint]["iwatch"] + responseData[props.endPoint]["iphone"]}
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
                amount={responseData && responseData[props.endPoint]["android"] + responseData[props.endPoint]["iphone"] + responseData[props.endPoint]["physical_card"]}
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
                <BarChart data={responseData} displayAll={false} watchPhone={true} mobileCard={false} makeHorizontal={true} endPoint={props.endPoint} />
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
                <PieChart data={responseData} displayAll={false} watchPhone={false} mobileCard={true} makePie={true} arcLabel={true} endPoint={props.endPoint} />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <Box backgroundColor={colors.black[700]}
              alignItems="center"
              justifyContent="center"
              gridColumn="span 3"
              padding={2}
              pb={10}>
              <Box
                mt="25px"
                p="0 30px"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  <Typography variant="h5" fontWeight="600" color={colors.indigo[300]}>Credentials created over time</Typography>
                </Box>
              </Box>
              <Box height="250px" mt="20px">
                <LineChart data={responseData} arcLabel={true} endPoint={props.endPoint} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box >
  )
};

export default DashBoard;