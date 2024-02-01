import '@testing-library/jest-dom'
import {render, cleanup} from "@testing-library/react"
import "jest-canvas-mock"
import ProductCard from "./ProductCard"
import { IProductCard } from '../../interfaces/IProductCard'

describe("Component 'ProductCard'", () => {
    let data: IProductCard;

    afterEach(cleanup)

    beforeEach(() => {
        data = {
            images: 'https://img.freepik.com/free-photo/morskie-oko-in-tatry_1204-510.jpg?w=1060&t=st=1706777927~exp=1706778527~hmac=5023fd6d9644c8c4259ab5d6792cb4b7370902c64afcfad95f950c577676383b',
            bodyHtml: 'test text'
        }
    })

    it("render", () => {
        const screen = render(<ProductCard images={data.images} bodyHtml={data.bodyHtml}/>)
        screen.container.getElementsByClassName('div_productCard')
    })
})