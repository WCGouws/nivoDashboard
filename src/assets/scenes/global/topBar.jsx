import { Box, IconButton, useTheme, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { ColorModeContext, colorTokens } from "../../../theme";
import { MenuItem } from "react-pro-sidebar";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import SearchIcon from "@mui/icons-material/Search";
import HomeoutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleoutlinedIcon from "@mui/icons-material/PeopleOutlined";
import PersonoutlinedIcon from "@mui/icons-material/PersonOutlined";
import { Link } from "react-router-dom";

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

const TopBar = () => {
    const theme = useTheme();
    const colors = colorTokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState("dashBoard");

    return (
        <Box
            display="flex"
            justifyContent="space-between"
            p={2}
            height="10%"
        >
            <Box mb="25px">
                <Box display="flex" justifyContent="center" alignItems="center">
                    <img
                        alt="profile-user"
                        width="100px"
                        height="50px"
                        src={`https://www.logo.wine/a/logo/Massachusetts_Institute_of_Technology/Massachusetts_Institute_of_Technology-Logo.wine.svg`}
                        style={{ cursor: "pointer", borderRadius: "50%" }}
                    />
                </Box>
            </Box>
            <Box display="flex" justifyContent="space-between" p={2}>
                <IconButton component={Link} to="/">
                    <HomeoutlinedIcon />
                    Home
                </IconButton>
                <IconButton component={Link} to="/students">
                    <PeopleoutlinedIcon />
                    Students
                </IconButton>
                <IconButton component={Link} to="/Staff">
                    <PersonoutlinedIcon />
                    Staff
                </IconButton>
                <IconButton component={Link} to="/affiliates">
                    <PersonoutlinedIcon />
                    Affiliates
                </IconButton>
            </Box>

            <Box display="flex">
                <IconButton onClick={colorMode.toggleColorMode}>
                    {theme.palette.mode === 'dark' ? (
                        <DarkModeOutlinedIcon />
                    ) : (
                        <LightModeOutlinedIcon />
                    )}
                </IconButton>
            </Box>

        </Box>
    )
};

export default TopBar;