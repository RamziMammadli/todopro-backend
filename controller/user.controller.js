const { UserModel } = require("../models/users");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  direct: true,
  host: "smtp.yandex.com",
  port: 465,
  auth: {
    user: "remzimemmedli95@gmail.com",
    pass: "xpioqsemuckxloiv",
  },
  secure: true,
});

const UserController = {
  getAll: (req, res) => {
    UserModel.find({ isDeleted: false }, (err, docs) => {
      if (!err) res.json(docs);
      else res.status(500).json(err);
    });
  },
  login: (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    UserModel.findOne({ email: email, password: password }, (err, doc) => {
      if (!err) {
        if (doc) {
          //Öncelikle email gönderiyorum
          let confirmEmail = Math.floor(Math.random() * 999999);

          var mailOptions = {
            from: "cagatay.yildiz@neominal.com",
            to: doc.email,
            subject: "Login Confirm Code",
            text: "Confirm Code: " + confirmEmail,
          };

          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              return console.log(error);
            }

            doc.confirmEmail = confirmEmail;

            doc.save((saveErr, saveDoc) => {
              if (!saveErr) {
                res.json(saveDoc);
              } else {
                res.status(500).json(saveErr);
              }
            });
          });
        } else {
          res.status(404).json({ msg: "not found" });
        }
      } else {
        res.status(500).json(err);
      }
    });
  },
  confirmEmail: (req, res) => {
    let confirmEmail = req.body.confirmEmail;
    let UserId = req.body.UserId;

    UserModel.findOne(
      { confirmEmail: confirmEmail, id: UserId, isDeleted: false },
      (err, doc) => {
        if (!err) {
          if (doc) {
            res.json(doc);
          } else {
            res.status(404).json({ message: "not found" });
          }
        } else {
          res.status(500).json(err);
        }
      }
    );
  },
  
};

module.exports = {
  UserController,
};
