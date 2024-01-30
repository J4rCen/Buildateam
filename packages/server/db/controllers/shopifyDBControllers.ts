import shopifyData from "../models/shopyfiData.model"

class shopifyDBControllers {
    setData = (data: object) => {
        try {

            return shopifyData.create({data})
            
        } catch (error) {
            console.error(error)
        }
    }

    getData = () => {
        try {

            return shopifyData.findAll()
            
        } catch (error) {
            console.error(error)
        }
    }
}

export default new shopifyDBControllers()