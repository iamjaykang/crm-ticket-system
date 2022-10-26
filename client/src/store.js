import { configureStore } from "@reduxjs/toolkit";

import replyTicketReducer from './components/UpdateTicket/updateTicketSlice';
import ticketReducer from './pages/TicketList/ticketsSlice';
import signinReducer from './components/Signin/signInSlice';
import userReducer from './pages/Dashboard/userSlice';
import newTicketReducer from './components/NewTicketForm/newTicketSlice';
import userRegistrationReducer from './components/RegistrationForm/userRegistrationSlice';

const store = configureStore({
    reducer: {
        userRegistration: userRegistrationReducer,
        openTicket: newTicketReducer,
        replyTicket: replyTicketReducer,
        tickets: ticketReducer,
        signin: signinReducer,
        user: userReducer,
    },
})

export default store;