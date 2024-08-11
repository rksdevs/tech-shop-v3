**E-Commerce Website Specialy Tailored For Computer Needs Version - 2**

**Site is live on Render** -- Pending

**Stack & Library Details**

*Stack* - 
 
 Javascript is the heart and brain of this project - built using MERN stack - MongoDb, Express Js, React Js (functional components), Node Js.

*Libraries* - 
  1. Frontend UI - Shadcn UI + Tailwind css
  2. Backend - Mongoose, Express Js, JWT, crypto, multer, cookie-parser, razorpay
  3. Frontend - React Js, RTK (React Redux & Redux toolkit), React-Router-Dom, React-Toastify, React-Icons etc   

**To Build this on your local machine:**
1. Make sure to have Node js installed on your system
2. Clone the repo
3. Go into the folder and install the dependency node modules - npm i/npm install
4. Go into the frontend folder and install the dependency node modules - npm i/npm install
5. Copy the sample env file and create a new .env file with the contents of this sample env
6. From the root folder - run command - npm run dev

**Feature lists and their status**
1. Basic e-commerce process - Add to cart > Proceed to checkout > Add shipping address > Select Payment method > Place order --- At this point order is created and saved in the user profile. The users can view the order details from the profile page - **Completed**
2. Payment Gateway Integration - (2 Entry points - one from regular checkout process listed above, another from profile details order > details page)On Pay Now CTA - Payment through Razorpay API - **Completed**
3. Payment Gateway Features -- Payment Success/Failure - notifications to customer, payment refunds -- **Pending**
4. Shipping Features -- Admin can mark an order to Delivered -- **Completed**
5. Shipping Features -- Add shippment tracking number/waybill number to order, notification on item shipped or delivered -- **Pending**
6. Admin Features -- Add/Delete/Update Products, Users, Orders -- **Completed**
7. Custom PC Building Feature -- Configure own pc parts, select from available items, delete, edit items from the list, add all to cart -- **Completed**
8. Nav bar with Category selection, pages with category wise products to display -- **Pending**
9. Sorting, Filtering, Searching Products on Products page, on Custom PC Building Page -- **Pending**
10. Update Stock on Order Placement/Order Payment -- ~~**Pending -- Important**~~ **Completed**
12. Code refractoring - Check and apply DRY principles, check for memory leaks, apply memoization where needed -- **Pending**
13. Write Unit Test -- **Pending** 
