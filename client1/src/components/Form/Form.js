import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper, Grid, Select, MenuItem, InputLabel } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';

import useStyles from './styles';
import { createPost, updatePost } from '../../actions/posts';

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({ title: '', description: '', date: '', time: '', location: '', category: '', capacity: '', registrationDeadline: '', specialRequirements: '', selectedFile: '' });
  const post = useSelector((state) => (currentId ? state.posts.find((post) => post._id === currentId) : null));
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const clear = () => {
    setCurrentId(0);
    setPostData({ title: '', description: '', date: '', time: '', location: '', category: '', capacity: '', registrationDeadline: '', specialRequirements: '', selectedFile: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createPost(postData));
      clear();
    } else {
      dispatch(updatePost(currentId, postData));
      clear();
    }
  };

  return (
    <Paper className={classes.paper}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? `Editing "${post.title}"` : 'Creating a Event'}</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
          </Grid>
          <Grid item xs={12}>
            <TextField name="description" variant="outlined" label="Description" fullWidth multiline rows={4} value={postData.description} onChange={(e) => setPostData({ ...postData, description: e.target.value })} />
          </Grid>
          <Grid item xs={6}>
            <TextField name="date" variant="outlined" label="Date" fullWidth type="date" value={postData.date} onChange={(e) => setPostData({ ...postData, date: e.target.value })} />
          </Grid>
          <Grid item xs={6}>
            <TextField name="time" variant="outlined" label="Time" fullWidth type="time" value={postData.time} onChange={(e) => setPostData({ ...postData, time: e.target.value })} />
          </Grid>
          <Grid item xs={12}>
            <TextField name="location" variant="outlined" label="Location" fullWidth value={postData.location} onChange={(e) => setPostData({ ...postData, location: e.target.value })} />
          </Grid>
          <Grid item xs={12}>
            <InputLabel>Category</InputLabel>
            <Select name="category" variant="outlined" fullWidth value={postData.category} onChange={(e) => setPostData({ ...postData, category: e.target.value })}>
              <MenuItem value="conference">Conference</MenuItem>
              <MenuItem value="workshop">Workshop</MenuItem>
              <MenuItem value="seminar">Seminar</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={6}>
            <TextField name="capacity" variant="outlined" label="Capacity" fullWidth type="number" value={postData.capacity} onChange={(e) => setPostData({ ...postData, capacity: e.target.value })} />
          </Grid>
          <Grid item xs={6}>
            <TextField name="registrationDeadline" variant="outlined" label="Registration Deadline" fullWidth type="datetime-local" value={postData.registrationDeadline} onChange={(e) => setPostData({ ...postData, registrationDeadline: e.target.value })} />
          </Grid>
          <Grid item xs={12}>
            <TextField name="specialRequirements" variant="outlined" label="Special Requirements" fullWidth multiline rows={4} value={postData.specialRequirements} onChange={(e) => setPostData({ ...postData, specialRequirements: e.target.value })} />
          </Grid>
          <Grid item xs={12}>
            <FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />
          </Grid>
          <Grid item xs={12}>
            <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default Form;
