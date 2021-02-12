import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { createMeme } from '../api/memesApi';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
   fabPurple: {
    color: theme.palette.common.white,
    backgroundColor: "#BB86FC",
    '&:hover': {
      backgroundColor: "#8858C8",
    },
  },
}));

export default function FormDialog(props) {
  const classes = useStyles();
  const theme = useTheme();
  const { created, handleCreatedStatus } = props;
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({
        name: "",
        caption: "", 
        url: ""
    });
  const { name, caption, url } = values;
  const handleChange = name => event => {
    setValues({ ...values,[name]: event.target.value });
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = event => {
    //event.preventDefault();
    setValues({ ...values});
    createMeme({ name, caption, url })
      .then(data => {
          setValues({
            ...values,
            name: "",
            caption: "",
            url: ""
          });
        console.log(data);
      })
      .catch(err =>{
          console.log("Error in signup")
      });
      handleCreatedStatus(created);
      setOpen(false);
  };
  return (
    <div>
      <Fab className = {clsx(classes.fabPurple)} color = {'inherit'} aria-label="addMeme" onClick={handleClickOpen}>
        <AddIcon />
      </Fab>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter your Name, a Fancy Caption and a Meme Image Url to create your own Custom Meme!
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Enter Your Name"
            type="text"
            onChange={handleChange("name")}
            value = {name}
            fullWidth
          />
          <TextField
            margin="dense"
            id="caption"
            label="Enter a fancy Caption"
            type="text"
            onChange={handleChange("caption")}
            value = {caption}
            fullWidth
          />
          <TextField
            margin="dense"
            id="url"
            label="Enter a Meme Url"
            type="text"
            onChange={handleChange("url")}
            value = {url}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
