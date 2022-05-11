import { configureStore } from '@reduxjs/toolkit';
import RowsReducer from './Reducers/Rowsreducer';

export default configureStore({
    reducer: {
        rowsReducer: RowsReducer,
    },
});