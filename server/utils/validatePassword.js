// Function to check user password requirements
const validatePassword = (password) => {
    let error = null;

    if (password.length < 8) {
        error = "Password length must be 8 charackters!";
        return error;
    }

    for (let i = 0; i < password.length; i++) {
        if ("1234567890".includes(password[i])) {
            error = null;
            break;
        }

        error = "Password must contain at least one number!";
    }

    return error;
}

module.exports = validatePassword;