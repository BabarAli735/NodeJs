module.exports= (err,req,res,next)=>{
    err.statusCode=err.statusCode||500
    err.statusCode=err.status||'error'
    res.status(err.status).json({
      status:err.status,
      message:err.message
    })
  }