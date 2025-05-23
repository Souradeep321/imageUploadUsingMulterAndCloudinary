import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'backend/public/temp')
    },
    filename: function (req, file, cb) {
        // TODO: for users
        //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, Date.now() + '-' + file.originalname);
    }
})

export const upload = multer({
    storage: storage
})
