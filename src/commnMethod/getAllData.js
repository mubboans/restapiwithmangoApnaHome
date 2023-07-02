async function getAllData(model) {

    try {
        let data = await model.find();
        data=data.reverse();
            return [data,null];
    } catch (error) {
        return [null,error];
    }    
}
module.exports = getAllData;