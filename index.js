require("dotenv").config();
const { Sequelize, Model, DataTypes } = require("sequelize");
const express = require("express");
const app = express();

//middleware to parse incoming JSON data
app.use(express.json()); //for post api

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

class Blog extends Model {}
Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    author: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "blog",
  }
);

Blog.sync();

app.get("/api/blogs", async (req, res) => {
  const blogs = await Blog.findAll();
  console.log(JSON.stringify(blogs, null, 2));
  //   const blogs = await sequelize.query("select* from blogs", {
  //     type: QueryTypes.SELECT,
  //   });
  res.json(blogs);
});

app.get("/api/blogs/:id", async (req, res) => {
  const blog = await Blog.findByPk(req.params.id);
  if (blog) {
    console.log(blog.toJSON(), "single blog");
    res.json(blog);
  } else {
    res.status(404).end();
  }
});

//adding simple error handling while adding blog
//route to handle incoming POST requests
app.post("/api/blogs", async (req, res) => {
  try {
    console.log(req.body, "req.body");
    const blog = await Blog.create(req.body);

    //do something with the user data
    return res.json(blog);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

app.delete("/api/blogs/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await Blog.findByPk(id);
    console.log(result, "result");
    if (result) {
      await result.destroy();
    }
    res.status(204).json({ message: "blog deleted successfully" }).end();
  } catch (error) {
    console.log(error);
    res.status(500).send("error occured to delete blog");
  }
});

//start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
