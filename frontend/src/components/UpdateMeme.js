import React, {useState,useEffect} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { updateMeme } from '../api/memesApi';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import { IconButton } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  iconPurple: {
   color: "#BB86FC",
   '&:hover': {
     color: "#8858C8",
   },
 },
}));
export default function FormDialog(props) {
  const classes = useStyles();
  const theme = useTheme();
  const { updated, caption, url, handleUpdatedStatus, id, name } = props;
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({
        stateCaption: caption, 
        stateUrl: url
    });
    console.log('Inside Form-Dialog Component',caption,url);
  const { stateCaption, stateUrl } = values;
  console.log('Inside Form Dialog',stateCaption,stateUrl);

  const handleChange = name => event => {
    setValues({ ...values,[name]: event.target.value });
  };
  const handleClickOpen = () => {
    setValues({
        stateCaption : caption,
        stateUrl : url
    })
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = event => {
    //event.preventDefault();
    setValues({ ...values});
    updateMeme(id,{stateCaption,stateUrl})
      .then(data => {
        console.log(data);
      })
      .catch(err =>{
          console.log("Error in signup")
      });
      handleUpdatedStatus(updated);
      console.log("Here it is!",handleUpdatedStatus,updated);
      setOpen(false);
  };
  return (
    <div>
      <IconButton onClick={handleClickOpen}><EditRoundedIcon className = {clsx(classes.iconPurple)} color = {'inherit'}/></IconButton>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit the Meme</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter your Name, a Fancy Caption and a Meme Image Url to create your own custom meme !
          </DialogContentText>
          <TextField
            margin="dense"
            id="stateCaption"
            label="Enter a fancy Caption"
            type="text"
            value = {name}
            InputProps={{
              readOnly: true
            }}
            variant="filled"
            fullWidth
          />
          <TextField
            margin="dense"
            id="stateCaption"
            label="Enter a fancy Caption"
            type="text"
            onChange={handleChange("stateCaption")}
            value = {stateCaption}
            fullWidth
          />
          <TextField
            margin="dense"
            id="stateUrl"
            label="Enter a Meme Url"
            type="text"
            onChange={handleChange("stateUrl")}
            value = {stateUrl}
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