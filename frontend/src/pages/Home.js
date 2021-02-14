import React,{ useState, useEffect } from 'react';
import { Grid } from "@material-ui/core";
import MemesLayout from '../containers/MemesLayout';
import { getMemes } from '../api/memesApi';
import AddMeme from '../components/AddMeme';
import MemerList from "../components/MemerList";
import TrendingMemes from "../components/TrendingMemes";
import "../styles.css";
import { getMemesData } from '../api/memesApi';

const Home = () => {
  const [recentMemes, setRecentMemes] = useState([]);
  const [memeCreated, setMemeCreated] = useState(false);
  const [memeUpdated, setMemeUpdated] = useState(false);
  const [memeDeleted, setMemeDeleted] = useState(false);
  
  const itemCreatedStatus = ()=>{
    setMemeCreated(!memeCreated);
  }
  const itemUpdatedStatus = ()=>{
    setMemeUpdated(!memeUpdated);
  }
  const itemDeletedStatus = ()=>{
    setMemeDeleted(!memeDeleted);
  }
  const Options = {
    updated : memeUpdated,
    handleUpdatedStatus : itemUpdatedStatus,
    deleted : memeDeleted,
    handleDeletedStatus : itemDeletedStatus
  }
  const loadAllRecentMemes = () => {
    getMemesData().then(data => {
        data.forEach((item,indx) => {
          data[indx].index = indx+1;
        })
        setRecentMemes(data);

    })
    .catch(error => {
      console.log(error);
    });
  };

  useEffect(() => {
    setMemeCreated(false);
    setMemeUpdated(false);
    setMemeDeleted(false);
    loadAllRecentMemes();
  }, [memeCreated,memeUpdated,memeDeleted]);
  return (
    <div className = "row" style = {{display : "flex", overflow : "hidden", height : "auto", border : "1px solid cyan", margin : "1% 3% 1% 2%"}}>
       <div style = {{width : "100%", border : "1px solid red", margin : "0.5% auto 3% auto"}}>
         <div style = {{marginBottom : "2%"}}>
          <p style = {{fontFamily : "Sofia", color : "#ffffff", fontSize : "3vw"}}>Top 10 Trending Memes</p>
         </div>
         <div style = {{display : "flex", margin : "0 auto", padding : "2%", backgroundColor : "#1f1f1f"}}>
          <div style = {{width : "25%"}}><TrendingMemes memeList = {recentMemes}/></div>
          <div style = {{width : "25%"}}><TrendingMemes memeList = {recentMemes}/></div>
          <div style = {{width : "25%"}}><TrendingMemes memeList = {recentMemes}/></div>
          <div style = {{width : "25%"}}><TrendingMemes memeList = {recentMemes}/></div>
        </div>
      </div>
      <div className = "col-md-8" style = {{float : "left", padding : "0 2% 0 0%", border : "1px solid red"}}>
        <div className = "row" style = {{display : "flex",alignContent : "center", margin : "0.8% auto", border : "1px solid red"}}>
            <div className = "col-md-5" style = {{ textAlign : "left",fontSize : "3vw" ,fontFamily : "Sofia", color : "#ffffff", margin : "1.3% 1%"}}>Recent Memes</div>
            <div className = "col-md-3" style = {{textAlign : "left",paddingTop : "1%", width : "50%", marginTop : "1.2%"}}><AddMeme handleCreatedStatus = {itemCreatedStatus} created = {memeCreated}/></div>
        </div>
        
        <div className="scrollbar scrollbar-primary  mx-auto" style = {{border : "1px solid red", height : "92vh", overflowY : "scroll", overflowX : "hidden", padding : "2.5% 2.5%", backgroundColor : "#1f1f1f", filter : "brightness(100%)"}}>
          <Grid container direction="column" alignItems = "center">
            <Grid item container>
              <Grid item xs={12} sm={12}>
                <MemesLayout memeList = {recentMemes} statusOptions = {Options}/>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
      <div className = "col-md-4" style = {{textAlign : "right", width : "100%",border : "1px solid red", height : "100%", padding : "0.5%"}}>
        <div style = {{textAlign : "left",fontSize : "3vw", fontFamily : "Sofia", color : "#ffffff", border : "1px solid black", margin : "1.5% 1%"}}>Trending Creators</div>
        <div className="scrollbar scrollbar-primary  mt-4 mx-auto" style = {{backgroundColor : "#2c2c2c", opacity : "1" ,border : "1px solid red", height : "92vh", overflowY : "scroll", overflowX : "hidden", padding : "5% 5%"}}>
          <MemerList memeList = {recentMemes}/>
        </div>
      </div>
    </div>
  );
};

export default Home;