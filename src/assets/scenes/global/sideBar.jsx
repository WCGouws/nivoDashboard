import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
// import 'react-pro-sidebar/dist/css/styles.css';
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { colorTokens } from "../../../theme";
import HomeoutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleoutlinedIcon from "@mui/icons-material/PeopleOutlined";
import PersonoutlinedIcon from "@mui/icons-material/PersonOutlined";
import { MenuOutlinedIcon } from "@mui/icons-material/MenuOutlined";

const Item = ({ title, to, icon, selected, setSelected }) => {
    const theme = useTheme();
    const colors = colorTokens(theme.palette.mode);
    return (
        <MenuItem active={selected === title} style={{ color: colors.gray[100] }} onClick={() => setSelected(title)} icon={icon}>
            <Typography>
                {title}
            </Typography>
            <link to={to} />
        </MenuItem>
    )
}

const SideBar = () => {
    const theme = useTheme();
    const colors = colorTokens(theme.palette.mode);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState("dashBoard");

    return (
        <Box
            sx={{
                "& .pro-sidebar-inner": {
                    background: `${colors.black[400]} !important`
                },
                "& .pro-sidebar-wrapper": {
                    backgroundColor: "transparent !important"
                },
                "& .pro-inner-item": {
                    padding: "5px 35px 5px 20px !important"
                },
                "& .pro-inner-item:hover": {
                    color: "#769996 !important"
                },
                "& .pro-menu-item.active": {
                    color: "#adc2c0 !important"
                },
            }}
        >
            {/* <ProSidebar collapsed={isCollapsed}>
                <Menu iconShape="square">
                    <MenuItem
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
                        style={{
                            margin: "10px 0 20px 0",
                            color: colors.indigo[100],
                        }}
                    >
                        {!isCollapsed && (
                            <Box display="flex" justifyContent="space-between" alignItems="center" ml="15px">
                                <Typography variant="h3" color={colors.gray[100]}>
                                    Admin
                                </Typography>
                                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                                    <MenuOutlinedIcon />
                                </IconButton>
                            </Box>
                        )}
                    </MenuItem>
                </Menu>
            </ProSidebar> */}
            {/* {!isCollapsed && (
                    <Box mb="25px">
                        <Box display="flex" justifyContent="center" alignItems="center">
                            <img
                                alt="profile-user"
                                width="100px"
                                height="100px"
                                src={`https://www.logo.wine/a/logo/Massachusetts_Institute_of_Technology/Massachusetts_Institute_of_Technology-Logo.wine.svg`}
                                style={{ cursor: "pointer", borderRadius: "50%" }}
                            />
                        </Box>

                        <Box textAlign="center">
                            <Typography variant="h2" color={colors.gray[500]} fontWeight="bold" sx={{ m: "10px 0 0 0" }}>M.I.T</Typography>
                            <Typography variant="h5" color={colors.lightGray[500]}>Dashboard</Typography>
                        </Box>
                    </Box>
                )}
                <Box paddingLeft={isCollapsed ? undefined : "10%"}>
                    <Item
                        title="Dashboard"
                        to="/"
                        icon={<HomeoutlinedIcon />}
                        selected={selected}
                        setSelected={setSelected}
                    />
                    <Item
                        title="Students"
                        to="/students"
                        icon={<PeopleoutlinedIcon />}
                        selected={selected}
                        setSelected={setSelected}
                    />
                    <Item
                        title="Staff"
                        to="/staff"
                        icon={<PersonoutlinedIcon />}
                        selected={selected}
                        setSelected={setSelected}
                    />
                    <Item
                        title="Affiliates"
                        to="/affiliates"
                        icon={<PersonoutlinedIcon />}
                        selected={selected}
                        setSelected={setSelected}
                    />*
                </Box> */}
        </Box>
    )
};

export default SideBar;