import { configureStore } from "@reduxjs/toolkit";

import ticketReducer from './pages/TicketList/ticketsSlice';

const store = configureStore({
    reducer: {
        tickets: ticketReducer,
    },
})

export default store;