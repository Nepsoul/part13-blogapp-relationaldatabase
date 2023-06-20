const router = require("express").Router();
const { Blog } = require("../models");

// const blogFinder = async (req, res) => {
//   req.blog = await Blog.findByPk(req.params.id);
//   //console.log(req.blog.toJSON(), "id");
//   //next();
// };

router.get("/", async (req, res) => {
  const blogs = await Blog.findAll();
  console.log(JSON.stringify(blogs, null, 2));
  //   const blogs = await sequelize.query("select* from blogs", {
  //     type: QueryTypes.SELECT,
  //   });
  res.json(blogs);
});

router.get("/:id", async (req, res) => {
  const blog = await Blog.findByPk(req.params.id);
  if (blog) {
    console.log(req.blog.toJSON(), "single blog");
    res.json(blog);
  } else {
    res.status(404).end();
  }
});

//adding simple error handling while adding blog
//route to handle incoming POST requests
router.post("/", async (req, res) => {
  try {
    // console.log(req.body, "req.body");
    const blog = await Blog.create(req.body);

    //do something with the user data
    return res.json(blog);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.delete("/:id", async (req, res) => {
  //debugger;
  const id = req.params.id;
  try {
    const result = await Blog.findByPk(id);
    // console.log(result, "result");
    if (result) {
      await result.destroy();
    }
    res.status(401).json({ message: "blog deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send("error occured to delete blog");
  }
});

router.put("/:id", async (req, res) => {
  const blog = await Blog.findByPk(req.params.id);
  if (blog) {
    blog.likes = req.body.likes;
    await blog.save();
    res.json(blog);
  } else {
    req.status(404).end();
  }
});

module.exports = router;
