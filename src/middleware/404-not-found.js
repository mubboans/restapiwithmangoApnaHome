const notFound = (req,res)=>{
    let responsed = {
        message:"Route you looking for does't exists",
        status:'failed',
        success:false,
    }
    res.status(404).send(responsed)
}
module.exports = notFound