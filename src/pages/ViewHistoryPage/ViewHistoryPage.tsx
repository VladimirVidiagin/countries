import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { CountriesActionTypes } from "../../app/store/countries";
import PageTitle from "../../shared/PageTitle/PageTitle";
import LinksList from "../../entities/LinksList/LinksList";
import Button from "../../shared/Button/Button";

const ViewHistoryPage: React.FC = () => {
  const dispatch = useDispatch();

  const [viewedCountries, setViewedCountries] = useState([]);

  useEffect(() => {
    const storedViewedCountries = localStorage.getItem("viewHistory");
    if (storedViewedCountries) {
      const viewedCountriesArray = JSON.parse(storedViewedCountries);
      setViewedCountries(viewedCountriesArray);
    }
  }, []);

  const clearHistory = () => {
    localStorage.removeItem("viewHistory");
    dispatch({
      type: CountriesActionTypes.CLEAR_ALL_VIEWED_COUNTRIES_HISTORY,
    });
    setViewedCountries([]);
  };

  return (
    <main className="view-history-page">
      <PageTitle
        title={
          viewedCountries.length > 0
            ? "View History"
            : "No countries viewed yet"
        }
      />
      {viewedCountries.length > 0 && (
        <LinksList list={viewedCountries} url="/countries/" />
      )}
      <Button onClick={clearHistory}>Clear All</Button>
    </main>
  );
};

export default ViewHistoryPage;
