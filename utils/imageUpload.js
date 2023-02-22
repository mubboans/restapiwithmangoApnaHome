var multer = require('multer');
var upload = multer({dest:'uploads/'});
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        console.log(req.file,file.path,cb)
        cb(null, 'uploads');
     },
    filename: function (req, file, cb) {
        cb(null , file.originalname);
    }
});
// var uploadFiles = multer({ storage: storage }).single("file");
// var uploadFilesMiddleware = util.promisify(uploadFiles);
// module.exports = uploadFilesMiddleware;

var upload = multer({ storage: storage })
 const imgUpload= upload.single('img')
 module.exports = imgUpload