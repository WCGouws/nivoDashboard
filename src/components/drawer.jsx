import { useState } from "react";
import { Drawer, List, ListItem, IconButton, Box } from "@mui/material";
import { Link } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import PeopleoutlinedIcon from "@mui/icons-material/PeopleOutlined";
import PersonoutlinedIcon from "@mui/icons-material/PersonOutlined";
import HomeoutlinedIcon from "@mui/icons-material/HomeOutlined";

function DrawerComponent() {
    const [openDrawer, setOpenDrawer] = useState(false);
    return (
        <>
            <Drawer open={openDrawer}
                onClose={() => setOpenDrawer(false)}
            >
                <List>
                    <ListItem onClick={() => setOpenDrawer(false)}>
                        <Box mb="25px">
                            <Box display="flex">
                                <img
                                    alt="profile-user"
                                    width="100px"
                                    height="50px"
                                    src="./MIT_logo.svg"
                                    style={{ cursor: "pointer", borderRadius: "50%" }}
                                />
                            </Box>
                        </Box>
                    </ListItem>
                    <ListItem onClick={() => setOpenDrawer(false)}>
                        <IconButton component={Link} to="/all">
                            <HomeoutlinedIcon />Home</IconButton>
                    </ListItem>
                    <ListItem onClick={() => setOpenDrawer(false)}>
                        <IconButton component={Link} to="/students">
                            <PeopleoutlinedIcon />Students</IconButton>
                    </ListItem>
                    <ListItem onClick={() => setOpenDrawer(false)}>
                        <IconButton component={Link} to="/employees">
                            <PersonoutlinedIcon />Employees</IconButton>
                    </ListItem>
                    <ListItem onClick={() => setOpenDrawer(false)}>
                        <IconButton component={Link} to="/affiliates">
                            <PersonoutlinedIcon />Affiliates</IconButton>
                    </ListItem>
                </List>
            </Drawer>
            <IconButton onClick={() => setOpenDrawer(!openDrawer)}>
                <MenuIcon />
            </IconButton>
        </>
    )
}

export default DrawerComponent;