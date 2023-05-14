const router = require("express").Router();
const { Blog } = require("../models");

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  next();
};

router.get("/", async (req, res) => {
  const blogs = await Blog.findAll();
  console.log(JSON.stringify(blogs, null, 2));
  //   const blogs = await sequelize.query("select* from blogs", {
  //     type: QueryTypes.SELECT,
  //   });
  res.json(blogs);
});

router.get("/:id", blogFinder, async (req, res) => {
  //   const blog = await Blog.findByPk(req.params.id);
  if (req.blog) {
    console.log(req.blog.toJSON(), "single blog");
    res.json(req.blog);
  } else {
    res.status(404).end();
  }
});

//adding simple error handling while adding blog
//route to handle incoming POST requests
router.post("/", async (req, res) => {
  try {
    console.log(req.body, "req.body");
    const blog = await Blog.create(req.body);

    //do something with the user data
    return res.json(blog);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.delete("/:id", blogFinder, async (req, res) => {
  const id = req.params.id;
  try {
    //     const result = await Blog.findByPk(id);
    console.log(result, "result");
    if (req.result) {
      await req.result.destroy();
    }
    res.status(204).json({ message: "blog deleted successfully" }).end();
  } catch (error) {
    console.log(error);
    res.status(500).send("error occured to delete blog");
  }
});

router.put("/:id", blogFinder, async (req, res) => {
  if (req.blog) {
    req.blog.likes = req.body.likes;
    await req.blog.save();
    res.json(req.blog);
  } else {
    req.status(404).end();
  }
});

module.exports = router;
