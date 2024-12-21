import { Sequelize } from "sequelize-typescript";
import { Post, User } from "./schema";

const DATABASE_URL = "postgresql://postgres:root@localhost:5432/hzapata";

export const sequelize = new Sequelize(DATABASE_URL, {
    dialect: "postgres",
    models: [User, Post],
    logging: false,
  });