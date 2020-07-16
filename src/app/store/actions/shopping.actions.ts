import { Action } from '@ngrx/store';
import { ShoppingItem, DeliveryMode } from '../models/shopping.model';

export enum ShoppingActionTypes {
    ADD_ITEM = "[SHOPPING] Add Item",
    DELETE_ITEM = "[SHOPPING] Delete Item",
    CHANGE_QUANTITY = "[SHOPPING] Change quantity",
    CLEAR_CART = "[SHOPPING] clear Cart",
    CHECKOUT_CART = "[SHOPPING] checkout cart",
    CHANGE_SHOPPING_MODE = "[SHOPPING] Change shopping mode",
}

export class AddItemAction implements Action {
    readonly type = ShoppingActionTypes.ADD_ITEM;
    constructor(public payload: ShoppingItem) { }
}
export class DeleteItemAction implements Action {
    readonly type = ShoppingActionTypes.DELETE_ITEM;
    constructor(public id: string) { }
}
export class ChangeQuantityAction implements Action {
    readonly type = ShoppingActionTypes.CHANGE_QUANTITY;
    constructor(public id: string, public changeAmount: number) { }
}

export class ClearCartAction implements Action {
    readonly type = ShoppingActionTypes.CLEAR_CART;
    constructor() { }
}
export class CheckOutCartAction implements Action {
    readonly type = ShoppingActionTypes.CHECKOUT_CART;
    constructor(public payload, public accessToken) { }
}
export class ChangeShoppingMode implements Action {
    readonly type = ShoppingActionTypes.CHANGE_SHOPPING_MODE;
    constructor(public mode: DeliveryMode) { }
}
export type ShoppingAction = AddItemAction | DeleteItemAction | ChangeQuantityAction | ClearCartAction | CheckOutCartAction | ChangeShoppingMode