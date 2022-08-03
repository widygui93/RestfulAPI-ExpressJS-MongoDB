const db = require("../models");
const Post = db.posts;

exports.findAll = (req, res) => {
  Post.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "some error while retrieving posts",
      });
    });
};

exports.create = (req, res) => {
  const post = new Post({
    title: req.body.title,
    body: req.body.body,
    published: req.body.published ? req.body.published : false,
  });

  post
    .save(post)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(409).send({
        message: err.message || "some error while creating posts",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Post.findById(id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(409).send({
        message: err.message || "some error while show posts",
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Post.findByIdAndUpdate(
    id,
    req.body,
    // add this option to return the document after the update was applied
    // and sets the document fields to return
    {
      returnDocument: "after",
      select: "title body",
    }
  )
    .then((result) => {
      if (!result) {
        res.status(404).send({
          message: "Post not found",
        });
      }

      // res.send({
      //   message: "Post was updated",
      // });
      res.send(result);
    })
    .catch((err) => {
      res.status(409).send({
        message: err.message || "some error while updating posts",
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Post.findByIdAndRemove(id)
    .then((result) => {
      if (!result) {
        res.status(404).send({
          message: "Post not found",
        });
      }

      // res.send(result);
      res.send({
        message: "Post was deleted",
      });
    })
    .catch((err) => {
      res.status(409).send({
        message: err.message || "some error while deleting posts",
      });
    });
};
