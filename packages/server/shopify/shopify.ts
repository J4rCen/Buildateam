import { createAdminApiClient } from "@shopify/admin-api-client"
import query from "./query"

const URL_SHOP = 'https://cpb-new-developer.myshopify.com/admin/api/2024-01/graphql.json'
const TOKEN = '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'


async function connectionShopify() {
    const client = createAdminApiClient({
        storeDomain: URL_SHOP,
        apiVersion: '2024-01',
        accessToken: TOKEN
    })

    const {data} = await client.request(query);

    return data
}

export default connectionShopify