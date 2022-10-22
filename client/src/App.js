import "./index.css";
import DefaultLayout from "./layout/DefaultLayout";
import Dashboard from "./pages/Dashboard/Dashboard";
import NewTicket from "./pages/NewTicket/NewTicket";
import SignInPage from "./pages/SigninPage/SignInPage";
import Ticket from "./pages/Ticket/Ticket";
import TicketList from "./pages/TicketList/TicketList";

function App() {
  return (
    <div className="text-2xl">
      {/* <SignInPage /> */}
      <DefaultLayout>
        {/* <Dashboard /> */}
        {/* <NewTicket /> */}
        {/* <TicketList /> */}
        <Ticket />
      </DefaultLayout>
    </div>
  );
}

export default App;
