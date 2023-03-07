import userService from "../services/userService";

let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: "Missing inputs parameter!"
        })
    }

    let userData = await userService.handleUserLogin(email, password);
    // check email exist
    // compare password
    // return user infomation
    //acess_token: JWT (json web token)

    return res.status(200).json({
        errCode: userData.errCode,
        errMessage: userData.errMessage,
        // userId: userData.userId,
        // userEmail: userData.userEmail,
        // userRoleId: userData.userRoleId
        user: userData.user ? userData.user : {}
    })
}

module.exports = {
    handleLogin: handleLogin
}