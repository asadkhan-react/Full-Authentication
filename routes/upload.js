const router = require('express').Router();
const uploadImage = require('../middlewares/uploadImage');
const uploadCtrl = require('../controllers/uploadCtrl');
const auth = require('../middlewares/auth');

router.post('/upload_avatar' , uploadImage.single('file') , auth, uploadCtrl.uploadAvatar);

router.post('/upload_video' , uploadImage.single('file') , auth, uploadCtrl.uploadVideo);

router.post('/upload_docs' , uploadImage.single('file') , auth, uploadCtrl.uploadDocs);


module.exports = router;