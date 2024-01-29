import ProductCard from "../../components/product_card"
import { IProductCard } from "../../interfaces/IProductCard"
import "./catalog.scss"

interface ICatalog{
    dataProduct: Array<IProductCard>
}

const Catalog = (props: ICatalog) => {

    const product: Array<React.ReactNode> = []
    props.dataProduct.map((data, index) => {
        product.push(<ProductCard key={index} images={data.images} bodyHtml={data.bodyHtml}/>)
    })

    return(
        <div className="catalog_div_grid">
            {product}
        </div>
    )
}

export default Catalog