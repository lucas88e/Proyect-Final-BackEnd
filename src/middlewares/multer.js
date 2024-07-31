const multer = require('multer');
const path = require('path');
const { extname } = require('path');

const MIMETYPES = ['image/jpeg', 'image/png'];
const frontendPublicPath = path.join(__dirname,'..','..','..', 'Proyect-Final-Front', 'public');
const storage = multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null, frontendPublicPath); // Asegúrate de que esta ruta es correcta y existe
    }, 
    filename: (req, file, cb) => {
        const fileExtension = extname(file.originalname);
        const fileName = file.originalname.split(fileExtension)[0];
        cb(null, `${fileName}${fileExtension}`); // Agrega un timestamp para evitar colisiones
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (MIMETYPES.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error(`Only ${MIMETYPES.join(', ')} mimetypes are allowed`));
        }
    },
    limits: {
        fileSize: 10000000 // 10MB
    }
});

module.exports = upload;
