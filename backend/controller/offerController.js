import asyncHandler from "../middlewares/asyncHandler.js";
import Offer from "../models/offerModel.js";
import Product from "../models/productModel.js";
import { s3 } from "../utils/aws.S3bucket.js";
import multer from "multer";
import multerS3 from "multer-s3";

const createOffer = asyncHandler(async(req, res)=> {
    const {offerName, offerDiscount, status, offerImage, offerHeading, offerTagline} = req.body;

    try {
        const offer = await Offer.findOne({offerName});
        
        if(offer) {
            res.status(400);
            throw new Error('Offer already exist, update offer instead')
        } else {
            const newOffer = new Offer ({
                offerName, offerDiscount, status, offerImage, offerHeading, offerTagline
            });

            const createdOffer = await newOffer.save();
            res.status(200).json(createdOffer)
        }
    } catch (error) {
        console.log(error)
        res.status(400)
        throw new Error('Unable to create offer, try again')
    }
});

const updateOffer = asyncHandler(async(req, res)=> {
    const {offerName, offerDiscount, status, offerId, offerImage, offerHeading, offerTagline} = req.body;
    // const offerId = req.params.id;
    try {
        const offer = await Offer.findById(offerId);
        
        if(!offer) {
            res.status(404)
            throw new Error('Offer doesnt exists')
        } else {
            const currentDiscount = offer?.offerDiscount;
            const currentOfferName = offer?.offerName;
            //update offer here
            offer.offerName = offerName;
            offer.offerDiscount = offerDiscount;
            offer.status = status;
            offer.offerImage = offerImage;
            offer.offerHeading = offerHeading;
            offer.offerTagline = offerTagline;
            const updatedOffer = await offer.save();

            //update products based on scenario
            if(status === "Inactive") {
                const productsToUpdate = await Product.find({offerName:offer.offerName})
                if(productsToUpdate.length) {
                    let productPromise = productsToUpdate.map(async(product)=> {
                        product.isOnOffer = false;
                        product.productDiscount = 0;
                        // product.price = product.price + (product.price*currentDiscount/100)
                        // product.priceAfterDiscount = product.price;
                        await product.save();
                    })

                    Promise.all(productPromise);
                }
            }
            //what if the product offer discount value is changed?
            if (status === "Active" && offerDiscount !== currentDiscount) {
                const productsToUpdate = await Product.find({offerName:currentOfferName})
                if(productsToUpdate.length) {
                    let productPromise = productsToUpdate.map(async(product)=> {
                        product.productDiscount = offerDiscount;
                        product.offerName = offerName;
                        await product.save();
                    })
                    Promise.all(productPromise);
                }
            }

            //what if only the offer name is changed
            if (status === "Active" && offerName !== currentOfferName) {
                const productsToUpdate = await Product.find({offerName:currentOfferName})
                if(productsToUpdate.length) {
                    let productPromise = productsToUpdate.map(async(product)=> {
                        product.productDiscount = offerDiscount;
                        product.offerName = offerName;
                        await product.save();
                    })
                    Promise.all(productPromise);
                }
            }
            res.status(200).json(updatedOffer)
        }
    } catch (error) {
        console.log(error);
        res.status(400)
            throw new Error('Unable to update offer, try again')
    }
})

const deleteOffer = asyncHandler(async(req, res)=> {
    const offerId = req.params.id;
    try {
        const offer = await Offer.findById(offerId);
        let offerDeleted = false;
        if(!offer) {
            res.status(404)
            throw new Error('Offer doesnt exists')
        } else if (offer.status === "Active") {
            res.status(404)
            throw new Error('Can not delete offer! Offer is still active, deactivate it to delete')
        } else {

            if (offer.offerImage !== "/images/sample.jpg") {

                // Delete image from S3
                const imageKey = offer.offerImage .split(".com/")[1]; // Assuming product.image contains the S3 key (filename)
                
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
                await Offer.deleteOne({ _id: offer._id });
                offerDeleted = true; // Mark the product as deleted

                res.status(200).json({ message: 'Offer and associated image deleted successfully' });
                return;
              }

              if (!offerDeleted) {
                // Delete product from MongoDB
                await Offer.deleteOne({ _id: offer._id });
                res.status(200).json({ message: 'Offer deleted successfully' });
            }
        }
    } catch (error) {
        console.log(error);
        res.status(400)
            throw new Error('Unable to delete offer, try again')
    }
})

const getAllOffers = asyncHandler(async(req,res)=> {
    try {
        const allOffers = await Offer.find();
        res.status(200).json(allOffers)
    } catch (error) {
        console.log(error);
        res.status(400);
        throw new Error('Can not find any offers!')
    }
})

const updateProductOffer = asyncHandler(async(req, res)=> {
    const {offer, productCategory} = req.body;
    try {
        //get all the products from the selected Category
        const getProductsByCategory = await Product.find({category: productCategory});
        if(getProductsByCategory.length) {
            //update their productDiscount, isOnOffer, offerName
            const productsPromise = getProductsByCategory.map(async (productToUpdate)=> {
                // const updatedPrice = productToUpdate.price - (productToUpdate.price* offer.offerDiscount/100)
                productToUpdate.productDiscount = offer.offerDiscount;
                // productToUpdate.price = updatedPrice;
                productToUpdate.isOnOffer = true;
                productToUpdate.offerName = offer.offerName;
                await productToUpdate.save();
            })
            Promise.all(productsPromise)
        }
        res.status(200).json(getProductsByCategory)
    } catch (error) {
        console.log(error);
        throw new Error("Can not updated product offer")
    }
})

// const cancelOffer = asyncHandler(async(req, res)=> {
//     const offerId = req.params.id;
//     try {
//         const offer = await Offer.findById(offerId);
//         if (offer) {
//             offer.status = "Inactive";
//             const updatedOffer = await offer.save();
//             const productsToUpdate = await Product.find({offerName:offer.offerName})
//             if(productsToUpdate.length) {
//                 let productPromise = productsToUpdate.map(async(product)=> {
//                     product.isOnOffer = false;
//                     product.productDiscount = 0;
//                     product.priceAfterDiscount = product.price;
//                     await product.save();
//                 })

//                 Promise.all(productPromise);
//             }
//             res.status(200).json({products: productsToUpdate, offer: updateOffer});
//         } else {
//             res.status(404)
//             throw new Error('Offer doesnt exists')
//         }
//     } catch (error) {
//         console.log(error);
//         res.status(400)
//             throw new Error('Can not cancel offer try again')
//     }
// })

const uploadOfferImageMiddleware = multer({
    storage: multerS3({
      s3: s3,
      bucket: 'computer-makers-products-cpu',
      acl: 'public-read', // or private based on your use case
      key: function (req, file, cb) {
        cb(null, Date.now().toString() + '-' + file.originalname); // unique file name
      },
    }),
});

const uploadImageOffer = asyncHandler(async(req,res)=>{
    res.status(200).json({ message: 'Image uploaded successfully', data: req.file.location });
})

export {createOffer, updateOffer, deleteOffer, getAllOffers, updateProductOffer, uploadOfferImageMiddleware, uploadImageOffer};