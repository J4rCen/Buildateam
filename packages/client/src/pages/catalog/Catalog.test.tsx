import "@testing-library/jest-dom"
import {cleanup, render} from "@testing-library/react"
import Catalog from "./Catalog"
import { ICatalog } from "./Catalog"
import { Provider, useSelector } from "react-redux"
import { store } from "../../store/store"

const selector = {useSelector}

describe("Page 'Catalog", () => {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
    let data: Array<ICatalog>

    afterEach(cleanup)

    beforeEach(() => {
        data  = [{
            id: "1",
            images: 'https://img.freepik.com/free-photo/morskie-oko-in-tatry_1204-510.jpg?w=1060&t=st=1706777927~exp=1706778527~hmac=5023fd6d9644c8c4259ab5d6792cb4b7370902c64afcfad95f950c577676383b',
            bodyHtml: 'test text'
        },
        {
            id: "2",
            images: 'https://img.freepik.com/free-photo/morskie-oko-in-tatry_1204-510.jpg?w=1060&t=st=1706777927~exp=1706778527~hmac=5023fd6d9644c8c4259ab5d6792cb4b7370902c64afcfad95f950c577676383b',
            bodyHtml: 'test text'
        }]
    })

    it('render with an empty store', () => {

        jest.spyOn(selector, 'useSelector').mockReturnValue({})

        const component = render(<Provider store={store}><Catalog/></Provider>)
        
        expect(component)
    })

    it('render with filled store', () => {

        jest.spyOn(selector, 'useSelector').mockReturnValue(data)

        const component = render(<Provider store={store}><Catalog/></Provider>)
        
        expect(component)
    })
})