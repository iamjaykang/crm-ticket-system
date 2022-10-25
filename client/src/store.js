import { configureStore } from "@reduxjs/toolkit";

import ticketReducer from './pages/TicketList/ticketsSlice';
import signinReducer from './components/Signin/signInSlice';

const store = configureStore({
    reducer: {
        tickets: ticketReducer,
        signin: signinReducer,
    },
})

export default store;