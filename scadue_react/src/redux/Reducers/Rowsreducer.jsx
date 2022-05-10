import { createSlice } from "@reduxjs/toolkit";

const rowsSlice = createSlice({
    name: 'rows',
    initialState: {
        rows: []
    },
    reducers: {
        addRows: (state, newValue) => {
            state.rows = newValue.payload
        },
        removeRows: (state) => {
            state.rows = []
        },
    },
});

export const { addRows, removeRows } = rowsSlice.actions;

export default rowsSlice.reducer;