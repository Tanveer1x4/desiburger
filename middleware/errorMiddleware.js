const errorMiddleware = (err,req,res,next)=>{
    err.message = err.message || "Internal Server Error";
    err.statusCode = err.statusCode || 500;
    res.status(err.statusCode).json({
        success:false,
        message:err.message,
    });
};
module.exports = errorMiddleware;

const asyncError = (passedfunction)=>(req,res,next)=>{
    Promise.resolve(passedfunction(req,res,next)).catch(next);

};
module.exports = asyncError;