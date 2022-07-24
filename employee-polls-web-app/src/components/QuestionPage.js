import { connect } from "react-redux";
//import Question from "./Question";
//import NewQuestion from "./NewQuestion";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Avatar } from '@mui/material';
import QuestionAnswerRounded from '@mui/icons-material/QuestionAnswerRounded';

  
const theme = createTheme();

const withRouter = (Component) => {
  const ComponentWithRouterProp = (props) => {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  };

  return ComponentWithRouterProp;
};

const QuestionPage = (props) => {
    const name = props.questions[props.id].author;
    const avatarURL = props.users[name].avatarURL;
    let [flagFirstOption, flagSecondOption] = React.useState(true);
    const handleClick = (event) => {
        event.preventDefault();
        event.currentTarget.id === 'firstOption' ? flagFirstOption = !flagFirstOption:flagSecondOption = !flagSecondOption;
        console.log('Question Page clicked ', event.currentTarget.id);
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
            Poll By {name}:
          </Typography>
          <Avatar variant='circular' sx={{ width: 140, height: 140 }} src={avatarURL}/>
          <Typography variant="h4">
            Would you rather...
          </Typography>
          <Box component="form"  sx={{marginTop: 2, display: 'flex', flexDirection: 'row',}}>
            <Box border={1} sx={{ m: 0.5, display: 'flex', flexDirection: 'column',}}>
            <Typography
                gutterBottom
                component="h2"
                id="firstOptionText"
                minWidth='420px'
                maxWidth='420px'
                align='center'
                style={{ wordWrap: "break-word" }}
            >Read and learn Pyhton</Typography>
            <Button
              style={{marginTop: 'auto', position: 'relative'}}
              type="submit"
              fullWidth
              variant="contained"
              onClick={handleClick} 
              id="firstOption"
              color={flagFirstOption ? "primary" : "secondary"}
            >
              Click
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
            >Read and learn Java</Typography>
            <Button
              style={{marginTop: 'auto', position: 'relative'}}
              type="submit"
              fullWidth
              variant="contained"
              onClick={handleClick} 
              id="secondOption"
              color={flagSecondOption ? "primary" : "secondary"}
            >
              Click
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

  return {
    id,
    questions,
    users
  };
};

export default withRouter(connect(mapStateToProps)(QuestionPage));