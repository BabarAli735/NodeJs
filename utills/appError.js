class AppError extends Error{
    constructor(messege,statusCode){
        super(messege)
        this.statusCode=statusCode;
        this.status=`${statusCode}`.startsWith(4)?'fail':'error';
        this.isOperational=true;

    }
    
}

exports.module=AppError