const ValidateForm = (values) => {
  const errors = {};
  const emailRegex =
    /^([a-z 0-9 . -]+)@([a-z 0-9 -]+).([a-z]{2,6})(.[a-z]{2,6})?$/i;
  const mobileRegex = /^([0-9]{10,10})$/;
  if (!values.name) {
    errors.name = "Name is required!";
  }
  if (!values.address) {
    errors.address = "Address is required!";
  }
  if (!values.city) {
    errors.city = "City is required!";
  }
  if (!values.state) {
    errors.state = "State is required!";
  }
  if (!values.mobile) {
    errors.mobile = "Mobile number is required!";
  } else if (!mobileRegex.test(values.mobile)) {
    errors.mobile = "Enter a valid mobile number!";
  }
  if (!values.email) {
    errors.email = "Email is required!";
  } else if (!emailRegex.test(values.email)) {
    errors.email = "Enter a valid Email!";
  }

  if (!values.password) {
    errors.password = "Password is required!";
  }

  return errors;
};
export default ValidateForm;
