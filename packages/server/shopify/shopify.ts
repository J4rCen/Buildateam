import { createAdminApiClient } from "@shopify/admin-api-client"
import query from "./query"
import dotenv from "dotenv"
import * as proces from "process"

dotenv.config({path: '../../.env'})

const {
    URL_SHOP,
    TOKEN
} = proces.env


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