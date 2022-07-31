import React from 'react';
import { connect } from "react-redux";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import PollRounded from '@mui/icons-material/PollRounded';
import {createTheme} from "@mui/material/styles";
import { Link, useLocation} from "react-router-dom";
import { Avatar } from '@mui/material';
import * as PathUrlConstants from '../utils/PathUrlConstants';
import {COMPANY_NAME, SIGN_IN, SIGN_UP, SIGN_OUT, HOME, DASHBOARD, LEADERBOARD, NEW} from '../utils/GenericConstants';

const theme = createTheme({
  typography: {
    button: {
      textTransform: "none"
    }
  }
});

const NavButton = (props) => {
    return(
        <Link to={props.href} >
            <Button color='inherit' theme={theme} sx={{
                ':hover': {
                bgcolor: 'white', 
                color: 'black',
                },           
                width: '90px',
            }}>
                {props.text}
            </Button>
        </Link>
    )
}

const NavBar = (props) => {
    const location = useLocation();
    return(
        <div>
        <AppBar position="static">
            <Toolbar>
                <Stack direction='row' spacing={{ xs: 3, sm: 6, md: 9 }} justifyContent="center" alignItems="center" divider={<Divider orientation="vertical" flexItem />}>
                <Stack direction='row' justifyContent="center" alignItems="center">
                    <IconButton href={PathUrlConstants.RootPathUrl} size='large' edge='start' color='inherit' aria-label='logo'>
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
                    {COMPANY_NAME}
                    </Typography>
                </Stack>
                    <Stack direction='row' spacing={1}>
                        {props.userLoggedIn===true ? 
                        <Stack direction='row' spacing={2}>
                            <NavButton text={HOME} href={PathUrlConstants.RootPathUrl}/>
                            <NavButton text={DASHBOARD} href={PathUrlConstants.DashBoardUrl}/>
                            <NavButton text={LEADERBOARD} href={PathUrlConstants.LeaderBoardUrl}/>
                            <NavButton text={NEW} href={PathUrlConstants.NewPollUrl}/>
                        </Stack>
                        : 
                            <NavButton text={HOME} href={PathUrlConstants.RootPathUrl}/>
                        }
                    </Stack>
                    {props.userLoggedIn===true? 
                        <Stack direction='row' spacing={2}>
                            <Stack direction='row' spacing={1} justifyContent="center" alignItems="center">
                                <Avatar variant='circular' sx={{ width: 24, height: 24 }} src={props.users[props.authedUser].avatarURL}/>
                                <Typography fontSize='14px'>{props.users[props.authedUser].name}</Typography>
                            </Stack>
                            <NavButton text={SIGN_OUT} href={PathUrlConstants.SignOutUrl}/>
                        </Stack>
                    :
                        <Stack direction='row' spacing={2}>
                            <NavButton text={SIGN_IN} href={PathUrlConstants.SignInUrl+'?redirectTo='+location.pathname}/>
                            <NavButton text={SIGN_UP} href={PathUrlConstants.SignUpUrl+'?redirectTo='+location.pathname}/>
                        </Stack>
                    }
                </Stack>
            </Toolbar>
        </AppBar>
        </div>
    )
}

const mapStateToProps = ({ authedUser, users }) => ({
    authedUser,
    userLoggedIn: authedUser !== null,
    users
  });

export default connect(mapStateToProps)(NavBar);