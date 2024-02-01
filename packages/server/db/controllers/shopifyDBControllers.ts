import shopifyData from "../models/shopyfiData.model"

class shopifyDBControllers {
    setData = (data: any) => {
        try {

            return shopifyData.create({data})
            
        } catch (error) {
            console.error(error)
        }
    }

    getData = async () => {
        try {

            return await shopifyData.findAll({raw: true, attributes: ['data']})
            
        } catch (error) {
            console.error(error)
        }
    }
}

export default new shopifyDBControllers()