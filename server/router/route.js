import { Router } from "express";
const router = Router();

/**import all controllers */
import * as controller from '../controllers/appController.js'

/**POST methods */
router.route('/register').post(controller.register);
router.route('/registerMail').post();//send email
router.route('/authenticate').post((req,res)=> res.end());//authenticate user
router.route('/login').post(controller.login);// login the app

/**GET methods */
router.route('/user/:usename').get(controller.getUser);//user with username
router.route('/generateOTP').get(controller.generateOTP);// generate random OTP
router.route('/verifyOTP').get(controller.verifyOTP);// verify generated OTP
router.route('/createResetSession').get(controller. createResetSession);// reset al, the variables

/**put methods */
router.route('/updateUser').put(controller.updateUser);//update user profile
router.route('/resetPassword').put(controller.resetPassword);// reset user password

export default router;