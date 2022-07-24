import React from 'react';
import { connect } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import { makeStyles } from "@mui/styles";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Box, Container, CssBaseline, Grid, ThemeProvider, createTheme, Stack } from "@mui/material";

  
const withRouter = (Component) => {
  const ComponentWithRouterProp = (props) => {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  };

  return ComponentWithRouterProp;
};

const useStyles = makeStyles(theme => ({
    card: {
      maxWidth: 200,
      minWidth: 200,
      margin: "auto",
      transition: "0.3s",
      boxShadow: "0 8px 40px -12px rgba(0,0,0,0.6)",
      "&:hover": {
        boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.6)"
      }
    },
    content: {
      textAlign: "center",
      padding: 2 * 3
    },
    subheading: {
      lineHeight: 1.8
    }
  }));  

const QuestionDashBoard = (props) => {
    
    const classes = useStyles();
    const handleClick = (event) => {
        event.preventDefault();
    }
    const questions = props.questions;

    return (
      <Container component="main" maxWidth="md" >
        <CssBaseline />
            <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
            >
                <Box
                    border='1px solid'
                    padding='5px'
                >
                    <Box
                        border='1px solid'
                        padding='5px'
                        margin='1px'
                        marginBottom='5px'
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}

                    >
                        <Typography
                                    className={"MuiTypography--heading"}
                                    variant={"h6"}
                                    gutterBottom
                                    >{props.title}
                        </Typography>
                    </Box>
  
                    <Box
                        border='1px solid'
                        margin='1px'
                        padding='5px'
                        marginTop='5px'
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}

                    >  
                    <Grid container spacing={1}>
                    {   questions.map((question, index) => {
                        const { id, name, avatarURL, date } = question;
                        return (
                        <Grid item>
                            <Card key={index} className={classes.card}>
                                <CardContent className={classes.content}>
                                    <Box
                                            border='1px solid'
                                            padding='10px'
                                            marging='10px'
                                            
                                        >
                                        <Box
                                                padding='5px'
                                                style={{
                                                    direction: 'row', 
                                                    display:'flex', 
                                                    justifyContent: 'center', 
                                                    alignItems: 'center' 
                                                }}
                                            >
                                                <Avatar variant='circular' 
                                                    sx={{ width: 30, height: 30 }} 
                                                    src={avatarURL}
                                                />
                                                <Typography>&nbsp;&nbsp;</Typography>
                                                <Stack
                                                    direction="column"
                                                    justifyContent="center"
                                                    alignItems="right"
                                                    spacing={-1}>
                                                    <Typography>{ name }</Typography>
                                                    <Typography>{ id }</Typography>
                                                </Stack>
                                            </Box>
                                            <Typography variant="subtitle2">{ date }</Typography>
                                        </Box>
                                        <Box
                                            border='1px solid'
                                            padding='3px'
                                            margin='1px'
                                        >
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                fullWidth
                                                sx={{ mt: 0.5, mb: 0.5 }}
                                                onClick={() => {
                                                    handleClick();
                                                }}
                                            >
                                                Show
                                            </Button>
                                        </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                        );
                    })}
                    </Grid>
                </Box>
            </Box>
        </Box>
      </Container>
    );
};

const DashBoard = (props) => {
    const theme = createTheme();
    const { questionsData } = props;
    return(
        <ThemeProvider theme={theme} >
            <QuestionDashBoard title='New Question' questions={questionsData.newQuestions}/>
            <QuestionDashBoard title='Answered Question' questions={questionsData.answeredQuestions}/>
        </ThemeProvider>
    )
}
  
  const mapStateToProps = ({  authedUser, questions, users  }) => {
    const answeredQuestionIds = Object.keys(users[authedUser].answers);

    const allQuestions = Object.values(questions)
    .map(question => ({
      qid: question.id,
      id: question.author,
      avatarURL: users[question.author].avatarURL,
      date: question.timestamp
    }))
    .sort((a, b) => a.date - b.date);

    const newQuestions = allQuestions
    .filter(question => answeredQuestionIds.includes(question.qid));

    const answeredQuestions = allQuestions
    .filter(question => !answeredQuestionIds.includes(question.qid));
    
    return {
        questionsData: {
            newQuestions,
            answeredQuestions
        }
    };
};

export default withRouter(connect(mapStateToProps)(DashBoard));