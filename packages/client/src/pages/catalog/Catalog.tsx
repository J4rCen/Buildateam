import ProductCard from "../../components/product_card"
import { IProductCard } from "../../interfaces/IProductCard"
import { useSelector } from "react-redux"
import "./catalog.scss"

export interface ICatalog extends IProductCard{
    id: string
}

const Catalog = () => {

    const product: Array<React.ReactNode> = []
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const data = useSelector(state => state.product.productData)
    console.log(data)
    data.map((data: ICatalog) => {
        product.push(<ProductCard key={data.id} images={data.images} bodyHtml={data.bodyHtml}/>)
    })

    return(
        <div className="catalog_div_grid">
            {product}
        </div>
    )
}

export default Catalog