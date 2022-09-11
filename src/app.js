require("dotenv").config();

const path = require("path");
const express = require("express");
const morgan = require("morgan");
const session = require("express-session");
const FileStore = require("session-file-store")(session);

const renderTemplate = require("../lib/renderReactModule");
const dbConnectionCheck = require("../db/dbConnectionCheck");
const {
  checkUserInBase,
  checkUserInBaseLogin,
} = require("../middlware/checkUserInBase.middleware");

const bcrypt = require("bcrypt");

const Main = require("./views/Main");
const Login = require("./views/Login");
const Register = require("./views/Register");
const { User, Item } = require("../db/models/");
const UserLK = require("./views/UserLK");
const { getItemDescriptor } = require("@babel/core/lib/config/item");

dbConnectionCheck();
const app = express();

app.use(morgan("dev"));
// Чтобы наши статические файлы были видны браузеру, мы должны их подключить
app.use(express.static(path.join(__dirname, "../public/")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Выносим порт в .env и на всякий случай подставляем дефолтный через ||
const { PORT, SESSION_SECRET } = process.env;

const sessionConfig = {
  name: "examCoocie", // * Название куки
  store: new FileStore(), // * подключение стора (БД для куки) для хранения
  secret: SESSION_SECRET ?? "exam_key", // * ключ для шифрования куки
  resave: false, // * если true, пересохраняет сессию, даже если она не поменялась
  saveUninitialized: false, // * Если false, куки появляются только при установке req.session
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 10, // * время жизни в ms (10 дней)
    httpOnly: true, // * куки только по http
  },
};

app.use(session(sessionConfig));

app.use((req, res, next) => {
  next();
});
// рендерим главную страницу с отображением имени пользователя
app.get("/", (req, res) => {
  const user = req.session?.user;
  renderTemplate(Main, { user }, res);
});

// рендерим  страницу регистрации с отображением имени пользователя

app.get("/register", (req, res) => {
  renderTemplate(Register, {}, res);
});

// если такой пользователь не существует - то заносим пользователя в модель User,
// а если существует  -то придет соответствующее уведомление

app.post("/register", checkUserInBase, async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  try {
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      password: hash,
      email,
      firstname,
      lastname,
    });
    req.session.user = user.firstname;

    res.redirect("/");
  } catch (error) {
    res.send(`Error ------> ${error}`);
  }
});

// отображение личного кабинета пользователя

app.get("/user", (req, res) => {
  const user = req.session?.user;
  renderTemplate(UserLK, { user }, res);
});

app.post("/user", (req, res) => {
  const { title, condition, startsat, endsat, description } = req.body;
  const userId = req.session.user.id;
  Item.create({
    title,
    condition,
    startsat,
    endsat,
    description,
    user_id: userId,
  });
  res.send("done");
});

// кнопка выхода из учетной записи

app.get("/logout", async (req, res) => {
  try {
    if (req.session.user) {
      // * 20 убийство куки если она есть и сессии тоже
      // * аналогия с req.session.save
      req.session.destroy(() => {
        res.clearCookie("examCoocie");
        res.redirect("/");
      });
    } else {
      res.redirect("/login");
    }
  } catch (error) {
    res.send(`Error ------> ${error}`);
  }
});

app.get("/login", async (req, res) => {
  const user = req.session?.user;
  renderTemplate(Login, { user }, res);
});

// здесь я использую мидлварку, которая проверяет наличие юзера по почте. Но надо подправить.
app.post("/login", checkUserInBaseLogin, async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });

    const passCheck = await bcrypt.compare(password, user.password);
    if (passCheck) {
      req.session.user = user.firstname;

      res.redirect("/");
    } else {
      res.redirect("/login");
    }
  } catch (error) {
    res.send(`Error ------> ${error}`);
  }
});

app.listen(PORT, async () => {
  console.log(`Сервер поднят на ${PORT} порту!`);
});
