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

export default function NewQuestion() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      firstOption: data.get('firstOption'),
      secondOption: data.get('secondOption'),
    });
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
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
}