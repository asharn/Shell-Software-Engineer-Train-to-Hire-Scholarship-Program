import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import Divider from '@mui/material/Divider';
import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';
import PollRounded from '@mui/icons-material/PollRounded';
import createTheme from "@mui/material/styles/createTheme";

const theme = createTheme({
  typography: {
    button: {
      textTransform: "none"
    }
  }
});

const NavButton = (props) => {
    return(
        <Button color='inherit' href={props.href} theme={theme}>{props.text}</Button>
    )
}

const NavBar = () => {
    return(
        <div>
        <AppBar position="static">
            <Toolbar>
                <Stack direction='row' justifyContent="center" alignItems="center">
                    <IconButton href="/" size='large' edge='start' color='inherit' aria-label='logo'>
                        <PollRounded/>
                    </IconButton>
                    <Typography variant="h6"
                                noWrap
                                component="a"
                                href="/"
                                sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none'
                                }}>
                    Employee Polls
                    </Typography>
                </Stack>
                <Stack direction='row' spacing={10} divider={<Divider orientation="vertical" flexItem sx={{marginLeft: 10}}/>}>
                    <Stack direction='row' spacing={2}>
                        <NavButton text={'Home'} href={'/'}/>
                        <NavButton text={'Leaderboard'} href={'/leaderboard'}/>
                        <NavButton text={'New'} href={'/add'}/>
                    </Stack>
                    <Stack direction='row' spacing={2}>
                        <NavButton text={'SignIn'} href={'/sign-in'}/>
                        <NavButton text={'SignUp'} href={'/sign-up'}/>
                    </Stack>
                </Stack>
                
            </Toolbar>
        </AppBar>
        </div>
    )
}
export default NavBar;