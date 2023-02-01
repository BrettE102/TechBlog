const router = require("express").Router();
const { Comment, Post, User } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", withAuth, async (req, res) => {
  try {
    const userPosts = await Post.findAll({
      where: {
        userId: req.session.userId,
      },
    });
    const posts = userPosts.map((post) => post.get({ plain: true }));
    res.render("dashboard", {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.redirect("login");
  }
});

router.get("/newpost", withAuth, (req, res) => {
  res.render("newPost", {
    loggedIn: req.session.loggedIn,
  });
});


module.exports = router;
