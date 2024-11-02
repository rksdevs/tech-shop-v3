import asyncHandler from "../middlewares/asyncHandler.js";
import Offer from "../models/offerModel.js";
import Product from "../models/productModel.js";
import multer from "multer";
import multerS3 from "multer-s3";
import { s3 } from "../utils/aws.S3bucket.js";
import Order from "../models/orderModel.js";

//@desc Fetch all products
//@route GET /api/products
//@access Public
const getAllProducts = asyncHandler(async(req,res)=>{
    const pageSize = process.env.PAGINATION_LIMIT;
    const page = Number(req.query.pageNumber) || 1;

    const keyword = req.query.keyword ? {name: {$regex : req.query.keyword, $options: 'i'}} : {};

    const count = await Product.countDocuments({...keyword});
    // let products;
    // if(req.query.pageNumber) {
    //     products = await Product.find({...keyword}).limit(pageSize).skip(pageSize * (page -1));  
    // } else {
    //     products = await Product.find();
    // }
    const products = await Product.find({...keyword}).limit(pageSize).skip(pageSize * (page -1));
    if (products) {
        return res.json({products, page, pages: Math.ceil(count/pageSize)})
    } else {
        res.status(404);
        throw new Error ('Resources not found! Here is a pancakce..')
    }
})

//@desc Fetch one product by ID
//@route GET /api/products/:id
//@access Public
const getProductById = asyncHandler(async(req,res)=>{
    const product = await Product.findById(req.params.id);

    if(product) {
        res.json(product);
    } else {
        res.status(404);
        throw new Error("Resource not found! Here is a pancake..")
    }
})

//@desc Create a product
//@route POST /api/products
//@access admin/private
const createProduct = asyncHandler(async(req,res)=>{
    const newProduct = new Product({
        name: 'Sample Name',
        price: 0,
        currentPrice: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        countInStock: 0,
        numReviews: 1,
        description: 'Sample Description',
        productDiscount: 0,
        sku: "SAMPLE",
        brand: "AMD",
        category: "Motherboard",
        rating: 5,
        isOnOffer: false,
        compatibilityDetails: {
            ramFormFactor: "NA",
        }
    });

    const createdProduct = await newProduct.save();
    res.status(200).json(createdProduct);
})

//@desc Create a new Brand
//@route POST /api/products
//@access admin/private
const createBrand = asyncHandler(async(req,res)=>{
    const {brand} = req.body;
    const newProduct = new Product({
        name: 'Sample Name',
        price: 0,
        currentPrice: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample Description',
        productDiscount: 0,
        sku: "SAMPLE",
        brand: brand,
        category: "Motherboard",
        rating: 0,
        isOnOffer: false,
        compatibilityDetails: {
            ramFormFactor: "NA",
        }
    });

    const createdProduct = await newProduct.save();
    res.status(200).json(createdProduct);
})

//@desc Create a new category
//@route POST /api/products
//@access admin/private
const createCategory = asyncHandler(async(req,res)=>{
    const {category} = req.body;
    const newProduct = new Product({
        name: 'Sample Name',
        price: 0,
        currentPrice: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample Description',
        productDiscount: 0,
        sku: "SAMPLE",
        brand: "AMD",
        category: category,
        rating: 0,
        isOnOffer: false,
        compatibilityDetails: {
            ramFormFactor: "NA",
        }
    });

    const createdProduct = await newProduct.save();
    res.status(200).json(createdProduct);
})

//@desc   Update a product
//@route  PUT /api/products/:id
//@access Private/Admin
const updateProduct = asyncHandler(async(req,res)=>{
    const {name, price, currentPrice, brand, category, sku, image, countInStock, description, productDiscount, socketType, powerConsumption, chipsetModel, formFactor, memorySlots, ramType, ramFormFactor, warrantyDetails, featureDetails, specificationDetails, otherSpecifications, otherFeatures} = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
        product.name = name;
        product.brand = brand;
        product.category = category;
        product.price = price;
        product.currentPrice = currentPrice;
        product.sku = sku;
        product.image = image;
        product.countInStock = countInStock;
        product.description = description;
        product.compatibilityDetails.socketType = socketType;
        product.compatibilityDetails.powerConsumption = powerConsumption;
        product.compatibilityDetails.chipsetModel = chipsetModel;
        product.compatibilityDetails.formFactor = formFactor;
        product.compatibilityDetails.memorySlots = memorySlots;
        product.compatibilityDetails.ramType = ramType;
        product.compatibilityDetails.ramFormFactor = ramFormFactor;
        // product.productDiscount = productDiscount;
        product.warrantyDetails = warrantyDetails;
        product.specificationDetails = specificationDetails;
        product.featureDetails = featureDetails;
        product.otherSpecifications = otherSpecifications;
        product.otherFeatures = otherFeatures;

        // Handling price and discount logic
        if (productDiscount !== undefined) {
            product.productDiscount = productDiscount;
        } else if (currentPrice !== price) {
            if (currentPrice > price) {
                throw new Error("Selling price cannot be greater than MRP!");
            }
            product.productDiscount = ((price - currentPrice) / price) * 100;
        } else {
            product.productDiscount = 0;
        }

        //syncing product's offer with discount
        if(product.isOnOffer) {
            //if product is on offer and productDiscount is 0 --> then set product isOnOffer to false
            if(productDiscount === 0) {
                product.isOnOffer = false;
            } else {
                //if product is on offer and productDiscount is not 0, then match the productDiscount with offerDiscount, if they dont match set product isOnOffer to false and reset the offerName
                try {
                    const appliedOffer = await Offer.find({offerName: product.offerName});
                    if (appliedOffer && appliedOffer.offerDiscount !== productDiscount) {
                        product.isOnOffer = false;
                        product.offerName = ""
                    }
                } catch (error) {
                    console.log(error);
                    throw new Error('Can not find offer details')
                }
            }
        }

        //productDiscount edge cases
        if(productDiscount < 0 || productDiscount > 100) {
            throw new Error("Discount should be between 0 to 100%");
        }

        // //when we are changing the currentPrice
        // if(currentPrice !== price) {
        //     if (currentPrice > price) { //sell price can't be more than MRP
        //         throw new Error("Sell price cannot be greater than MRP!")
        //     }
        //     //setup the productDiscount based on the price difference of currentPrice and price (price is MRP)
        //     product.productDiscount = (price - currentPrice)/price * 100;
        // } else {
        //     //if price and currentPrice are same - set productDiscount as 0
        //     product.productDiscount = 0;
        // }

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } else {
        res.status(404);
        throw new Error('Resource not found!')
    }
})

//@desc   Delete a product
//@route  DELETE /api/products/:id
//@access Private/Admin
const deleteProduct = asyncHandler(async(req,res)=>{
    const product = await Product.findById(req.params.id);
    
    if (!product) {
        res.status(404);
        throw new Error('Product not found');
      }

    // Variable to track whether the product was deleted
    let productDeleted = false;
    // console.log(product);

    if (product.image !== "/images/sample.jpg") {
        // Delete image from S3
        const imageKey = product.image.split(".com/")[1]; // Assuming product.image contains the S3 key (filename)
        console.log(imageKey)
        const params = {
            Bucket: 'computer-makers-products-cpu', // Replace with your S3 bucket name
            Key: imageKey, // Key (filename) of the image to delete
        };

        try {
            await s3.deleteObject(params).promise();
        } catch (error) {
            console.error('Error deleting image from S3:', error);
            res.status(500).json({ error: 'Failed to delete product image' });
            return; // Exit early if image deletion fails
        }

        // Delete product from MongoDB
        await Product.deleteOne({ _id: product._id });
        productDeleted = true; // Mark the product as deleted
        res.status(200).json({ message: 'Product and associated image deleted successfully' });
        return; // Exit early to avoid running the second deletion
    } else {
        try {
            await Product.deleteOne({_id: product._id})
            res.status(200).json({message: 'Product deleted successfully'})
        } catch (error) {
            res.status(404);
        throw new Error('Resource not found!')
        }
    }

    

    // if (product) {
    //     await Product.deleteOne({_id: product._id})
        
    //     res.status(200).json({message: 'Product deleted successfully'})
    // } else {
    //     res.status(404);
    //     throw new Error('Resource not found!')
    // }
})

//@desc Fetch all products by category
//@route GET /api/products/:category
//@access Public
const getProductsByCategory = asyncHandler(async(req,res)=>{
    const categoryToSearch = req.params.category;
    const pageSize = process.env.PAGINATION_LIMIT;
    const page = Number(req.query.pageNumber) || 1;
    const count = await Product.countDocuments({category: categoryToSearch});
    // let products;
    // if(req.query.pageNumber) {
    //     products = await Product.find({...keyword}).limit(pageSize).skip(pageSize * (page -1));  
    // } else {
    //     products = await Product.find();
    // }
    const products = await Product.find({category: categoryToSearch}).limit(pageSize).skip(pageSize * (page -1));
    if (products) {
        return res.json({products, page, pages: Math.ceil(count/pageSize)})
    } else {
        res.status(404);
        throw new Error ("Category not found! Here is a pancake..")
    }
})

//@desc   Update a product
//@route  POST /api/products/updateProductStock
//@access Private
const updateProductStock = asyncHandler(async(req,res)=>{
    const order = req.body;
    for (const orderItem of order.orderItems) {
        const product = await Product.findById(orderItem.product);
        if (product) {
            product.countInStock -= orderItem.qty;
            await product.save();
        } else {
            res.status(404);
            throw new Error(`Product with ID ${orderItem.product} not found`);
        }
    }

    res.json({ message: 'Stock updated successfully' });
})

//@desc   Create product review
//@route  POST /api/products/:id/reviews
//@access Private
const createProductReview = asyncHandler(async(req,res)=>{
    const {rating, comment} = req.body;
    const productId = req.params.id;
    const names = ["Rakesh", "Rahul", "Abdul", "Chaitanya", "Shankar", "Vishnu", "Brahmananda", "Joel", "Krish", "Aarav",
    "Vihaan",
    "Aditya",
    "Arjun",
    "Sai",
    "Krishna",
    "Ishaan",
    "Vivaan",
    "Aryan",
    "Dhruv",
    "Ananya",
    "Aarohi",
    "Isha",
    "Saanvi",
    "Myra",
    "Diya",
    "Aanya",
    "Meera",
    "Riya",
    "Tara"]

    const product = await Product.findById(productId);

    if (product) {
        //check if the user already has a review on the product
        const alreadyReviewed = product.reviews.find((review) => review.user.toString() === req.user._id.toString());

        if(alreadyReviewed) {
            res.status(404);
            throw new Error(`You have already reviewed this product`);  
        }

        
        if(!req.user.isAdmin) {
            //user must have purchased the product at least once 
            //get all orders of the users
            // const orders = await Order.find({user: req.user._id});
            try {
                // Fetch all orders for the given user
                const orders = await Order.find({ user: req.user._id });
        
                // Iterate through each order
                for (const order of orders) {
                    // Check if any order item contains the product with the specified productId
                    for (const item of order?.orderItems) {
                        if (item?.product?.toString() === productId) {
                            // return true;
                            const review = {
                                name: req.user.name,
                                rating: Number(rating),
                                comment,
                                user: req.user._id
                            }
                    
                            product.reviews.push(review);
                            product.numReviews = product.reviews.length;
                    
                            product.rating = product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length;
                            
                            await product.save();
                    
                            res.status(201).json({message: "Review added"})
                        }
                    }
                }
                // If no such product is found after checking all orders, return false
                res.status(400).json({message: "Can not review product, you need to purchase it to be able to write a reivew"})
            } catch (error) {
                console.error(error);
                throw new Error('Error checking if user has purchased product');
            }

        } else {
            let random = Math.floor(Math.random()*30)
            const review = {
                name: names[random],
                rating: Number(rating),
                comment,
                user: req.user._id
            }
    
            product.reviews.push(review);
            product.numReviews = product.reviews.length;
    
            product.rating = product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length;
            
            await product.save();
    
            res.status(201).json({message: "Review added"})
        }
    } else {
        res.status(404);
        throw new Error(`Product with ID ${orderItem.product} not found`);
    }

})

//@desc Fetch top rated products
//@route GET /api/products
//@access Public
const getTopRatedProducts = asyncHandler(async(req,res)=>{
    const products = await Product.find({}).sort({rating: -1}).limit(20)
    if (products) {
        res.status(200).json(products)
    } else {
        res.status(404);
        throw new Error(`Products not found`);
    }

})

//@desc Fetch top rated products
//@route GET /api/products/allCategories
//@access Public
const getAllCategories = asyncHandler(async(req, res) => {
    try {
        const products = (await Product.find());
        if (products.length > 0) {
            const categories = products.map((product)=> product.category)
            const uniqueCategories = [];
            categories.forEach((category)=> {
                if (!uniqueCategories.includes(category)) {
                    uniqueCategories.push(category)
                }
            })
            res.status(200).json(uniqueCategories)
        } else {
            res.status(404);
        throw new Error("Category not found! Here is a pancake..")
        }
    } catch (error) {
        console.log(error);
        res.status(404);
        throw new Error("Category not found! Here is a pancake..")
    }
})

//@desc Fetch top rated products
//@route GET /api/products/allBrands
//@access Public
const getAllBrands = asyncHandler(async(req, res) => {
    try {
        const products = (await Product.find());
        if (products.length > 0) {
            const brands = products.map((product)=> product.brand)
            const uniqueBrands = [];
            brands.forEach((brand)=> {
                if (!uniqueBrands.includes(brand)) {
                    uniqueBrands.push(brand)
                }
            })
            res.status(200).json(uniqueBrands)
        } else {
            res.status(404);
        throw new Error("Brand not found! Here is a pancake..")
        }
    } catch (error) {
        console.log(error);
        res.status(404);
        throw new Error("Brand not found! Here is a pancake..")
    }
})

//@desc Fetch all products by brand
//@route GET /api/products/:brand
//@access Public
const getProductsByBrands = asyncHandler(async(req,res)=>{
    
    const brandToSearch = req.params.brand;
    const pageSize = process.env.PAGINATION_LIMIT;
    const page = Number(req.query.pageNumber) || 1;
    try {
    //     const count = await Product.countDocuments({brand: brandToSearch});
    // console.log(count)
    // let products;
    // if(req.query.pageNumber) {
    //     products = await Product.find({...keyword}).limit(pageSize).skip(pageSize * (page -1));  
    // } else {
    //     products = await Product.find();
    // }
    const products = await Product.find({brand: brandToSearch});
    if (products) {
        return res.json({products})
    } else {
        res.status(404);
        throw new Error ("Brand not found! Here is a pancake..")
    }
    } catch (error) {
        res.status(404);
        throw new Error ("Brand not found! Here is a pancake..")
    }
})

//@desc Fetch latest products
//@route GET /api/products
//@access Public
const getLatestProducts = asyncHandler(async(req,res)=>{
    const products = await Product.find({}).sort({createdAt: -1}).limit(20)
    if (products) {
        res.status(200).json(products)
    } else {
        res.status(404);
        throw new Error(`Products not found`);
    }

})

//@desc Fetch filtered products
//@route POST /api/products
//@access Public
const getFilteredProducts = asyncHandler(async(req,res)=>{
    const {brandFilter, categoryFilter, priceFilter, includeOutOfStock} = req.body;
    const pageSize = process.env.PAGINATION_LIMIT;
    const page = Number(req.query.pageNumber) || 1;

    const query = { $and: [] };
    let minPrice = 0;
    let maxPrice = priceFilter || 9999999

if (brandFilter?.length > 0) {
  query.$and.push({ brand: { $in: brandFilter } });
}

if (categoryFilter?.length > 0) {
  query.$and.push({ category: { $in: categoryFilter } });
}

if (minPrice !== null && maxPrice !== null) {
  query.$and.push({ price: { $gte: minPrice, $lte: maxPrice } });
} else if (minPrice !== null) {
  query.$and.push({ price: { $gte: minPrice } });
} else if (maxPrice !== null) {
  query.$and.push({ price: { $lte: maxPrice } });
}

if (includeOutOfStock === false) {
    query.$and.push({ countInStock: { $gt: 0 } });
}

if (query.$and.length === 0) {
  // No filters applied, fetch all products
  delete query.$and;
}

    const keyword = req.query.keyword ? {name: {$regex : req.query.keyword, $options: 'i'}} : {};

    const count = await Product.countDocuments(query);
    // let products;
    // if(req.query.pageNumber) {
    //     products = await Product.find({...keyword}).limit(pageSize).skip(pageSize * (page -1));  
    // } else {
    //     products = await Product.find();
    // }
    // const products = await Product.find(query).limit(pageSize).skip(pageSize * (page -1));
    const products = await Product.find(query)
    if (products) {
        return res.json({products, page, pages: Math.ceil(count/pageSize)})
    } else {
        res.status(404);
        throw new Error ('Resources not found! Here is a pancakce..')
    }
})

//@desc Fetch all products
//@route GET /api/products
//@access Admin
const getAllProductsAdmin = asyncHandler(async(req,res)=>{
    // const pageSize = process.env.PAGINATION_LIMIT;
    // const page = Number(req.query.pageNumber) || 1;

    // const keyword = req.query.keyword ? {name: {$regex : req.query.keyword, $options: 'i'}} : {};

    // const count = await Product.countDocuments({...keyword});
    // let products;
    // if(req.query.pageNumber) {
    //     products = await Product.find({...keyword}).limit(pageSize).skip(pageSize * (page -1));  
    // } else {
    //     products = await Product.find();
    // }
    const products = await Product.find()
    if (products) {
        return res.json(products)
    } else {
        res.status(404);
        throw new Error ('Resources not found! Here is a pancakce..')
    }
})

const addAllProductsWarranty = asyncHandler(async(req,res)=>{
    // const pageSize = process.env.PAGINATION_LIMIT;
    // const page = Number(req.query.pageNumber) || 1;

    // const keyword = req.query.keyword ? {name: {$regex : req.query.keyword, $options: 'i'}} : {};

    // const count = await Product.countDocuments({...keyword});
    // let products;
    // if(req.query.pageNumber) {
    //     products = await Product.find({...keyword}).limit(pageSize).skip(pageSize * (page -1));  
    // } else {
    //     products = await Product.find();
    // }
    const products = await Product.find();

    if (products) {
        for (const eachProduct of products) {
            if (eachProduct.productDiscount > 0) {
                eachProduct.currentPrice = eachProduct.price - (eachProduct.price * eachProduct.productDiscount / 100);
            } else {
                eachProduct.currentPrice = eachProduct.price;
            }

            await eachProduct.save();
        }
        return res.json({ message: "completed" });
    } else {
        res.status(404);
        throw new Error('Resources not found! Here is a pancake..');
    }
})

//@desc Fetch all products
//@route GET /api/products
//@access Public
const getProductFeatureDetails= asyncHandler(async(req,res)=>{
    const productId = req.params.id;
    // const pageSize = process.env.PAGINATION_LIMIT;
    // const page = Number(req.query.pageNumber) || 1;

    // const keyword = req.query.keyword ? {name: {$regex : req.query.keyword, $options: 'i'}} : {};

    // const count = await Product.countDocuments({...keyword});
    // let products;
    // if(req.query.pageNumber) {
    //     products = await Product.find({...keyword}).limit(pageSize).skip(pageSize * (page -1));  
    // } else {
    //     products = await Product.find();
    // }
    const product = await Product.findById(productId)
    if (product) {
        let updatedFeatures = Object.values(product?.featureDetails).filter((item)=>item !== "" && item !== null && item !== undefined);
        return res.json(updatedFeatures)
    } else {
        res.status(404);
        throw new Error ('Resources not found! Here is a pancakce..')
    }
})

//@desc Fetch all products
//@route GET /api/products
//@access Admin
const getProductsByCategoryWithoutPage = asyncHandler(async(req,res)=>{
    const categoryToSearch = req.params.category;
    
    try {
        const products = await Product.find({category: categoryToSearch,
            countInStock: { $gt: 0 }})
        if (products) {
            return res.json(products)
        } else {
            res.status(404);
            throw new Error ('Resources not found! Here is a pancakce..')
        }
    } catch (error) {
        console.log(error)
    }
})

//@desc Fetch all products
//@route GET /api/products
//@access Admin --//optional
const updateManyProducts = asyncHandler(async(req, res)=>{
    try {
        const result = await Product.updateMany(
            { $mul: { price: 1.00783 } }
        );
        res.status(200).json({ message: 'Prices updated successfully', result });
      } catch (error) {
        res.status(500).json({ message: 'Error updating prices', error });
      }
})

//@desc Update ratings of all product
//@route PUT /api/products
//@access Admin 
const updateRandomRatings = asyncHandler(async(req, res) =>{
    try {
      // Find all products
      const products = await Product.find();
  
      // Loop through each product
      for (let product of products) {
        // Generate a random rating between 4 and 5
        const randomRating = Math.floor(Math.random() * 2) + 4;
  
        // Update the product's ratings field
        await Product.updateOne(
          { _id: product._id },           // Filter by the document's ID
          { $set: { rating: randomRating } }  // Set the random rating
        );
      }
  
      console.log("All products updated with random ratings.");
      res.status(200).json({message: "All products updated with random ratings."})
    } catch (error) {
        res.status(500).json({ message: 'Error updating prices', error });
    }
  })

const upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: 'computer-makers-products-cpu',
      acl: 'public-read', // or private based on your use case
      key: function (req, file, cb) {
        cb(null, Date.now().toString() + '-' + file.originalname); // unique file name
      },
    }),
});

const uploadImage = asyncHandler(async(req,res)=>{
    res.status(200).json({ message: 'Image uploaded successfully', data: req.file.location });
})

  const deleteReview = asyncHandler(async (req, res) => {
    const { reviewId } = req.body;

    try {
        // Find the product that contains the review
        const product = await Product.findOne({ "reviews._id": reviewId });

        if (!product) {
            return res.status(404).json({ message: 'Review not found' });
        }

        // Remove the review from the product's reviews array
        product.reviews = product.reviews.filter(review => review._id.toString() !== reviewId);

        // Update the number of reviews and the rating
        product.numReviews = product.reviews.length;
        if (product.numReviews > 0) {
            product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;
        } else {
            product.rating = 0;
        }

        // Save the updated product
        await product.save();

        res.status(200).json({ message: 'Review removed' });
    } catch (error) {
        console.error(error);
        res.status(500);
        throw new Error("Something went wrong!")
    }
    });

const searchResults = asyncHandler(async(req,res)=>{
    try {
        const searchTerm = req.body.q;
        const terms = searchTerm.split(' ').filter(term => term); // Split by spaces and remove empty strings
        const regexTerms = terms.map(term => new RegExp(term, 'i'));

        const products = await Product.find({
            $and: regexTerms.map(term => ({
                $or: [
                    { name: term },
                    { description: term },
                    { brand: term }
                ]
            }))
        });

        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Could not find related products' });
    }
})

//@desc Fetch products by offername rated products
//@route GET /api/products
//@access Public
const getProductsByOffername = asyncHandler(async(req,res)=>{
    const offerId = req.params.offerId;
    try {
        const offer = await Offer.findById(offerId);
        if (offer) {
            const products = await Product.find({offerName: offer?.offerName})
        if (products) {
            res.status(200).json({productData: products, offerName: offer.offerName, offerImg: offer?.offerImage})
        } else {
        res.status(404).json({message: error?.data || error?.data?.message});
        } 
        } 
    } catch (error) {
        res.status(404).json({message: error?.data || error?.data?.message});
    }
})

//@desc Fetch products by offername rated products
//@route GET /api/products
//@access Public
const getAllProductsOnDiscount = asyncHandler(async(req,res)=>{
    const products = await Product.find({ productDiscount: { $gt: 0 } })
    if (products) {
        res.status(200).json(products)
    } else {
        res.status(404);
        throw new Error(`Products not found`);
    }
})


export {getAllProductsOnDiscount, getProductsByOffername, getAllProducts, getProductById, updateManyProducts, createProduct,getProductsByCategoryWithoutPage, updateProduct, deleteProduct, getProductsByCategory, updateProductStock, createProductReview, getTopRatedProducts, getAllCategories, getAllBrands, getProductsByBrands, getLatestProducts, getFilteredProducts, getAllProductsAdmin, addAllProductsWarranty, getProductFeatureDetails, upload, uploadImage, deleteReview, searchResults, updateRandomRatings, createCategory, createBrand}