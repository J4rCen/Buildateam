import {Column, DataType, Model, Table } from "sequelize-typescript"

interface IshopifyData {
    data: object
}

@Table({
    tableName: 'shopifyProductsData',
    timestamps: false,
    paranoid: true,
})
class shopifyData extends Model<shopifyData, IshopifyData> {

    @Column(DataType.JSONB)
    declare data: object
}

export default shopifyData