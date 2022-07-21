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
        <Button color='inherit' href={props.text.toLowerCase()} theme={theme}>{props.text}</Button>
    )
}

const NavBar = () => {
    return(
        <div>
        <AppBar position="static">
            <Toolbar>
                <IconButton href="/" size='large' edge='start' color='inherit' aria-label='logo' sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}>
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
                            textDecoration: 'none',
                            }}>
                Employee Polls
                </Typography>
                <Stack direction='row' justifyContent="center" alignItems="center" spacing={5} divider={<Divider orientation="vertical" flexItem/>}>
                    <Stack direction='row' justifyContent="center" alignItems="center" spacing={2}>
                        <NavButton text={'Home'} to='/'/>
                        <NavButton text={'Leaderboard'}/>
                        <NavButton text={'New'}/>
                    </Stack>
                    <ButtonGroup>
                        <NavButton text={'SignIn'}/>
                        <NavButton text={'SignUp'}/>
                    </ButtonGroup>
                </Stack>
            </Toolbar>
        </AppBar>
        </div>
    )
}
export default NavBar;