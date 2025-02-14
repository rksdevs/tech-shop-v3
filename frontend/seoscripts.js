const fs = require("fs");

const urls = [
"https://computermakers.in/",
"https://computermakers.in/login",
"https://computermakers.in/register",
"https://computermakers.in/cart",
"https://computermakers.in/prebuilt-pc",
"https://computermakers.in/contactus",
"https://computermakers.in/aboutus",
"https://computermakers.in/forgotPassword",
"https://computermakers.in/allOffers",
"https://computermakers.in/myaccount",
"https://computermakers.in/myorders",
"https://computermakers.in/checkout",
"https://computermakers.in/productCard",
"https://computermakers.in/allproducts",
"https://computermakers.in/buildcustompc",
];

const baseUrl = "https://computermakers.in";

const generateXmlSitemap = (urls) => {
  const urlset = urls.map((url) => {
    return `
    <url>
      <loc>${url}</loc>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlset.join("\n")}
</urlset>`;
};

// Generate and save sitemap.xml
const sitemap = generateXmlSitemap(urls);
fs.writeFileSync("./public/sitemap.xml", sitemap, "utf8");
console.log("Sitemap.xml generated!");
