const React = require("react");
const Layout = require("./Layout");

module.exports = function User({ user }) {
  return <Layout user={user}>Личный кабинет пользователя {user}</Layout>;
};
