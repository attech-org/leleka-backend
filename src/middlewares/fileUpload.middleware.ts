import multer from "multer";

export const uploadImageInMemory = multer({
  limits: {
    fieldSize: 2000000,
  },
  storage: multer.memoryStorage(),
});
