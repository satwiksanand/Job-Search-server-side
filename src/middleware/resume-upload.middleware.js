import multer from "multer";

//? creating the middleware for uploading the resume
const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/resumes/");
  },
  filename: (req, file, cb) => {
    const name = Date.now() + "-" + req.params.id + "-" + file.originalname;
    console.log(file.originalname);
    cb(null, name);
  },
});

export const uploadFile = multer({
  storage: storageConfig,
});
