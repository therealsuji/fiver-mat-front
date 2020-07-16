import { ShoppingItem, ShoppingCart, DeliveryMode } from '../models/shopping.model';
import { ShoppingAction, ShoppingActionTypes } from '../actions/shopping.actions';

const initialState: ShoppingCart = {
    currentBrandId: null,
    shoppingMode: DeliveryMode.DELIVERY,
    addItemStatus: null,
    cartItems: []
}

export function ShoppingReducer(state: ShoppingCart = initialState, action: ShoppingAction) {
    const mutableState: ShoppingCart = { ...state };
    switch (action.type) {
        case ShoppingActionTypes.ADD_ITEM:
            const mutableCart: ShoppingItem[] = [...state.cartItems];
            for (const [i, item] of mutableCart.entries()) {
                if (item.brand_id != action.payload.brand_id) {
                    mutableState.addItemStatus = false;
                    return mutableState;
                }
                if (item.master_id == action.payload.master_id) {
                    console.log('same product found');
                    const newItem = { ...item };
                    newItem.count += action.payload.count;
                    mutableCart[i] = newItem;
                    mutableState.cartItems = mutableCart;
                    mutableState.addItemStatus = true;
                    return mutableState;
                }
            }
            mutableState.currentBrandId = action.payload.brand_id;
            mutableState.addItemStatus = true;
            mutableState.cartItems = [...mutableState.cartItems, action.payload];
            return mutableState;
        case ShoppingActionTypes.DELETE_ITEM:
            mutableState.cartItems = mutableState.cartItems.filter(item => item.master_id != action.id);
            return mutableState;
        case ShoppingActionTypes.CHANGE_QUANTITY:
            mutableState.cartItems = mutableState.cartItems.map((val) => {
                const newItem = { ...val };
                if (newItem.master_id == action.id && (newItem.count != 1 || action.changeAmount != -1) && (newItem.count != 999)) {
                    newItem.count += action.changeAmount
                }
                return newItem;
            });
            return mutableState;
        case ShoppingActionTypes.CLEAR_CART:
            return initialState;
        case ShoppingActionTypes.CHANGE_SHOPPING_MODE:
            mutableState.shoppingMode = action.mode;
            return mutableState;
        default:
            return state;

    }
}
