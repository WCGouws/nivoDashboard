import { Box, IconButton, useTheme, Typography, useMediaQuery, styled, Button } from "@mui/material";
import { useContext, useState, useEffect } from "react";
import { ColorModeContext, colorTokens } from "../../../theme";
//import { MenuItem } from "react-pro-sidebar";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import HomeoutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleoutlinedIcon from "@mui/icons-material/PeopleOutlined";
import PersonoutlinedIcon from "@mui/icons-material/PersonOutlined";
import { Link } from "react-router-dom";
import DrawerComponent from "../../../components/drawer";


const TopBar = (props) => {
    const theme = useTheme();
    const colors = colorTokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    const currentPage = location.pathname.split('/').pop();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const [selectedPage, setSelectedPage] = useState("all");
    const [underlinedPage, setUnderlinedPage] = useState({
        all: true,
        students: false,
        employees: false,
        affiliates: false
    })

    function handlePageChange(newPage) {
        let newPageSelection = underlinedPage;
        for (let page in newPageSelection) {
            if (page === newPage) {
                newPageSelection[page] = true
            } else {
                newPageSelection[page] = false
            }
        }
        setSelectedPage(newPage)
        setUnderlinedPage(newPageSelection)
    }

    useEffect(() => {
        handlePageChange(currentPage)
    }, [currentPage])



    return (
        <Box
            display="flex"
            justifyContent="space-between"
            p={8}
            pl={6}
            pr={4}
            height="10%"
        >
            {isMobile ? (<DrawerComponent />)
                : (<Box display="flex" justifyContent="space-between" p={2} >
                    <Box mb="25px">
                        <Box display="flex" justifyContent="center" alignItems="center">
                            <img
                                alt="profile-user"
                                width="100px"
                                height="50px"
                                src="./MIT_logo.svg"
                                style={{ cursor: "pointer", borderRadius: "50%" }}
                            />
                        </Box>
                    </Box>
                    <Button sx={underlinedPage["all"] ? { borderBottom: "2px solid #A31F34", m: "0 2px 0 2px", color: colors.black[100], fontSize: "15px", height: "60%" } : { m: "0 5px 0 5px", color: colors.black[100], fontSize: "15px", height: "70%" }} size="large" component={Link} to="/all" onClick={() => handlePageChange("all")}>
                        <HomeoutlinedIcon />
                        Home
                    </Button>
                    <Button sx={underlinedPage["students"] ? { borderBottom: "2px solid #A31F34", m: "0 2px 0 2px", color: colors.black[100], fontSize: "15px", height: "60%" } : { m: "0 5px 0 5px", color: colors.black[100], fontSize: "15px", height: "70%" }} size="large" component={Link} to="/students" onClick={() => handlePageChange("students")}>
                        <PeopleoutlinedIcon />
                        Students
                    </Button>
                    <Button sx={underlinedPage["employees"] ? { borderBottom: "2px solid #A31F34", m: "0 2px 0 2px", color: colors.black[100], fontSize: "15px", height: "60%" } : { m: "0 5px 0 5px", color: colors.black[100], fontSize: "15px", height: "70%" }} size="large" component={Link} to="/employees" onClick={() => handlePageChange("employees")}>
                        <PersonoutlinedIcon />
                        Employees
                    </Button>
                    <Button sx={underlinedPage["affiliates"] ? { borderBottom: "2px solid #A31F34", m: "0 2px 0 2px", color: colors.black[100], fontSize: "15px", height: "60%" } : { m: "0 5px 0 5px", color: colors.black[100], fontSize: "15px", height: "70%" }} size="large" component={Link} to="/affiliates" onClick={() => handlePageChange("affiliates")}>
                        <PersonoutlinedIcon />
                        Affiliates
                    </Button>
                </Box>
                )
            }


            <Box display="flex" >
                <Button sx={{ color: colors.black[100], height: "70%" }} onClick={colorMode.toggleColorMode}>
                    {theme.palette.mode === 'dark' ? (
                        <DarkModeOutlinedIcon />
                    ) : (
                        <LightModeOutlinedIcon />
                    )}
                </Button>
            </Box>

        </Box>
    )
};

export default TopBar;