import express from "express";
import { Post, User } from "./config/schema";
import { sequelize } from "./config/sequelize";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/api/v1/users", async (req, res) => {
  try {
    const users = await User.findAll();
    return void res.json(users);
  } catch (error) {
    console.log(error);
    return void res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/v1/users", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.create({ name, email, password });
    return void res.json(user);
  } catch (error) {
    console.log(error);
    return void res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/v1/users/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);
      if (!user) {
        return void res.status(404).json({ error: "User not found" });
      }
      // user with all posts
      const userWithPosts = await User.findByPk(id, {
        include: Post,
      });
      return void res.json(userWithPosts);
    } catch (error) {
      console.log(error);
      return void res.status(500).json({ error: "Internal Server Error" });
    }
  });

  app.post("/api/v1/users", async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const user = await User.create({ name, email, password });
      return void res.json(user);
    } catch (error) {
      console.log(error);
      return void res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
  app.get("/api/v1/posts", async (req, res) => {
    try {
      const posts = await Post.findAll({
        include: {
          model: User,
          attributes: ["name", "uid", "email"],
        },
      });
      return void res.json(posts);
    } catch (error) {
      console.log(error);
      return void res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
  app.post("/api/v1/posts", async (req, res) => {
    try {
      const { title, content, userId } = req.body;
  
      const user = await User.findByPk(userId);
      if (!user) {
        return void res.status(404).json({ error: "User not found" });
      }
  
      const post = await Post.create({ title, content, userId });
  
      return void res.json(post);
    } catch (error) {
      console.log(error);
      return void res.status(500).json({ error: "Internal Server Error" });
    }
  });


const main = async () => {
    try {
      await sequelize.sync({ force: true });
      console.log("Database connected");
      app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
      });
    } catch (error) {
      console.log(error);
    }
  };

main();

console.log("Hello, world!");