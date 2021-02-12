import React from "react";
import MemeCard from "../components/MemeCard";
import { Grid } from "@material-ui/core";


const MemesLayout = (props) => {
  const {memeList, statusOptions} = props;
  const getMemeCard = (memeData,index) => {
  
    return (
      <Grid item xs={12} sm={6} md = {4} key = {index}>
        <MemeCard memeData = {memeData} statusOptions = {statusOptions}  />
      </Grid>
    );
  };

  return (
    <Grid container spacing={2}>
      {memeList.map((memeItem,index) => getMemeCard(memeItem,index))}
    </Grid>
  );
};

export default MemesLayout;
