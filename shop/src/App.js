import './App.css';
import { Provider as StoreProvider } from "react-redux";
import store from "./redux/index";
import { BrowserRouter } from "react-router-dom"
import Routes from './components/Routes';


function App() {
  return (
    <div className="App">
      <StoreProvider store={store}>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </StoreProvider>
    </div>
  );
}

export default App;
