import React from "react";
/* TESTING PURPOSES IMAGE 🧐 */
// const src =
//   "https://images.unsplash.com/reserve/bOvf94dPRxWu0u3QsPjF_tree.jpg?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1055&q=80";
/* DEFAULT SIZE MODEL */
const INIT_SIZE = {
  width: 0,
  height: 0
};
/* DESIRED SIZE */
// const DESIRED_SIZE = {
//   width: 1920,
//   height: 800
// };

export default function FitImage(props) {
  const {src, width, height} = props;
  const [image, setImage] = React.useState(null);
  const [ogSize, setOgSize] = React.useState(INIT_SIZE);
  const [desiredSize, setDesiredSize] = React.useState({width : width, height : height});
  const [modified, setModified] = React.useState(null);
  /* load image and set useful values on mount */
  React.useEffect(() => {
    setImage(src);
    getOriginalSize(src, setOgSize);
    return () => null;
  }, []);

  /* trigger resize image creation */
  React.useEffect(() => {
    resizeImage(image, desiredSize, setModified);
  }, [image, desiredSize, modified]);

  return (
      <img src={modified} alt="modified" />
  );
}

const resizeImage = (original, sizeTo, callback) => {
  const { width: wResult, height: hResult } = sizeTo;
  const img = new Image();
  img.src = original;
  img.crossOrigin = "Anonymous";
  img.onload = function (el) {
    let elem = document.createElement("canvas"); //create a canvas
    elem.width = wResult;
    elem.height = hResult;
    let ctx = elem.getContext("2d");
    ctx.drawImage(el.target, 0, 0, elem.width, elem.height);
    const srcEncoded = ctx.canvas.toDataURL(el.target, "image/jpeg", 0);
    callback(srcEncoded);
  };
};

const getOriginalSize = (src, callback) => {
  const img = new Image();
  let res = {
    width: 0,
    height: 0
  };
  img.src = src;
  img.onload = function () {
    res.width = this.width;
    res.height = this.height;
    callback(res);
  };
};
