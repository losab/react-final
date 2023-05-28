export const generateRegisterFormValues = () => {
    return {
      firstName: {
        value: "",
        required: true,
        error: "",
        validateInput: (name) =>
          name.length > 3 ? null : "Name should have at least 3 characters",
      },
      lastName: {
        value: "",
        required: true,
        error: "",
        validateInput: (lastName) =>
          lastName.length > 1
            ? null
            : "Last name should have at least 1 character",
      },
      email: {
        value: "",
        required: true,
        error: "",
        validateInput: (email) =>
          email.includes("@gmail.com") ? null : "Email is not valid",
      },
      password: {
        value: "",
        required: true,
        error: "",
        validateInput: (password) =>
          password.length > 6
            ? null
            : "Password should have at least 6 characters",
      },
    };
  };
  