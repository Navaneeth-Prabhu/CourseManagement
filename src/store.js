import { configureStore } from '@reduxjs/toolkit';
// import counterReducer from '../features/counter/counterSlice';
// import colorReducer from '../features/counter/colorSlice';
// import todoReducer from '../features/counter/todoSlice';

export const store = configureStore({
  reducer: {
    // counter: counterReducer,
    // color: colorReducer,
    // todo: todoReducer,
  },
});
