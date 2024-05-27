import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../../shared/hooks/useTypedSelector";
import { fetchCountries } from "../api/fetchCountries";
import { Country } from "../../../app/store/countries";
import FeedCountryCard from "../../../entities/countries/FeedCountryCard/FeedCountryCard";
import CountriesSortFilterForm from "../../../widgets/CountriesSortFilterForm/CountriesSortFilterForm";
import Loader from "../../../shared/Loader/Loader";
import Pagination from "../../../shared/Pagination/Pagination";

export const MainPage: React.FC = () => {
  const dispatch = useDispatch();

  const { loading, error, countries } = useTypedSelector(
    (state) => state.countries
  );

  const [filteredSortedCountries, setFilteredSortedCountries] = useState<
    Country[]
  >([]);
  const [currentPage, setCurrentPage] = useState(1);

  const CountriesPerPage = 20;
  const indexOfLastCountry = currentPage * CountriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - CountriesPerPage;
  const currentCountries = filteredSortedCountries?.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  );
  const totalPages = Math.ceil(
    filteredSortedCountries?.length / CountriesPerPage
  );

  useEffect(() => {
    fetchCountries(dispatch);
  }, [dispatch]);

  useEffect(() => {
    setFilteredSortedCountries(countries);
  }, [countries]);

  if (loading) {
    return (
      <div className="main-page">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="main-page">
        <p>{error}</p>
      </div>
    );
  }
  return (
    <div className="main-page">
      {countries && (
        <CountriesSortFilterForm
          setFilteredSortedCountries={setFilteredSortedCountries}
          setCurrentPage={setCurrentPage}
        />
      )}
      <main className="main-page__content">
        <div className="main-page__pagination">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(pageNumber: number) => setCurrentPage(pageNumber)}
          />
        </div>
        <ul className="main-page__country-list">
          {currentCountries?.map((country, index) => (
            <FeedCountryCard key={index} country={country} />
          ))}
        </ul>
        <div className="main-page__pagination">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(pageNumber: number) => setCurrentPage(pageNumber)}
          />
        </div>
      </main>
    </div>
  );
};
