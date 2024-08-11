import asyncHandler from "../middlewares/asyncHandler.js";
import PrebuiltPC from "../models/preBuiltPcModel.js";
import { s3 } from "../utils/aws.S3bucket.js";
import multer from "multer";
import multerS3 from "multer-s3";

//@desc - create a prebuilt pc
//@route - /prebuiltpc/configure/create
//@access - admin/protected
const createPrebuiltPc = asyncHandler(async(req, res) => {
    const {pcName, platform, pcCategory, pcUses, pcComponents, pcImage, pcTotalPrice, countInStock} = req.body;

    try {
        const newPrebuiltPc = new PrebuiltPC({
            pcName,
            platform,
            pcCategory,
            pcUses,
            pcComponents,
            pcImage,
            pcTotalPrice,
            countInStock
        })
    
        const updatedPrebuiltPc = await newPrebuiltPc.save();
        res.status(200).json(updatedPrebuiltPc)
    } catch (error) {
        console.log(error)
        res.status(400)
        throw new Error('Can not create new prebuilt pc! Here is a pancake!')
    }
})

//@desc - update a prebuilt pc
//@route - /prebuiltpc/configure/update/:id
//@access - admin/protected
const updatePrebuiltPc = asyncHandler(async(req, res) => {
    const prebuiltPcId = req.params.id
    const {pcName, platform, pcCategory, pcUses, pcComponents, pcImage, pcTotalPrice, countInStock} = req.body;

    try {
        const prebuiltPc = await PrebuiltPC.findById(prebuiltPcId)

        if(prebuiltPc) {
            prebuiltPc.pcName = pcName;
            prebuiltPc.platform = platform;
            prebuiltPc.pcCategory = pcCategory;
            prebuiltPc.pcUses = pcUses;
            prebuiltPc.pcComponents = pcComponents;
            prebuiltPc.pcImage = pcImage;
            prebuiltPc.pcTotalPrice = pcTotalPrice;
            prebuiltPc.countInStock = countInStock;

            const updatedPrebuiltPc = await prebuiltPc.save();
            res.status(200).json(updatedPrebuiltPc)
        } else {
            res.status(404)
            throw new Error('Can not find the prebuilt to update! Here is a pancake!')
        }
    } catch (error) {
        console.log(error)
        res.status(400)
        throw new Error('Can not create new prebuilt pc! Here is a pancake!')
    }
})


//@desc - delete a prebuilt pc
//@route - /prebuiltpc/configure/delete/:id
//@access - admin/protected
const deleteOnePrebuiltPc = asyncHandler(async(req, res) => {
    const prebuiltPcId = req.params.id
    const product = await PrebuiltPC.findById(prebuiltPcId);

    let productDeleted = false;

    if (product) {

        if (product.pcImage !== "/images/sample.jpg") {

            // Delete image from S3
            const imageKey = product.pcImage.split(".com/")[1]; // Assuming product.image contains the S3 key (filename)
    
            
            
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
            await PrebuiltPC.deleteOne({ _id: product._id });
            productDeleted = true; // Mark the product as deleted
            res.status(200).json({ message: 'Prebuilt PC and associated image deleted successfully' });
            return;
          }

          if (!productDeleted) {
            // Delete product from MongoDB
            await PrebuiltPC.deleteOne({ _id: product._id });
            res.status(200).json({ message: 'Product deleted successfully' });
            }
    } else {
        res.status(404);
        throw new Error('Resource not found!')
    }
})


//@desc - get all prebuilt pcs
//@route - /prebuiltpc/configure/all
//@access - admin/protected
const getAllPrebuiltPc = asyncHandler(async(req, res) => {
    const allPrebuiltPc = await PrebuiltPC.find();
    if (allPrebuiltPc.length) {
        res.status(200).json(allPrebuiltPc)
    } else {
        res.status(404);
        throw new Error('Resource not found!')
    }
})

//@desc - get one specific prebuilt pc
//@route - /prebuiltpc/configure/one/:id
//@access - admin/protected
const getSpecificPrebuiltPc = asyncHandler(async(req, res) => {
    const prebuiltPcId = req.params.id
    const product = await PrebuiltPC.findById(prebuiltPcId);
    if (product) {
        res.status(200).json(product)
    } else {
        res.status(404);
        throw new Error('Resource not found!')
    }
})

const uploadPrebuiltPCMiddleware = multer({
    storage: multerS3({
      s3: s3,
      bucket: 'computer-makers-products-cpu',
      acl: 'public-read', // or private based on your use case
      key: function (req, file, cb) {
        cb(null, Date.now().toString() + '-' + file.originalname); // unique file name
      },
    }),
});

const uploadImagePrebuiltPc = asyncHandler(async(req,res)=>{
    res.status(200).json({ message: 'Image uploaded successfully', data: req.file.location });
})


export {uploadImagePrebuiltPc, uploadPrebuiltPCMiddleware, createPrebuiltPc, updatePrebuiltPc, getAllPrebuiltPc, getSpecificPrebuiltPc, deleteOnePrebuiltPc};