const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
}

const errorHandler = (err, req, res, next) => {
    //since we are using this middleware to handle errors we want to convert any status code of 200 to 500, that essentially saying that it is an error otherwise set it as statusCode from the response
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;
    console.log(err)

    //Bad object id
    if(err.name === 'CastError' && err.kind === "ObjectId") {
        message = "Resource Not Found";
        statusCode = 404
    }

    res.status(statusCode).json({
        message,
        stack: process.env.NODE_ENV === 'production' ? 'Pancakes!' : err.stack,
    });
}

export {notFound, errorHandler}