const React = require("react");
const Layout = require("./Layout");

module.exports = function Main({ user }) {
  return (
    <Layout user={user}>
      Hello, {user}!

    </Layout>
  );
};
