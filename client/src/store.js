import { configureStore } from "@reduxjs/toolkit";

import replyTicketReducer from './components/UpdateTicket/updateTicketSlice';
import ticketReducer from './pages/TicketList/ticketsSlice';
import signinReducer from './components/Signin/signInSlice';
import userReducer from './pages/Dashboard/userSlice';
import newTicketReducer from './components/NewTicketForm/newTicketSlice';
import userRegistrationReducer from './components/RegistrationForm/userRegistrationSlice';
import userVerificationReducer from './components/UserVerification/userVerificationSlice'
import passwordResetReducer from './components/PasswordResetForm/passwordResetSlice';
import adminSigninReducer from  './components/AdminSignin/adminSigninSlice';

const store = configureStore({
    reducer: {
        password: passwordResetReducer,
        userVerification: userVerificationReducer,
        userRegistration: userRegistrationReducer,
        openTicket: newTicketReducer,
        replyTicket: replyTicketReducer,
        tickets: ticketReducer,
        signin: signinReducer,
        user: userReducer,
        adminSignin: adminSigninReducer,
    },
})

export default store;