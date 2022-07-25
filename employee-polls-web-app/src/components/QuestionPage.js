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
    const [flagSecondOption, setFlagSecondOption] = React.useState(true);
    const [flagFirstOption, setFlagFirstOption] = React.useState(true);
    const [voted, setVoted] = React.useState(false);
    const [totalVotes, setTotalVotes] = React.useState(0);
    const [optionOneVotesCount, setOptionOneVotesCount] = React.useState(0);



    const autherId = props.questions[props.id].author;
    const avatarURL = props.users[autherId].avatarURL;
    const optionOne = props.questions[props.id].optionOne.text;
    const optionTwo = props.questions[props.id].optionTwo.text;
    React.useEffect(() => {
      const optionOneVotes = props.questions[props.id].optionOne.votes;
      const optionTwoVotes = props.questions[props.id].optionTwo.votes;
      setTotalVotes(optionOneVotes.length+optionTwoVotes.length);
      setOptionOneVotesCount(optionOneVotes.length);
      if(optionOneVotes.includes(props.authedUser)){
        setFlagFirstOption(!flagFirstOption);
        setVoted(true);
      } 

      if(optionTwoVotes.includes(props.authedUser)){
        setFlagSecondOption(!flagSecondOption);
        setVoted(true);
      }

    }, []);

    const handleClick = (event) => {
        event.preventDefault();
        console.log('Question Page clicked ', event.currentTarget.id);
        if(voted === false){
          setVoted(!voted);
          setTotalVotes(totalVotes + 1);
          if(event.currentTarget.id === 'optionOne'){
            setFlagFirstOption(!flagFirstOption);
            setOptionOneVotesCount(optionOneVotesCount+1);
          } else{
            setFlagSecondOption(!flagSecondOption)
          }
          console.log({authedUser: props.authedUser, qid: props.id, option: event.currentTarget.id} );
          props.dispatch(handleSaveQuestionAnswer(props.authedUser, props.id, event.currentTarget.id));
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
            Poll By {autherId}:
          </Typography>
          <Avatar variant='circular' sx={{ width: 140, height: 140 }} src={avatarURL}/>
          <Typography variant="h4">
            Would you rather...
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
            >{optionOne}</Typography>
            <Button
              style={{marginTop: 'auto', position: 'relative'}}
              type="button"
              fullWidth
              variant={flagFirstOption ? "outlined" : "contained"}
              onClick={handleClick} 
              id="optionOne"
              color={flagFirstOption ? "primary" : "success"}
            >
              {voted?<span>- {Math.round((optionOneVotesCount / totalVotes)*100).toFixed(2)}% Votes -</span>:<span>- Click Option One -</span>}
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
            >{optionTwo}</Typography>
            <Button
              style={{marginTop: 'auto', position: 'relative'}}
              type="button"
              fullWidth
              variant={flagSecondOption ? "outlined" : "contained"}
              onClick={handleClick} 
              id="optionTwo"
              color={flagSecondOption ? "primary" : "success"}
            >
              {voted?<span>- {Math.round(((totalVotes - optionOneVotesCount)/ totalVotes)*100).toFixed(2)}% Votes -</span>:<span>- Click Option Two -</span>}
              
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
  console.log('QuestionPage component id : ', id);
  
  return {
    id,
    questions,
    users,
    authedUser,
  };
};

export default withRouter(connect(mapStateToProps)(QuestionPage));