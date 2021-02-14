const Meme = require("../models/meme");
const fetch  = require('node-fetch');
exports.getMemeById = (req, res, next, id) => {
  Meme.findById(id).exec((error, item) => {
    if (error) {
      return res.status(404).json({
        error: "Meme not found in DB"
      });
    }
    req.meme = item;
    next();
  });
};
  const imageExists = (url) => {
  fetch(url, { method: 'HEAD' })
    .then(res => {
        if (res.ok) {
            console.log('Image exists.');
        } else {
            console.log('Image does not exist.');
        }
    }).catch(err => console.log('Error:', err));
}
exports.createMeme = (req, res) => {
  if(!(Object.keys(req.body).length === 3 && "name" in req.body && "caption" in req.body && "url" in req.body))
    return res.status(422).json({error : "unwanted fields"})
  const meme = new Meme(req.body);
  if(fetch(req.body.url,{ method: 'HEAD' }))
  meme.save((error, item) => {
    if (error) {
      if(error.name.includes("SyntaxError"))
        return res.status(400).json({error : "Improper Request Syntax; request is ill formed"})
      if(error.name.includes("ValidationError"))
        return res.status(422).json({error : "Missing Fields or unwanted fields"})
      if(error.message.includes("duplicate key error"))
        return res.status(409).json({error : "Meme already Exists"}) 
     return res.status(400).json({error : "Ill Formed Request"})
    }
    res.status(201).json({ id : item._id });
  });
};

exports.getMeme = (req, res) => {
    const response = {
        id : req.meme._id,
        name : req.meme.name,
        url : req.meme.url,
        caption : req.meme.caption
    }
    return res.status(200).json(response);
};

exports.getMemes = (req, res) => {
  Meme.find().sort({ updatedAt: -1 }).limit(100)
  .exec((error, items) => {
    if (error) {
      return res.status(400).json({
        error: "Bad Request"
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
    if(response.length === 0)
      return res.status(204).json(response);
    else  
      return res.status(200).json(response);
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
    console.log(meme);
    meme.url = req.body.url;
    meme.caption = req.body.caption;
    const sz = Object.keys(req.body).length;
    if(!((sz == 2 && "caption" in req.body && "url" in req.body) || (sz == 1 && "caption" in req.body) || (sz == 1 && "url" in req.body)))
      return res.status(422).json({error : "unwanted fields"})
    //TODO: Validate for name should not be allowed to be changed. We can only pass URL and caption in the json for PATCH request.
    console.log(meme);
    meme.save((error, item) => {
    if (error) {
      return res.status(409).json({
        error: "Meme with same data already exists"
      });
    }
    
    //TODO : We only have to send status and no JSON in response.
    res.status(204).send();
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
        error: "Meme with the id doesn't exist"
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
