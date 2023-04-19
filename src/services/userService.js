import db from "../models/index";
import bcrypt from "bcryptjs";

let handleUserLogin = async (email, password) => {
    try {
        let isExist = await checkUserEmail(email);
        let userData = {};
        if (isExist) {
            // user already exist
            let user = await db.User.findOne({
                attributes: ['id', 'email', 'password', 'roleId'],
                where: { email: email },
                raw: true
            });

            if (user) {
                //compare password
                let check = await bcrypt.compareSync(password, user.password);//false

                if (check) {
                    userData.errCode = 0;
                    userData.errMessage = 'Ok!';
                    // userData.userId = user.id;
                    // userData.userEmail = user.email;
                    // userData.userRoleId = user.roleId;
                    delete user.password;
                    userData.user = user;
                } else {
                    userData.errCode = 3;
                    userData.errMessage = 'Wrong password!';
                }
            } else {
                userData.errCode = 2;
                userData.errMessage = `User's not found!`;
            }
        } else {
            //return error
            userData.errCode = 1;
            userData.errMessage = `Your's email isn't exist in your system. Plz try other email`;
        }
        return userData;
    } catch (e) {
        return e;
    }
}

let checkUserEmail = async (userEmail) => {
    try {
        let user = await db.User.findOne({
            where: { email: userEmail }
        })
        if (user) {
            return true;
        } else {
            return false;
        }
    } catch (e) {
        return e;
    }
}

let getAllUsers = async (userId) => {
    try {
        let users = 'abc';
        if (userId === 'ALL') {
            users = await db.User.findAll({
                attributes: {
                    exclude: ['password']
                }
            });
        }
        if (userId && userId !== 'ALL') {
            users = await db.User.findOne({
                where: { id: userId },
                attributes: {
                    exclude: ['password']
                }
            });
        }
        return users;
    } catch (e) {
        return e;
    }
}

module.exports = {
    handleUserLogin: handleUserLogin,
    checkUserEmail: checkUserEmail,
    getAllUsers: getAllUsers
}