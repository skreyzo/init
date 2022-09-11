const React = require("react");
const Layout = require("./Layout");

module.exports = function Login() {
  return (
    <Layout>
      <p>Это страница для Логина</p>

      <form method="POST" action="/login"> 
        <div class="mb-3">
          <label htmlFor="inputEmail1" class="form-label">
            Email address
          </label>
          <input
            type="email"
            class="form-control"
            name="email"
            aria-describedby="emailHelp"
          />
        </div>
        <div class="mb-3">
          <label htmlFor="password" class="form-label">
            Password
          </label>
          <input type="password" class="form-control" name="password" />
        </div>
        <div class="mb-3 form-check"></div>
        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
    </Layout>
  );
};
