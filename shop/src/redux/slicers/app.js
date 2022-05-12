import { createSlice } from "@reduxjs/toolkit";
import tramvay from "../../assets/images/tramvay.jpg"
import tram2 from "../../assets/images/tram2.jpg"

const name = 'APP'

const initialState = {
    bagItems: [],
    itemsList: [
        {
            id: 1,
            image: tramvay,
            name: 'Transportation type: Tramvay',
            description: 'April 11, 2022',
            price: 170,
            count:1,
        },
        {
            id: 2,
            image: tram2,
            name: 'Transportation type: Tramvay',
            description: 'April 11, 2022',
            price: 370.00,
            count:1,
        },
        {
            id: 3,
            image: tramvay,
            name: 'Transportation type: 570Tramvay',
            description: 'April 11, 2022',
            price: 570.00,
            count:1,
        },
    ]
}

const appSlice = createSlice({
    name,
    initialState,
    reducers: {
        setItemsList(state, { payload }) {
            state.itemsList = payload;
        },
        setBagItems(state, { payload }) {
            state.bagItems = payload;
        }
    }
})

export const { setItemsList,setBagItems } = appSlice.actions;

export const selectItems = (state) => state.app.itemsList;
export const selectBagItems = (state) => state.app.bagItems;

export default appSlice.reducer;