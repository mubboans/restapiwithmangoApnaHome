function sendResponse(res,message,status,statusCode,data){
    // if(err === ""){
    //     return res.status(statusCode).send({message:message,data:data,status:status,success:true})
    // }
    // else{
        return res.status(statusCode).send({message:message,data:data,status:status,success:true})
    // }
}
module.exports = sendResponse