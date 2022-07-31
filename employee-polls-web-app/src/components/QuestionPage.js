import { connect } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Avatar } from '@mui/material';
import { handleSaveQuestionAnswer } from '../actions/users';
import { 
        WOULD_YOU_RATHER, 
        POLL_BY, 
        BUTTON_TEXT_CLICK_OPTION_ONE, 
        BUTTON_TEXT_CLICK_OPTION_TWO, 
        BUTTON_TEXT_VOTES } from "../utils/GenericConstants";
import PageNotFound from "./PageNotFound";


  
const theme = createTheme({
  typography: {
    button: {
      textTransform: "none"
    }
  }
});

const withRouter = (Component) => {
  const ComponentWithRouterProp = (props) => {
    let params = useParams();
    let location = useLocation();
    let navigate = useNavigate();
    return <Component {...props} router={{ location, navigate, params }} />;
  };

  return ComponentWithRouterProp;
};

const QuestionPage = (props) => {
  const { questions, id, users, authedUser, votedFirstOption, voted } = props;

    if(!questions[id]){
      return (
        <PageNotFound></PageNotFound>
      );
    }

    const autherId = questions[id].author;
    const avatarURL = users[autherId].avatarURL;
    const name = users[autherId].name;
    const optionFirstCount = questions[id].optionOne.votes.length;
    const optionSecondCount = questions[id].optionTwo.votes.length;
 
    const handleClick = (event) => {
        event.preventDefault();
        if(!voted){
          new Promise((res, rej) => {
            props.dispatch(handleSaveQuestionAnswer(authedUser, id, event.currentTarget.id));
            setTimeout(() => res('success'), 1000);
          }).then(() => {
            console.log("Answer saved successfully.");
          });
        }
      };


  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xl">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
            <Typography variant="h3">
            {POLL_BY} {name}:
          </Typography>
          <Avatar variant='circular' sx={{ width: 140, height: 140 }} src={avatarURL}/>
          <Typography variant="h4">
            {WOULD_YOU_RATHER}
          </Typography>
          <Box component="form"  sx={{marginTop: 2, display: 'flex', flexDirection: 'row',}}>
            <Box border={1} sx={{ m: 0.5, verticalAlign: 'bottom', display: 'flex', flexDirection: 'column',}}>
            <Typography
                gutterBottom
                component="h2"
                id="firstOptionText"
                minWidth='420px'
                maxWidth='420px'
                align='center'
                style={{ wordWrap: "break-word" }}
            >{questions[id].optionOne.text}</Typography>
            <Button
              style={{marginTop: 'auto', position: 'relative'}}
              type="button"
              fullWidth
              variant={votedFirstOption ? "contained" : "outlined"}
              onClick={handleClick} 
              id="optionOne"
              color={votedFirstOption ?  "success" : "primary"}
            >
              {voted?<span>- {Math.round((optionFirstCount / (optionFirstCount+optionSecondCount))*100)}% {BUTTON_TEXT_VOTES} -</span>:<span>{BUTTON_TEXT_CLICK_OPTION_ONE}</span>}
            </Button>
            </Box>

            <Box border={1} sx={{ m: 0.5, verticalAlign: 'bottom', display: 'flex', flexDirection: 'column',}}>

            <Typography
              gutterBottom
              component="h2"
              minWidth='420px'
              maxWidth='420px'
              id="secondOptionText"
              align='center'
              style={{ wordWrap: "break-word" }}
            >{questions[id].optionTwo.text}</Typography>
            <Button
              style={{marginTop: 'auto', position: 'relative'}}
              type="button"
              fullWidth
              variant={(voted && !votedFirstOption) ? "contained" : "outlined"}
              onClick={handleClick} 
              id="optionTwo"
              color={(voted && !votedFirstOption) ? "success" : "primary"}
            >
              {voted?<span>- {Math.round((optionSecondCount/ (optionFirstCount+optionSecondCount))*100)}% {BUTTON_TEXT_VOTES} -</span>:<span>{BUTTON_TEXT_CLICK_OPTION_TWO}</span>}
              
            </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

const mapStateToProps = ({ authedUser, questions, users }, props) => {
  const { id } = props.router.params;
  
  const voted =  !!users[authedUser].answers[id];
  return {
    id,
    questions,
    users,
    authedUser,
    voted,
    votedFirstOption: voted && users[authedUser].answers[id]==='optionOne'
  };
};

export default withRouter(connect(mapStateToProps)(QuestionPage));