export interface Product {
    id: string | null
    images: string | null
    bodyHtml: string | null        
}

export type ProductDataSlice = {
    productData: Array<Product | null>
}