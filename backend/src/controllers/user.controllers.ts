import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import pool from "../db.js";
import { RowDataPacket } from "mysql2";

dotenv.config();
class userControllers {
  login(req: Request, res: Response) {
    //получение данных из запроса
    const { username, password } = req.body;

    //запрос для получения пользователя по имени пользователя
    const query = `SELECT * FROM users WHERE username = ?`;

    //получение пользователя по имени пользователя из базы данных
    pool.query(query, [username], (err, result: RowDataPacket[]) => {
      //обработка ошибки получения пользователя из базы данных
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      //обработка ошибки пустого результата пользователя из базы данных
      if (result.length === 0) {
        return res.json({ error: "Invalid username or password" });
      }

      //сохранение пользователя в переменную
      const user = result[0];

      //проверка соответствия хешированного пароля пользователю из базы данных
      bcrypt.compare(password, user.password, (err, match) => {
        //обработка ошибки при проверке соответствия хешированного пароля
        if (err) {
          return res.status(500).json({ error: err.message });
        }

        //обработка рзультата проверки соответствия хешированного пароля
        if (!match) {
          return res
            .status(401)
            .json({ error: "Invalid username or password" });
        }
        //сохранение секретного ключа из переменных окружения в переменную
        const secret = process.env.TOKEN_SECRET_KEY as string;

        //создание токена
        const token = jwt.sign({ id: user.id }, secret, {});

        //отправка ответа с токеном и сообщением об успешной авторизации
        res.cookie("cookie", token, { httpOnly: true });
        res.json({ message: "cookie set successfully", token: token });
      });
    });
  }

  signup(req: Request, res: Response) {
    //получение данных из запроса
    const { username, password } = req.body;

    //хеширование пароля с помошью bcrypt
    bcrypt.hash(password, 5, (err, hash) => {
      //обработка ошибки хеширования пароля
      if (err) return res.status(500).json({ error: err.message });

      //запрос дла добавления пользователя в базу данных
      const query = "INSERT INTO users(username, password) VALUES (?, ?)";

      //сохранение пользователя с хешированным паролем в базу данных
      pool.query(query, [username, hash], (err) => {
        //обработка ошибки сохранения пользователя
        if (err) {
          return res.status(500).json({ error: err.message });
        }

        //отправка сообщения об успешном создании пользователя
        res.status(201).json({
          message: "User created successfully",
          password: hash,
          username: username,
        });
      });
    });
  }

  logout(req: Request, res: Response) {
    //очистка куки файлов при выходе из системы и отправка сообщения об успешном выходе из системы
    res.clearCookie("cookie");
    res.send({ message: "You are logged out" });
  }
}

export default new userControllers();
