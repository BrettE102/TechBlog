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
      // attributes: ["id", "title", "content", "date_created"],
      // include: { model: User, attributes: ["userName"] },
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

// router.get("/edit/:id", withAuth, async (req, res) => {
//   try {
//     const postData = await Post.findByPk(req.params.id);
//     if (postData) {
//       const post = postData.get({ plain: true });
//       res.render("edit", {
//         post,
//         loggedIn: req.session.loggedIn,
//       });
//     } else {
//       res.status(404).end();
//     }
//   } catch (err) {
//     res.redirect("login");
//   }
// });

module.exports = router;
