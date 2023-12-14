import mysql from "mysql2/promise";

const config = mysql.createConnection({
  host: "localhost",
  user: "root",
  port: "3306",
  password: "Root1234-",
  database: "recipes_db",
});

const connection = await mysql.createConnection(config);

export class RecipesModel {
  static async getAll() {
    console.log("WORKS!!");
    const result = await connection.query(
      "select id, title, autor, recipe_description, cooking_time, people_quantity, main_photo, BIN_TO_UUID(id) id from recipe;"
    );

    console.log("result", result);
  }
  static async getById() {}
  static async create() {}
  static async delete() {}
  static async update() {}
}
