import shopifyDBControllers from "./controllers/shopifyDBControllers"

async function dataRecording(data: object) {

  Object.values(data['shop'].products.edges).map(el => {
    let {id, bodyHtml, images} = el['node']
    bodyHtml = bodyHtml.match(/^(.*)/i)

    const dataJson = {id: id, bodyHtml: bodyHtml[0], images: images['nodes'][0].src}

    shopifyDBControllers.setData(dataJson)
  })
  
}

export default dataRecording