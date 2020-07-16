export interface ShoppingItem {
    pname: string,
    iname: string,
    master_id: string,
    brand_id: string,
    text: string,
    count: number,
    unit_price: number,
    image: string,
}
export interface ShoppingCart {
    shoppingMode: DeliveryMode,
    currentBrandId: string,
    addItemStatus: boolean,
    cartItems: ShoppingItem[]
}

export enum DeliveryMode {
    DELIVERY,
    STORE_PICKUP,
}