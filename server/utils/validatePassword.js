// Function to check user password requirements
const validatePassword = (password) => {
    let hasNumber = false;
    let hasLetter = false;

    if (password.length < 8) {
        return "Password length must be 8 charackters!";
    }

    for (let i = 0; i < password.length; i++) {
        if ("1234567890".includes(password[i])) {
            hasNumber = true;
        }
    }

    for (let i = 0; i < password.length; i++) {
        if ("qwertyuiopasdfghjklzxcvbnm".includes(password[i])) {
            hasLetter = true;
        }
    }

    if (!hasNumber) {
        return "Password must contain at least one number!"
    }

    if (!hasLetter) {
        return "Password must contain at least one letter!";
    }

    return null;
};

module.exports = validatePassword;