import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import FitImage from "./FitImage";
const TrendingMemes = (props) => {
  const {memeList} = props
  const getTrendingMeme = (memeData,index) => {
    return(
      <Carousel.Item interval={500}>
        <FitImage
          src={memeData.url}
          alt = {"Img"}
          width = {2080}
          height = {1920}
        />
        <Carousel.Caption>
          <p>{memeData.caption}</p>
        </Carousel.Caption>
     </Carousel.Item>
    )
  }
return(
    <Carousel controls = {false} indicators = {false}>
      {memeList.map((memeItem,index) => getTrendingMeme(memeItem,index))}
    </Carousel>
  )
}

export default TrendingMemes;