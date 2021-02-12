import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import FitImage from "./FitImage";
const TrendingMemes = () => {
    return(
<Carousel controls = {false} indicators = {false}>
  <Carousel.Item interval={500}>
    <FitImage
      src={"https://images.unsplash.com/reserve/bOvf94dPRxWu0u3QsPjF_tree.jpg?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1055&q=80"}
      alt = {"Img1"}
      width = {2080}
      height = {1920}
    />
    <Carousel.Caption>
      {/* <h3>First slide label</h3>
      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item interval={500}>
    <FitImage
      src={"https://images-na.ssl-images-amazon.com/images/I/61-KUPluVYL._AC_SL1500_.jpg"}
      alt = {"Img1"}
      width = {2080}
      height = {1920}
    />
    <Carousel.Caption>
      {/* <h3>Second slide label</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item interval={500}>
    <FitImage
        src ={"https://images.theconversation.com/files/38926/original/5cwx89t4-1389586191.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=1200.0&fit=crop"}
        alt = {"Img1"}
        width = {2080}
        height = {1920}
    />
    <Carousel.Caption>
      {/* <h3>Third slide label</h3>
      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p> */}
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>
    )
}

export default TrendingMemes;