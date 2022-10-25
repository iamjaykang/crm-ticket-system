import { configureStore } from "@reduxjs/toolkit";

import ticketReducer from './pages/TicketList/ticketsSlice';
import signinReducer from './components/Signin/signInSlice';
import userReducer from './pages/Dashboard/userSlice';

const store = configureStore({
    reducer: {
        tickets: ticketReducer,
        signin: signinReducer,
        user: userReducer,
    },
})

export default store;