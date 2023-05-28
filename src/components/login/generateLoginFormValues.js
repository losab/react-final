export const generateLoginFormValues = () => {
    return {
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
  