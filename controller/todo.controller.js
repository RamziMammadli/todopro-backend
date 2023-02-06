const { todoSchema } = require("../models/todo");

const todoController = {
  getAll: (req, res) => {
    todoSchema
      .find({})
      .populate("comment")
      .exec((err, docs) => {
        res.send(docs);
      });
  },

  getbyid: (req, res) => {
    let id = req.params.id;

    todoSchema.findOne({ id: id }, (err, docs) => {
      if (!err) {
        if (docs) {
          res.json(docs);
        } else {
          res.status(404).json(err);
        }
      } else {
        res.status(500).json(err);
      }
    });
  },

  add: (req, res) => {
    let newtodoSchema = new todoSchema({
      id: req.body.id,
      title: req.body.title,
      content: req.body.content,
      createdAt: req.body.createdAt,
      isCompleted: req.body.isCompleted,
    });

    newtodoSchema.save((err, docs) => {
      if (!err) {
        res.status(201).json(docs);
      } else {
        res.status(500).json(err);
      }
    });
  },

  deletebyid: (req, res) => {
    let id = req.params.id;

    todoSchema.deleteOne({ id: id });
    res.send("Deleted");
  },
  updatebyid: (req, res) => {
    let id = req.params.id;

    todoSchema.findOne({ id: id }, (err, docs) => {
      if (!err) {
          (docs.title = req.body.title),
          (docs.content = req.body.content),
          (docs.createdAt = req.body.createdAt),
          (docs.isCompleted = req.body.isCompleted),
          docs.save();
        res.json(docs);
      } else {
        res.status(500).json(err);
      }
    });
  },
};

module.exports = {
  todoController,
};
