import mongoose from "mongoose";
import dotenv from 'dotenv';
import colors from 'colors';
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import connectToDb from "./config/db.js";
import slugify from "slugify";
import fs from "fs";

dotenv.config();

connectToDb();

// const importData = async () => {
//     try {
//         await Order.deleteMany();
//         await Product.deleteMany();
//         await User.deleteMany();

//         const createdUsers = await User.insertMany(users);

//         const adminUser = createdUsers[0]._id;

//         const sampleProducts = products.map((product)=>{
//             return {...product, user: adminUser}
//         })

//         await Product.insertMany(sampleProducts);
//         console.log('Data Imported'.green.inverse);
//         process.exit();
//     } catch (error) {
//         console.log(`${error}`.red.inverse);
//         process.exit(1);
//     }
// }

// const destroyData = async () => {
//     try {
//         await Order.deleteMany();
//         await Product.deleteMany();
//         await User.deleteMany();
//         console.log('Data Destroyed'.green.inverse);
//         process.exit();
//     } catch (error) {
//         console.log(`${error}`.red.inverse);
//         process.exit(1);
//     }
// }

// if (process.argv[2]=== "-d") {
//     destroyData();
// } else {
//     importData();
// }

(async ()=> {
    const products = await Product.find({})
    let counter = 1;
    // for (let product of products) {
    //     if (!product.slug) {
    //         console.log(product?.name)
    //         if(product.description == "") {
    //             product.description = product.name;
    //         }
    //         if(product.sku == "") {
    //             product.sku = product.name.trim().substring(0,10);
    //         }
    //         product.slug = slugify(product.name, {lower: true, strict: true});
    //         await product.save();
    //     }
    //     counter ++
    //     console.log(counter);

    // }
    let productList = [];
    for (let product of products) {
        productList.push({slug: product?.slug});
        counter ++;
        console.log(counter);
    }
    //productlist
    const baseUrl = "https://computermakers.in";

    const urls = [`<url>
      <loc>https://computermakers.in/</loc>
      <changefreq>daily</changefreq>
      <priority>1.0</priority>
    </url>`, `<url>
      <loc>https://computermakers.in/login</loc>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>`, `<url>
      <loc>https://computermakers.in/register</loc>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>`, `<url>
      <loc>https://computermakers.in/cart</loc>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>`, `<url>
      <loc>https://computermakers.in/prebuilt-pc</loc>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>`, `<url>
      <loc>https://computermakers.in/contactus</loc>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>`, `<url>
      <loc>https://computermakers.in/aboutus</loc>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>`, `<url>
      <loc>https://computermakers.in/forgotPassword</loc>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>`, `<url>
      <loc>https://computermakers.in/allOffers</loc>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>`, `<url>
      <loc>https://computermakers.in/myaccount</loc>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>`, `<url>
      <loc>https://computermakers.in/myorders</loc>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>`, `<url>
      <loc>https://computermakers.in/checkout</loc>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>`, `<url>
      <loc>https://computermakers.in/productCard</loc>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>`, `<url>
      <loc>https://computermakers.in/allproducts</loc>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>`, `<url>
      <loc>https://computermakers.in/buildcustompc</loc>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>`];

    productList.forEach((product) => {
        urls.push(`
        <url>
            <loc>${baseUrl}/product/${product.slug}</loc>
            <changefreq>weekly</changefreq>
            <priority>0.9</priority>
        </url>
        `);
    });
    
    const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls.join("\n")}
    </urlset>`;
    fs.writeFileSync("./frontend/public/sitemap.xml", sitemapContent, "utf8");
    console.log("task completed");
})();
