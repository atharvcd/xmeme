import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ShareIcon from "@material-ui/icons/Share";
import { Avatar, IconButton, CardMedia } from "@material-ui/core";
import UpdateMeme from "../components/UpdateMeme";
import DeleteMeme from "../components/DeleteMeme";
import FavoriteIcon from '@material-ui/icons/Favorite';
import { incrLikes } from "../api/memesApi";
import avatarUrl from "../assets/avatarUrl.jpg";

const useStyles = makeStyles({
  card: {
    fontFamily : "cursive",
    
    backgroundColor : "#2c2c2c",
    '&:hover': {
      backgroundPosition: 'right',
      msTransform: "scale(1.05)", /* IE 9 */
      webkitTransform : "scale(1.05)",/* Safari 3-8 */
      transform: "scale(1.05)", 
      transition: "all .2s ease-in-out",
      overflow: "hidden",
      opacity : "1"
    }
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9,
    marginTop:'30',
    width : "auto",
    maxHeight : "200"
  },
  image: {
    width: "100%",
    height: "auto"
  },
  title : {
    color : "#ffffff"
  }
});
const WhiteTextTypography = withStyles({
  root: {
    color: "#FFFFFF"
  }
})(Typography);
const MemeCard = props => {
  const classes = useStyles();
  const { name, caption, url, id, likes} = props.memeData;
  const {updated, handleUpdatedStatus, deleted, handleDeletedStatus} = props.statusOptions;
  const [memeLikes,setMemeLikes] = useState(likes);
  const likeMeme = () => {
    incrLikes(id)
      .then(data => {
        console.log(data);
        setMemeLikes(memeLikes+1);
      })
      .catch(error =>{
          console.log("Error in signup")
      });
  }
  return (
    <Card elevation = {20} className = {classes.card}>
      <CardHeader
        classes = {{
          title : classes.title
        }}
        avatar={<Avatar src={avatarUrl} />}
        title={name}
      />
      <CardMedia className={classes.media} image={url} />
      <CardContent>
        <WhiteTextTypography variant="body2" color = "white" component="p">
          {caption}
        </WhiteTextTypography>
      </CardContent>
      <CardActions>
        <UpdateMeme id = {id} name = {name} url = {url} caption = {caption} updated = {updated} handleUpdatedStatus = {handleUpdatedStatus}/>
        <DeleteMeme id = {id} deleted = {deleted} handleDeletedStatus = {handleDeletedStatus}/>
        <IconButton aria-label="like" className={classes.margin} onClick = {likeMeme}>
          <FavoriteIcon color = "secondary"/>
        </IconButton>
        {memeLikes > 0 ?
        (
        <WhiteTextTypography variant="body1" component="p">
          {memeLikes} 
          {memeLikes == 1 ? (" like"):(" likes")}
        </WhiteTextTypography>):<></>}
      </CardActions>
    </Card>
  );
};

export default MemeCard;