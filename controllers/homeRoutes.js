const router = require("express").Router();
const { Comment, Post, User } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    // Get all posts and JOIN with user data
    const allPost = await Post.findAll({
      attributes: ["id", "title", "content", "date_created"],
      include: [
        {
          model: User,
          attributes: ["userName"],
        },
      ],
    });
    // Serialize data so the template can read it
    const post = allPost.map((post) => post.get({ plain: true }));
    // Pass serialized data and session flag into template
    res.render("homepage", {
      post,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/posts/:id", async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id, {
      include: [
        User,
        {
          model: Comment,
          include: User,
        },
      ],
    });

    const thisPost = post.get({ plain: true });
    res.render("newPost", {
      ...thisPost,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("signup");
});

module.exports = router;
