const LoginAuthentication = (values) => {
  const errors = {};
  const emailRegex =
    /^([a-z 0-9 . -]+)@([a-z 0-9 -]+).([a-z]{2,6})(.[a-z]{2,6})?$/i;
  const loginCredentials = () => {
    const credentials = JSON.parse(
      localStorage.getItem("dailyDairyUserValues")
    );
    if (credentials === null) {
      return {};
    }
    return credentials;
  };
  const temp = loginCredentials();
  if (!values.email) {
    errors.email = "Email is required!";
  } else if (!emailRegex.test(values.email)) {
    errors.email = "Enter a valid email!";
  } else if (temp.email !== values.email) {
    errors.email = "Invalid email!";
  }

  if (!values.password) {
    errors.password = "Password is required!";
  } else if (temp.password !== values.password) {
    errors.password = "Invalid password!";
  }
  return errors;
};

export default LoginAuthentication;
