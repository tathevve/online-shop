import { createSlice } from "@reduxjs/toolkit";
import tramvay from "../../assets/images/tramvay.jpg"
import tram2 from "../../assets/images/tram2.jpg"
import { nanoid } from "nanoid";

const name = 'APP'

const initialState = {
    bagItems: [],
    itemsList: [
        {
            id: nanoid(),
            image: tramvay,
            name: 'Transportation type: Tramvay',
            description: 'April 11, 2022',
            price: 100,
        },
        {
            id: nanoid(),
            image: tram2,
            name: 'Transportation type: Tramvay',
            description: 'April 11, 2022',
            price: 300.00,
        },
        {
            id: nanoid(),
            image: tramvay,
            name: 'Transportation type: 570Tramvay',
            description: 'April 11, 2022',
            price: 500.00,
        },
    ]
}

const appSlice = createSlice({
    name,
    initialState,
    reducers: {
        addItemToBag(state, { payload: itemId }) {
            const bagItemIndex = state?.bagItems.findIndex((i) => i.id === itemId);

            if (bagItemIndex === -1) {
                state.bagItems = [...state.bagItems, {
                    id:itemId,
                    count:1
                }]
            }else {
                state.bagItems[bagItemIndex].count ++ 
            }
        },
        setItemsList(state, { payload }) {
            state.itemsList = payload;
        },
        setBagItems(state, { payload }) {
            state.bagItems = payload;
        }
    }
})

export const { setItemsList, setBagItems, addItemToBag } = appSlice.actions;

export const selectItems = (state) => state.app.itemsList;
export const selectBagItems = (state) => state.app.bagItems;

export default appSlice.reducer;

