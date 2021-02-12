const express = require("express");
const router = express.Router();

const { createMeme, getMemeById, updateMeme, removeMeme, getMemes, getMeme, updateMemeLikes, getMemesData } = require("../controllers/meme");


//getting Necessary Params
router.param("memeId", getMemeById);
//Project Routes

//create
router.post("/memes",  createMeme);
//read
router.get("/memes/:memeId", getMeme);
router.get("/memes/data/all",getMemesData);
router.get("/memes/", getMemes);


//update
router.patch("/memes/:memeId", updateMeme);
router.patch("/memes/:memeId/likes",updateMemeLikes);
//delete

router.delete("/memes/:memeId", removeMeme);

module.exports = router;
