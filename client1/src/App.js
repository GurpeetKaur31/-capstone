import React, { useState, useEffect } from 'react';
import { Container, AppBar, Typography, Grow, Grid, Button } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';

import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import { getPosts } from './actions/posts';
import { registerEvent } from './actions/eventActions';
import { setUser } from './actions/userActions';
import useStyles from './styles';
import Events from './images/memories.png';

const App = () => {
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  const handleLogin = async () => {
    try {
      const response = await fetch('https://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: 'singhnancy536@gmail.com', password: 'gurpreet' }), 
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const userData = await response.json();
      dispatch(setUser(userData));
    } catch (error) {
      console.error('Error logging in user:', error);
    }
  };

  const handleRegisterEvent = (eventId, userName) => {
    dispatch(registerEvent(eventId, userName));
  };

  return (
    <Container maxWidth="lg">
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography className={classes.heading} variant="h2" align="center">Events</Typography>
        <img className={classes.image} src={Events} alt="icon" height="60" />
      </AppBar>
      <Grow in>
        <Container>
          <Grid container justify="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={7}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={4}>
              {user ? (
                <Form currentId={currentId} setCurrentId={setCurrentId} />
              ) : (
                <div>
                  <Typography variant="h6" align="center">
                    Please login to create and manage events.
                  </Typography>
                  <Button variant="contained" color="primary" onClick={handleLogin}>
                    Login
                  </Button>
                </div>
              )}
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
};

export default App;
