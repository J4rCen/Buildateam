import ProductCard from "../../components/product_card"
import { IProductCard } from "../../interfaces/IProductCard"
import { useSelector } from "react-redux"
import "./catalog.scss"

export interface ICatalog extends IProductCard{
    id: string
}

const Catalog = () => {
    
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const data = useSelector(state => state.product.productData)
    
    return(
        <div className="catalog_div_grid">
            {   
                data.map((data: ICatalog) => {
                   return <ProductCard key={data.id} images={data.images} bodyHtml={data.bodyHtml}/>
                })
            }
        </div>
    )
}

export default Catalog