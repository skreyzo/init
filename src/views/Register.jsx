const React = require("react");
const Layout = require("./Layout");

module.exports = function Register() {
  return (
    <Layout>
      <p>Это страница для Регистрации</p>

      <form action="/register" method="POST">
        <div class="mb-3">
          <label htmlFor="firstname" class="form-label">
            First name
          </label>
          <input
            type="text"
            class="form-control"
            name="firstname"
            aria-describedby="Name"
          />

          <label htmlFor="lastname" class="form-label">
            Last name
          </label>
          <input
            type="text"
            class="form-control"
            name="lastname"
            aria-describedby="Last name"
          />
          <label htmlFor="InputEmail1" class="form-label">
            Email
          </label>
          <input
            type="email"
            class="form-control"
            name="email"
            aria-describedby="emailHelp"
          />
        </div>
        <div class="mb-3">
          <label htmlFor="InputPassword1" class="form-label">
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
