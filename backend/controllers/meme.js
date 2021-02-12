const Meme = require("../models/meme");

exports.getMemeById = (req, res, next, id) => {
  Meme.findById(id).exec((error, item) => {
    if (error) {
      return res.status(400).json({
        error: "Meme not found in DB"
      });
    }
    req.meme = item;
    next();
  });
};

exports.createMeme = (req, res) => {
  const meme = new Meme(req.body);
  meme.save((error, item) => {
    if (error) {
      return res.status(400).json({
        error: "NOT able to save meme in DB"
      });
    }
    res.json({ id : item._id });
  });
};

exports.getMeme = (req, res) => {
    const response = {
        id : req.meme._id,
        name : req.meme.name,
        url : req.meme.url,
        caption : req.meme.caption
    }
    return res.json(response);
};

exports.getMemes = (req, res) => {
  Meme.find().sort({ updatedAt: -1 }).limit(100)
  .exec((error, items) => {
    if (error) {
      return res.status(400).json({
        error: "NO memes found"
      });
    }
    const response = items.map(item => {
        const resMeme = {};
        resMeme.id = item._id;
        resMeme.name = item.name;
        resMeme.url = item.url;
        resMeme.caption = item.caption;
        return resMeme;
    })

    res.json(response);
  });
};

exports.getMemesData = (req, res) => {
  Meme.find().sort({ updatedAt: -1 }).limit(100)
  .exec((error, items) => {
    if (error) {
      return res.status(400).json({
        error: "NO memes found"
      });
    }
    const response = items.map(item => {
        const resMeme = {};
        resMeme.id = item._id;
        resMeme.name = item.name;
        resMeme.url = item.url;
        resMeme.caption = item.caption;
        resMeme.likes = item.likes;
        return resMeme;
    })

    res.json(response);
  });
};

exports.updateMeme = (req, res) => {
    const meme = req.meme;
    meme.url = req.body.url,
    meme.caption = req.body.caption
    //TODO: Validate for name should not be allowed to be changed. We can only pass URL and caption in the json for PATCH request.
    meme.save((error, item) => {
    if (error) {
      return res.status(400).json({
        error: "Failed to update Meme"
      });
    }
    //TODO : We only have to send status and no JSON in response.
    res.status(200).json(item);
  });
};

exports.updateMemeLikes = (req, res) => {
  const meme = req.meme;
  meme.likes = (meme.likes)+1;
  //TODO: Validate for name should not be allowed to be changed. We can only pass URL and caption in the json for PATCH request.
  meme.save((error, item) => {
  if (error) {
    return res.status(400).json({
      error: "Failed to update Meme"
    });
  }
  //TODO : We only have to send status and no JSON in response.
  res.status(200).json(item);
});
};


exports.removeMeme = (req, res) => {
  const meme = req.meme;

  meme.remove((err, item) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to delete this Meme"
      });
    }
    res.json({
      message: "Successfully deleted the Meme"
    });
  });
};

exports.getMostLikedMemes = (req, res) => {
  Meme.find().sort({ likes: -1 }).limit(50)
  .exec((error, items) => {
    if (error) {
      return res.status(400).json({
        error: "NO memes found"
      });
    }
    const response = items.map(item => {
        const resMeme = {};
        resMeme.id = item._id;
        resMeme.name = item.name;
        resMeme.url = item.url;
        resMeme.caption = item.caption;
        return resMeme;
    })

    res.json(response);
  });
};
