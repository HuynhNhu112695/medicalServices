import userService from "../services/userService";

let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if (!email || !password) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing inputs parameter!"
        })
    } else {

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
}

let handleGetAllUser = async (req, res) => {
    let id = req.query.id;
    let users = await userService.getAllUsers(id);
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing inputs parameter! ',
            users: []
        })
    }
    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        users
    })
}

module.exports = {
    handleLogin: handleLogin,
    handleGetAllUser: handleGetAllUser
}