import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';

import {
    Link
} from "react-router-dom";


const Header = props => {
    const [drawerOpen, setDrawerOpen] = React.useState(false);

    const toggleDrawer = () => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setDrawerOpen(!drawerOpen);
    };
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <div onClick={toggleDrawer()}> <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}

                    >
                        <MenuIcon />
                    </IconButton> </div>

                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Assignment 
                    </Typography>

                </Toolbar>
            </AppBar>

            <div>
                <Drawer
                    anchor={'left'}
                    open={drawerOpen}
                    onClose={toggleDrawer()}
                >
                    <div style={{ width: '10rem' }}>

                        <Link onClick={toggleDrawer()} to="/toDoList"><h3 >TO DO LIST</h3></Link>
                        <Link onClick={toggleDrawer()} to="/users"><h3 >USERS</h3></Link>

                    </div>
                </Drawer>
            </div>
        </Box>
    )
}


export default Header

