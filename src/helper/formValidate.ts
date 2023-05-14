export const validateAccount = (name: string, value: string) => {
    switch (name) {
      case "email":
        if (!value) {
          return "Email is Required";
        } else if (
          !value.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
        ) {
          return "Enter a valid email address";
        } else {
          return "";
        }
      case "password":
        if (!value) {
          return "Password is Required";
        } else if (value.length < 4 || value.length > 15) {
          return "Please fill at least 4 character";
        } else if (!value.match(/[a-z]/g)) {
          return "Please enter at least lower character.";
        } else if (!value.match(/[0-9]/g)) {
          return "Please enter at least one digit.";
        } else {
          return "";
        }
      case "username":
        if (!value) {
          return "username Required";
        } else if (!value.match(/^[a-z0-9_]+$/)) {
          return "Usernames can only use letters, numbers, underscores";
        }
        else if(value.length < 4) {
          return "Please fill at least 4 character";
        }
        else {
          return "";
        }
      default: {
        return "";
      }
    }
}