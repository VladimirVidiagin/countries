import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { MainPage } from "../pages/MainPage/ui/MainPage";
import { Provider } from "react-redux";
import { store } from "./store/store";
import CurrentCountryPage from "../pages/CurrentCountryPage/CurrentCountryPage";
import Header from "../widgets/Header/Header";
import FavoriteCountriesPage from "../pages/FavoriteCountriesPage/FavoriteCountriesPage";
import ViewHistoryPage from "../pages/ViewHistoryPage/ViewHistoryPage";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route
            path="/countries/:countryName"
            element={<CurrentCountryPage />}
          />
          <Route path="/favorites" element={<FavoriteCountriesPage />} />
          <Route path="/history" element={<ViewHistoryPage />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
