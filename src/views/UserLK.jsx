const React = require("react");
const Layout = require("./Layout");

module.exports = function User({ user }) {
  return (
    <Layout user={user}>
      Личный кабинет пользователя {user}
      <form action="/user" method="POST">
        <table>
          title
          <input name="title" />
          <hr />
          Condition
          <input name="condition" />
          <hr />
          Starts at
          <input type="date" name="startsat" />
          <hr />
          Ends at
          <input type="date" name="endsat" />
          <hr />
          Description
          <input name="description" />
          <hr />
        </table>
        <button type="submit" />
      </form>
    </Layout>
  );
};
