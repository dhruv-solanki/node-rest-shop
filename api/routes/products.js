const express = require('express');
const router = express.Router();

const multer = require('multer');

const checkAuth = require('../middleware/check-auth');

const storageConfig = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, req.body.name + file.originalname);
    }
});
const filterConfig = function(req, file, cb) {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};
const fileLimit = {
    fileSize: 1024 * 1024 * 5
};

const upload = multer({
    storage: storageConfig,
    limits: fileLimit,
    fileFilter: filterConfig
});


const ProductsController = require('../controllers/products');

router.get('/', ProductsController.products_get_all);

router.post('/', checkAuth, upload.single('productImage'), ProductsController.products_create_product);

router.get('/:productId', ProductsController.products_get_product);

router.patch('/:productId', checkAuth, ProductsController.products_update_product);

router.delete('/:productId', checkAuth, ProductsController.products_delete_product);

module.exports = router;