import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import avatarUrl from "../assets/avatarUrl.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '100%',
    backgroundColor: theme.palette.background.paper,
    color : "Blue"
  },
  inline: {
    display: 'inline',
  },
}));

export default function MemerList(props) {
  const classes = useStyles();
  const {memeList} = props;
  const getMemer = (memeData,index) => {
  
    return (
      <div>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="name" src={avatarUrl} />
        </ListItemAvatar>
        <ListItemText
          primary={memeData.name}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
                >
                {memeData.caption}
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      </div>
    );
  };
  return (
    <List className={classes.root}>
            {memeList.map((memeItem,index) => getMemer(memeItem,index))}
    </List>
  );
}
