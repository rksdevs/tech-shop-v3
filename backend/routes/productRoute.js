import express from 'express';
const router = express.Router();
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct, getProductsByCategory, updateProductStock, createProductReview, getTopRatedProducts, getAllCategories, getAllBrands, getProductsByBrands, getLatestProducts, getFilteredProducts, getAllProductsAdmin, addAllProductsWarranty, getProductFeatureDetails, getProductsByCategoryWithoutPage, updateManyProducts, upload, uploadImage, deleteReview, searchResults, getProductsByOffername, getAllProductsOnDiscount, updateRandomRatings, createBrand, createCategory, getProductBySlug } from '../controller/productController.js';
import {admin, protect} from '../middlewares/authMiddleware.js';

router.get("/", getAllProducts);

router.get("/allProductsAdmin", protect, admin, getAllProductsAdmin);

router.get("/topProducts", getTopRatedProducts);

router.get("/productsOnDiscount", getAllProductsOnDiscount);

router.post("/products/filteredProducts", getFilteredProducts);

router.get("/latestProducts", getLatestProducts); 

router.get("/allCategories", getAllCategories);

router.get("/allBrands", getAllBrands);

router.get("/brand/:brand", getProductsByBrands)

router.get("/category/:category", getProductsByCategory)

router.post('/', protect, admin, createProduct);

router.post('/add-brand', protect, admin, createBrand);

router.post('/add-category', protect, admin, createCategory);

router.get("/productsByOffername/:offerId", getProductsByOffername);

router.put("/:id", protect, admin, updateProduct);

router.post("/updateProductStock", protect, admin, updateProductStock)

router.delete("/:slug", protect, admin, deleteProduct);

router.post("/:id/reviews", protect, createProductReview);

router.post("/updateall/warranty", protect, admin, addAllProductsWarranty);

router.get("/product/features/:slug", getProductFeatureDetails);

router.get("/productWithoutPage/:category", getProductsByCategoryWithoutPage);

// router.get("/:id", getProductById);

router.get("/:slug", getProductBySlug);

router.put("/updateMany/Cpus", protect, admin, updateManyProducts);

router.put("/updateMany/random-ratings", protect, admin, updateRandomRatings);

router.post("/uploadImg", upload.single('image'), uploadImage)

router.post("/product/delete-review", protect, admin, deleteReview);

router.post("/search/product", searchResults);



export default router;