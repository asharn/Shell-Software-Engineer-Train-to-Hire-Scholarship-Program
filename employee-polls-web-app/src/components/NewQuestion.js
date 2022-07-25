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
import { handleAddQuestion } from '../actions/questions';
import { useNavigate} from "react-router-dom";
import { connect } from 'react-redux';


const theme = createTheme();

  const NewQuestion = (props) => {

  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const firstOption = data.get('firstOption');
    const secondOption = data.get('secondOption');
    console.log({
      firstOption: firstOption,
      secondOption: secondOption
    });
    if(firstOption.trim()===''){
      console.error('First option is empty.');
    }else if(secondOption.trim()===''){
      console.error('First option is empty.');
    }else{
      new Promise((res, rej) => {
        handleAddQuestion(firstOption, secondOption);
        setTimeout(() => res('success'), 1000);
      }).then(() => {
        navigate('/dashboard');
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
            Create New Poll:
          </Typography>

          <Typography variant="h6">
            Would you rather...
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="firstOption"
              label="First Option"
              name="firstOption"
              autoComplete="firstOption"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="secondOption"
              label="Second Option"
              type="secondOption"
              id="secondOption"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
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