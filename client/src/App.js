import './index.css';
import DefaultLayout from './layout/DefaultLayout';
import SignInPage from "./pages/SigninPage/SignInPage";

function App() {
  return (
    <div className="text-2xl">
      {/* <SignInPage /> */}
      <DefaultLayout >
        dashboard
        </DefaultLayout>
    </div>
  );
}

export default App;
