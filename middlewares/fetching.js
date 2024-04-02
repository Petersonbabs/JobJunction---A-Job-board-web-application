const fetch = async (req, model, criteria, populate, secondPopulate, thirdPopulate) =>{

    const pageSize =  +req.query.limit || 10 
    const currentPage = +req.query.pageNum || 1
    
    

    try {

        let numOfDocs = criteria ? await model.find(criteria).countDocuments() : await model.find().estimatedDocumentCount()

        const data = await model.find(criteria).sort({ createdAt: -1 }).skip(pageSize * (currentPage - 1)).limit(pageSize).populate(populate).populate(secondPopulate).populate(thirdPopulate)
        

        if(!data) {
            console.log("not found")
            return null
        }


        const pages = Math.ceil(numOfDocs / pageSize)

        let prevPage;
        let nextPage;

        if(currentPage != 1){
            prevPage = currentPage - 1 
        }

        if(currentPage != pages){
            nextPage = currentPage + 1
        }
        return {data, currentPage, pageSize, numOfDocs, pages, prevPage, nextPage}

        
    } catch (error) {
        console.log(error)
    }
}

module.exports = fetch