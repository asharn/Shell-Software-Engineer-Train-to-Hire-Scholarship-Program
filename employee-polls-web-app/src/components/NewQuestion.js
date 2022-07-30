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
import { handleSaveQuestion } from '../actions/questions';
import { useNavigate} from "react-router-dom";
import { connect } from 'react-redux';
import * as PathUrlConstants from '../utils/PathUrlConstants';
import { CREATE_NEW_POLLS, WOULD_YOU_RATHER, SUBMIT } from '../utils/GenericConstants';

const theme = createTheme();

  const NewQuestion = (props) => {

  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const optionOne = data.get('optionOne');
    const optionTwo = data.get('optionTwo');
    if(optionOne.trim()===''){
      console.error('First option is empty.');
    }else if(optionTwo.trim()===''){
      console.error('First option is empty.');
    }else{
      new Promise((res, rej) => {
        props.dispatch(handleSaveQuestion(optionOne, optionTwo, props.authedUser));
        setTimeout(() => res('success'), 1000);
      }).then(() => {
        navigate(PathUrlConstants.DashBoardUrl);
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
          <Avatar sx={{ m: 2, bgcolor: 'secondary.main', height: '70px', width: '70px'}}>
            <QuestionAnswerRounded />
          </Avatar>
          <Typography variant="h4">
            {CREATE_NEW_POLLS}
          </Typography>

          <Typography variant="h6">
            {WOULD_YOU_RATHER}
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="optionOne"
              label="First Option"
              name="optionOne"
              autoComplete="optionOne"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="optionTwo"
              label="Second Option"
              type="optionTwo"
              id="optionTwo"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {SUBMIT}
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

const mapStateToProps = ({ authedUser, users  }) => {
  return {
    authedUser,
    users
  };
}

export default connect(mapStateToProps)(NewQuestion);