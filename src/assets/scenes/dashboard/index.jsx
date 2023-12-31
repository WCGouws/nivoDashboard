import { Box, Button, IconButton, Tab, Typography, useMediaQuery, useTheme } from "@mui/material";
import { colorTokens } from "../../../theme";
import Header from "../../../components/headers";
import BarChart from "../../../components/barChart";
import RadialBarChart from "../../../components/radialBarChart";
import PieChart from "../../../components/pieChart";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import StatBox from "../../../components/statBox";
import { useEffect, useState } from 'react';
import { Grid } from "@mui/material";
import { usePDF } from 'react-to-pdf';
import LineChart from "../../../components/lineChart";
import ScatterPlotChart from "../../../components/scatterPlot";
import TableNonPopup from "../../../components/TableNonPopup";
import { TabContext, TabList, TabPanel } from "@mui/lab";


const DashBoard = (props) => {
  const theme = useTheme();
  const colors = colorTokens(theme.palette.mode);
  const { toPDF, targetRef } = usePDF({ filename: `MIT Dashboard - ${props.endPoint}` });
  const [responseData, setResponseData] = useState('');
  const isMobileSmall = useMediaQuery(theme.breakpoints.down("xs"))
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const isTablet = useMediaQuery(theme.breakpoints.down('md'))
  const isDesktopSmall = useMediaQuery('(max-width: 1100px)')
  const isDesktopLarge = useMediaQuery(theme.breakpoints.up('lg'))
  const [tableData, setTableData] = useState(null)
  const [tabValue, setTabValue] = useState('expiring');

  function updateTableData(newData) {
    setTableData(newData)
  }

  function handleTabChange(event, newVal) {
    // console.log(event, newVal)
    setTabValue(newVal)
  }
  // CM Server integration
  useEffect(() => {

    async function callAPI() {
      const baseURL = "http://localhost:3000/api/v1"
      const [allDevices, studentDevices, studentDeviceOT, employeeDevices, employeeDeviceOT, affiliateDevices, affiliateDevicesOT, allDevicesOT, devicesOTYear, devicesOTMonth, expiringDevices, lostCards, printedCards] = await Promise.all([
        JSON.parse(await (await fetch(`${baseURL}/devices/all`)).text()),
        JSON.parse(await (await fetch(`${baseURL}/student`)).text()),
        JSON.parse(await (await fetch(`${baseURL}/student/mob_cred_ot`)).text()),
        JSON.parse(await (await fetch(`${baseURL}/employee`)).text()),
        JSON.parse(await (await fetch(`${baseURL}/employee/mob_cred_ot`)).text()),
        JSON.parse(await (await fetch(`${baseURL}/affiliate`)).text()),
        JSON.parse(await (await fetch(`${baseURL}/affiliate/mob_cred_ot`)).text()),
        JSON.parse(await (await fetch(`${baseURL}/devices/mob_cred_ot`)).text()),
        JSON.parse(await (await fetch(`${baseURL}/devices/mob_cred_ot/year`)).text()),
        JSON.parse(await (await fetch(`${baseURL}/devices/mob_cred_ot/month`)).text()),
        JSON.parse(await (await fetch(`${baseURL}/devices/expiring_cards`)).text()),
        JSON.parse(await (await fetch(`${baseURL}/devices/lost_cards`)).text()),
        JSON.parse(await (await fetch(`${baseURL}/devices/printed_cards`)).text()),
      ])

      setResponseData({
        "all": allDevices,
        "student": studentDevices,
        "studentOT": studentDeviceOT,
        "employee": employeeDevices,
        "employeeOT": employeeDeviceOT,
        "affiliate": affiliateDevices,
        "affiliateOT": affiliateDevicesOT,
        "devicesOverDay": allDevicesOT,
        "devicesOverYear": devicesOTYear,
        "devicesOverMonth": devicesOTMonth,
        "expiringDevices": expiringDevices,
        "lostCards": lostCards,
        "printedCards": printedCards,
      })
    }

    callAPI()

  }, [props.endPoint])


  return (
    <Box p="35px" pt="0px" pr="12px">
      <Box display="flex" flexDirection="column" alignItems="stretch" justifyContent="space-between">
        <Grid container={isMobile ? false : true} spacing={{ xs: 12, sm: 12, md: 2 }} columns={{ xs: 12, sm: 12, md: 12 }}>
          <Grid item xs={isMobileSmall ? 12 : 6} sm={isMobile ? 12 : 6} md={isTablet ? 12 : 6}>
            <Header title="DASHBOARD" subtitle={`MIT Dashboard ${props.endPoint.charAt(0).toUpperCase() + props.endPoint.slice(1)}`} />
          </Grid>
          <Grid item xs={12} sm={6} md={6} textAlign={isMobile ? "start" : "right"}>
            <Box>
              <Button
                sx={{ backgroundColor: colors.gray[700], border: 1, borderColor: colors.black[800], boxShadow: theme.palette.mode == "dark" ? "5px 5px 5px #12171c" : "5px 5px 5px #d5d7da", color: colors.gray[100], fontSize: "14px", fontWeight: "bold", padding: "10px 20px", mb: "30px" }}
                onClick={() => toPDF()}>
                <DownloadOutlinedIcon sx={{ mr: "0px" }} />
                {!isMobile && "Download"}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box gap="20px" ref={targetRef}>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: isMobileSmall ? 12 : 4, sm: isMobile ? 12 : 8, md: 12 }}>
          <Grid item xs={isMobileSmall ? 12 : 12} sm={isMobile ? 6 : 4} md={isTablet ? 6 : 3}>
            <Box backgroundColor={theme.palette.mode == "dark" ? colors.black[600] : "rgb(247, 247, 247)"}
              border={2}
              borderRadius={3}
              boxShadow={theme.palette.mode == "dark" ? "5px 5px 5px #12171c" : "5px 5px 5px #d5d7da"}
              borderColor={theme.palette.mode == "dark" ? colors.black[800] : colors.black[900]}
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
          <Grid item xs={isMobileSmall ? 12 : 12} sm={isMobile ? 6 : 4} md={isTablet ? 6 : 3}>
            <Box backgroundColor={theme.palette.mode == "dark" ? colors.black[600] : "rgb(247, 247, 247)"}
              border={2}
              borderRadius={3}
              boxShadow={theme.palette.mode == "dark" ? "5px 5px 5px #12171c" : "5px 5px 5px #d5d7da"}
              borderColor={theme.palette.mode == "dark" ? colors.black[800] : colors.black[900]}
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
          <Grid item xs={isMobileSmall ? 12 : 12} sm={isMobile ? 6 : 4} md={isTablet ? 6 : 3}>
            <Box backgroundColor={theme.palette.mode == "dark" ? colors.black[600] : "rgb(247, 247, 247)"}
              border={2}
              borderRadius={3}
              boxShadow={theme.palette.mode == "dark" ? "5px 5px 5px #12171c" : "5px 5px 5px #d5d7da"}
              borderColor={theme.palette.mode == "dark" ? colors.black[800] : colors.black[900]}
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
          <Grid item xs={isMobileSmall ? 12 : 12} sm={isMobile ? 6 : 4} md={isTablet ? 6 : 3}>
            <Box backgroundColor={theme.palette.mode == "dark" ? colors.black[600] : "rgb(247, 247, 247)"}
              border={2}
              borderRadius={3}
              boxShadow={theme.palette.mode == "dark" ? "5px 5px 5px #12171c" : "5px 5px 5px #d5d7da"}
              borderColor={theme.palette.mode == "dark" ? colors.black[800] : colors.black[900]}
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
          <Grid item xs={isMobileSmall ? 12 : 4} sm={isMobile ? 12 : 8} md={isDesktopSmall ? 12 : 6}>
            <Box backgroundColor={theme.palette.mode == "dark" ? colors.black[600] : "rgb(247, 247, 247)"}
              border={2}
              borderRadius={3}
              boxShadow={theme.palette.mode == "dark" ? "5px 5px 5px #12171c" : "5px 5px 5px #d5d7da"}
              borderColor={theme.palette.mode == "dark" ? colors.black[800] : colors.black[900]}
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
                  <Typography variant="h5" fontWeight="600" color={theme.palette.mode == "dark" ? colors.indigo[100] : "#333"}>All Devices</Typography>
                </Box>
              </Box>
              <Box height="250px" mt="20px">
                <PieChart data={responseData} displayAll={true} watchPhone={false} mobileCard={false} makePie={false} arcLabel={true} endPoint={props.endPoint} colorTheme={'dark2'} />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={isMobileSmall ? 12 : 4} sm={isMobile ? 12 : 12} md={isDesktopSmall ? 12 : 6}>
            <Box backgroundColor={theme.palette.mode == "dark" ? colors.black[600] : "rgb(247, 247, 247)"}
              border={2}
              borderRadius={3}
              boxShadow={theme.palette.mode == "dark" ? "5px 5px 5px #12171c" : "5px 5px 5px #d5d7da"}
              borderColor={theme.palette.mode == "dark" ? colors.black[800] : colors.black[900]}
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
                  <Typography variant="h5" fontWeight="600" color={theme.palette.mode == "dark" ? colors.indigo[100] : "#333"}>All Devices per group</Typography>
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
          <Grid item xs={isMobileSmall ? 12 : 4} sm={isMobile ? 12 : 12} md={6}>
            <Box backgroundColor={theme.palette.mode == "dark" ? colors.black[600] : "rgb(247, 247, 247)"}
              border={2}
              borderRadius={3}
              boxShadow={theme.palette.mode == "dark" ? "5px 5px 5px #12171c" : "5px 5px 5px #d5d7da"}
              borderColor={theme.palette.mode == "dark" ? colors.black[800] : colors.black[900]}
              alignItems="center"
              justifyContent="center"
              gridColumn="span 3"
              padding={2}>
              <Box
                mt="5px"
                p="0 30px"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  <Typography variant="h5" fontWeight="600" color={theme.palette.mode == "dark" ? colors.indigo[300] : "#29231d"}></Typography>
                </Box>
              </Box>
              <StatBox
                tilte="Applewatch & Iphone:"
                amount={responseData && responseData[props.endPoint]["iwatch"] + responseData[props.endPoint]["iphone"]}
              />
            </Box>
          </Grid>
          <Grid item xs={isMobileSmall ? 12 : 4} sm={isMobile ? 12 : 12} md={6}>
            <Box backgroundColor={theme.palette.mode == "dark" ? colors.black[600] : "rgb(247, 247, 247)"}
              border={2}
              borderRadius={3}
              boxShadow={theme.palette.mode == "dark" ? "5px 5px 5px #12171c" : "5px 5px 5px #d5d7da"}
              borderColor={theme.palette.mode == "dark" ? colors.black[800] : colors.black[900]}
              alignItems="center"
              justifyContent="center"
              gridColumn="span 3"
              padding={2}>
              <Box
                mt="5px"
                p="0 30px"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  <Typography variant="h5" fontWeight="600" color={theme.palette.mode == "dark" ? colors.indigo[300] : "#29231d"}></Typography>
                </Box>
              </Box>
              <StatBox
                tilte="Mobile & Card:"
                amount={responseData && responseData[props.endPoint]["android"] + responseData[props.endPoint]["iphone"] + responseData[props.endPoint]["physical_card"]}
              />
            </Box>
          </Grid>
          <Grid item xs={isMobileSmall ? 12 : 4} sm={isMobile ? 12 : 12} md={isDesktopSmall ? 12 : 6}>
            <Box backgroundColor={theme.palette.mode == "dark" ? colors.black[600] : "rgb(247, 247, 247)"}
              border={2}
              borderRadius={3}
              boxShadow={theme.palette.mode == "dark" ? "5px 5px 5px #12171c" : "5px 5px 5px #d5d7da"}
              borderColor={theme.palette.mode == "dark" ? colors.black[800] : colors.black[900]}
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
                  <Typography variant="h5" fontWeight="600" color={theme.palette.mode == "dark" ? colors.indigo[100] : "#333"}>AppleWatch & Iphone</Typography>
                </Box>
              </Box>
              <Box height="250px" mt="20px">
                <BarChart data={responseData} displayAll={false} watchPhone={true} mobileCard={false} makeHorizontal={true} endPoint={props.endPoint} />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={isMobileSmall ? 12 : 4} sm={isMobile ? 12 : 12} md={isDesktopSmall ? 12 : 6}>
            <Box backgroundColor={theme.palette.mode == "dark" ? colors.black[600] : "rgb(247, 247, 247)"}
              border={2}
              borderRadius={3}
              boxShadow={theme.palette.mode == "dark" ? "5px 5px 5px #12171c" : "5px 5px 5px #d5d7da"}
              borderColor={theme.palette.mode == "dark" ? colors.black[800] : colors.black[900]}
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
                  <Typography variant="h5" fontWeight="600" color={theme.palette.mode == "dark" ? colors.indigo[100] : "#333"}>Mobile & Cards</Typography>
                </Box>
              </Box>
              <Box height="250px" mt="20px">
                <PieChart data={responseData} displayAll={false} watchPhone={false} mobileCard={true} makePie={true} arcLabel={true} endPoint={props.endPoint} colorTheme={'set2'} />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={isMobileSmall ? 12 : 4} sm={isMobile ? 12 : 12} md={12}>
            <Box backgroundColor={theme.palette.mode == "dark" ? colors.black[600] : "rgb(247, 247, 247)"}
              border={2}
              borderRadius={3}
              boxShadow={theme.palette.mode == "dark" ? "5px 5px 5px #12171c" : "5px 5px 5px #d5d7da"}
              borderColor={theme.palette.mode == "dark" ? colors.black[800] : colors.black[900]}
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
                  <Typography variant="h5" fontWeight="600" color={theme.palette.mode == "dark" ? colors.indigo[100] : "#333"}>Credentials created over time</Typography>
                </Box>
              </Box>
              <Box height="250px" mt="20px">
                <LineChart data={responseData} arcLabel={true} endPoint={props.endPoint} />
              </Box>
            </Box>
          </Grid>

          {props.endPoint === "all" &&
            <>
              <Grid item xs={12} sm={12} md={12}>
                <TabContext value={tabValue}>
                  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleTabChange} aria-label="lab API tabs example">
                      <Tab label="Expiring Cards" value="expiring" />
                      <Tab label="Lost Cards" value="lost" />
                      <Tab label="Printed Cards" value="printed" />
                    </TabList>
                  </Box>
                </TabContext>
              </Grid>

              {tabValue === 'expiring' &&
                <Grid item xs={12} sm={isMobile ? 12 : 12} md={4}>
                  <Box backgroundColor={theme.palette.mode == "dark" ? colors.black[600] : "rgb(247, 247, 247)"}
                    border={2}
                    borderRadius={3}
                    boxShadow={theme.palette.mode == "dark" ? "5px 5px 5px #12171c" : "5px 5px 5px #d5d7da"}
                    borderColor={theme.palette.mode == "dark" ? colors.black[800] : colors.black[900]}
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
                        <Typography variant="h5" fontWeight="600" color={colors.indigo[100]}>Cards that are expiring soon</Typography>
                      </Box>
                    </Box>
                    <Box height="350px" mt="20px">
                      <PieChart
                        data={responseData}
                        displayAll={false}
                        watchPhone={true}
                        mobileCard={false}
                        makePie={true}
                        arcLabel={true}
                        endPoint={props.endPoint}
                        updateTableData={updateTableData}
                        hasOnClick={true}
                        colorTheme={"red_yellow_blue"}
                      />
                    </Box>
                  </Box>
                </Grid>
              }
              <Grid item xs={12} sm={tabValue === "expiring" ? isMobile ? 12 : 8 : 12} md={tabValue === "expiring" ? 8 : 12}>
                <Box backgroundColor={theme.palette.mode == "dark" ? colors.black[600] : "rgb(247, 247, 247)"}
                  border={2}
                  borderRadius={3}
                  boxShadow={theme.palette.mode == "dark" ? "5px 5px 5px #12171c" : "5px 5px 5px #d5d7da"}
                  borderColor={theme.palette.mode == "dark" ? colors.black[800] : colors.black[900]}
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
                      <Typography variant="h5" fontWeight="600" color={colors.indigo[300]}>Graph data</Typography>
                    </Box>
                  </Box>
                  <Box height="350px" mt="20px" className="special-box">
                    <TableNonPopup tableData={tableData} tabValue={tabValue} lostCards={responseData && responseData["lostCards"]["lost_cards"]} printedCards={responseData && responseData["printedCards"]["printed_cards"]} />
                  </Box>
                </Box>
              </Grid>
            </>
          }

          {/* <Grid item xs={12} sm={12} md={6}>
            <Box backgroundColor={colors.black[700]}
              alignItems="center"
              justifyContent="center" borderRadius={3}
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
                  <Typography variant="h5" fontWeight="600" color={colors.indigo[300]}>Amount of people that lost a certain amount of cards</Typography>
                </Box>
              </Box>
              <Box height="250px" mt="20px">
                <ScatterPlotChart data={responseData} displayAll={true} makeHorizontal={false} endPoint={props.endPoint} />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Box
              backgroundColor={colors.black[700]}
              alignItems="center"
              justifyContent="center"
              gridColumn="span 3"
              padding={2}
            >
              <StatBox
                tilte="Number of people who printed a physical card more than once:"
                amount={responseData && responseData["printedCards"]["printed_cards"].length}
              />
            </Box>
          </Grid> */}
        </Grid>
      </Box>
    </Box >
  )
};

export default DashBoard;