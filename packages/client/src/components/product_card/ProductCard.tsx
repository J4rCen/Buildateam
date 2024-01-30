import { useEffect, useRef } from "react";
import { IProductCard } from "../../interfaces/IProductCard";
import "./ProductCard.scss"

const ProductCard = (props: IProductCard) => {

    const canvasRef = useRef<HTMLCanvasElement>(null)

    const image = new Image()
    image.src = props.images
    
    useEffect(() => {
        const ctx = canvasRef.current?.getContext('2d')
        ctx?.clearRect(0, 0, 300, 200)

        ctx?.drawImage(image, 50, 10, 200, 200)
    })

    return(
        <div className="div_productCard">
            <canvas ref={canvasRef} width={300} height={200} />
            <div className="div_info_product" dangerouslySetInnerHTML={{ __html: props.bodyHtml}} />
        </div>
    )
}

export default ProductCard;

