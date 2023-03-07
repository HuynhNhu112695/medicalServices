import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";

let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);

    router.get('/hello', (req, res) => {
        return res.send("Hello world")
    });
    router.get('/crud', homeController.getCRUD);
    router.post('/post-crud', homeController.postCRUD);

    router.get('/get-crud', homeController.getDisplayCRUD);
    router.get('/edit-user', homeController.getEditUser);
    router.post('/put-user', homeController.postUpdateUser);
    router.get('/delete-user', homeController.deleteUser);

    router.post('/api/login', userController.handleLogin);

    return app.use("/", router);
}

module.exports = initWebRoutes;