require("dotenv").config();
const { Sequelize, QueryTypes } = require("sequelize");
const express = require("express");
const app = express();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

// class Blog extends Model {}
// Blog.init(
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     title: {
//       type: DataTypes.TEXT,
//       allowNull: false,
//     },
//     url: {
//       type: DataTypes.TEXT,
//       allowNull: false,
//     },
//     author: {
//       type: DataTypes.TEXT,
//       allowNull: false,
//     },
//     likes: {
//       type: DataTypes.TEXT,
//       allowNull: true,
//     },
//   },
//   {
//     sequelize,
//     underscored: true,
//     timestamps: false,
//     modelName: "blog",
//   }
// );

app.get("/api/blogs", async (req, res) => {
  const blogs = await sequelize.query("select* from blogs", {
    type: QueryTypes.SELECT,
  });
  res.json(blogs);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
