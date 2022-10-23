import "./index.css";
import Dashboard from "./pages/Dashboard/Dashboard";
import NewTicket from "./pages/NewTicket/NewTicket";
import SignInPage from "./pages/SigninPage/SignInPage";
import Ticket from "./pages/Ticket/Ticket";
import TicketList from "./pages/TicketList/TicketList";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

function App({ ...rest }) {
  return (
    <div className="text-2xl">
      <Router>
        <Routes>
          <Route exact path="/" element={<SignInPage />} />

          <Route
            exact
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/new-ticket"
            element={
              <PrivateRoute>
                <NewTicket />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/tickets"
            element={
              <PrivateRoute>
                <TicketList />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/ticket/:tId"
            element={
              <PrivateRoute>
                <Ticket />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
