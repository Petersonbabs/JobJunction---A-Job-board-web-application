const fetch = async (req, model, criteria) =>{

    const pageSize = 10
    const currentPage = +req.query.pageNum || 1
    

    try {

        let numOfDocs = criteria ? await model.find(criteria).countDocuments() : await model.find().estimatedDocumentCount()

        const data = await model.find(criteria).sort({ createdAt: -1 }).skip(pageSize * (currentPage - 1)).limit(pageSize)

        if(!data) {
            return null
        }


        const pages = Math.ceil(numOfDocs / pageSize)

        return {data, currentPage, pageSize, numOfDocs, pages}
        
    } catch (error) {
        console.log(error)
        next(error)
    }
}

module.exports = fetch