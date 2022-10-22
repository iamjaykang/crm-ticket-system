import './index.css';
import DefaultLayout from './layout/DefaultLayout';
import Dashboard from './pages/Dashboard/Dashboard';
import SignInPage from "./pages/SigninPage/SignInPage";

function App() {
  return (
    <div className="text-2xl">
      {/* <SignInPage /> */}
      <DefaultLayout >
        <Dashboard />
        </DefaultLayout>
    </div>
  );
}

export default App;
