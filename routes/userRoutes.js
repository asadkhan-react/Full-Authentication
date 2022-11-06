const router = require('express').Router();
const userCtrl = require('../controllers/userCtrl');
const auth = require('../middlewares/auth');
const authAdmin = require('../middlewares/authAdmin');

router.post('/register' , userCtrl.register) ;

router.post('/activation' , userCtrl.activateUser) ;

router.post('/meeting' , userCtrl.meetingEmail) ;

router.post('/login' , userCtrl.login) ;

router.post('/refresh_token' , userCtrl.getAccessToken) ;

router.post('/forgot' , userCtrl.forgotPassword) ;

router.post('/reset' , auth , userCtrl.resetPassword) ;

router.get('/getuserinfo' , auth , userCtrl.getUserInfo) ;

router.get('/getalluserinfo' , auth , authAdmin , userCtrl.getAllUserIfo) ; //is me filter lage ga k admin jab chahe investors or founders ko alag alag dekh ske or chahe to unhen ek sath bhi dekh ske
router.get('/getalluserinfotwo' , auth , authAdmin , userCtrl.getAllUserInfoTwo) ; //is me filter lage ga k admin jab chahe investors or founders ko alag alag dekh ske or chahe to unhen ek sath bhi dekh ske

router.get('/getAllUserIfoforAll' , auth , userCtrl.getAllUserIfoforAll) ; //ye is lie he ta k hum admins or visitos donu k lie sare users ko get ker saken
router.get('/getAllUserInfoTwoforAll' , auth , userCtrl.getAllUserInfoTwoforAll) ; //is ka reason bhi uper wala hi he

router.get('/getallusersforvisitors' , auth , userCtrl.getAllUsersforVisitor) ; //is me fileter lage ga k ager profile type investor  he to sirf founders display hon or ager type founder he to sirf investors display hon

router.get('/logout' , userCtrl.logout);

router.patch('/update' , auth , userCtrl.updateinfo)

router.patch('/update_profile' , auth , userCtrl.updateProfile)

router.patch('/update_role/:id' , auth , authAdmin , userCtrl.updateUserRole)

router.delete('/delete/:id' , auth , authAdmin , userCtrl.deleteUser)

module.exports = router