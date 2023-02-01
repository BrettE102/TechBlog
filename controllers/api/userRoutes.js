const router = require("express").Router();
const { User } = require("../../models");
// const withAuth = require("../../utils/auth");

//POST new user
router.post("/", async (req, res) => {
  try {
    const userData = await User.create({
      userName: req.body.userName,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.userId = userData.id;
      req.session.userName = userData.userName;
      req.session.loggedIn = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

//Login already created user
router.post("/login", async (req, res) => {
  try {
    console.log(req.body.userName);
    const userData = await User.findOne({
      where: { userName: req.body.userName },
    });

    if (!userData) {
      res.status(400).json({ message: "Incorrect username, please try again" });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: "Incorrect password, please try again" });
      return;
    }

    req.session.save(() => {
      req.session.userId = userData.id;
      req.session.userName = userData.userName;
      req.session.loggedIn = true;
      console.log(userData);

      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});
//Logout user
router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
