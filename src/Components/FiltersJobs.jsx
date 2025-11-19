/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useFetch from "../hooks/useFetch";
import { GET_LOCATIONS } from "../constants";

const Dates = [
  { id: 1, name: "View all days" },
  { id: 2, name: "Today" },
  { id: 3, name: "Tomorrow" },
  { id: 4, name: "Custom Date" },
];

const countries = [
  { id: 1, name: "Netherlands" },
  { id: 2, name: "Germany" },
  { id: 3, name: "Belgium" },
];

const regionsByCountry = {
  Netherlands: [
    "Drenthe",
    "Flevoland",
    "Friesland",
    "Gelderland",
    "Groningen",
    "Limburg",
    "Noord-Brabant",
    "Noord-Holland",
    "Zuid-Holland",
    "Overijssel",
    "Utrecht",
    "Zeeland",
  ],
  Germany: [
    "Bavaria",
    "Berlin",
    "Brandenburg",
    "Bremen",
    "Hamburg",
    "Hesse",
    "Lower Saxony",
    "Mecklenburg-Vorpommern",
    "North Rhine-Westphalia",
    "Rhineland-Palatinate",
    "Saarland",
    "Saxony",
    "Saxony-Anhalt",
    "Schleswig-Holstein",
    "Thuringia",
  ],
  Belgium: [
    "Antwerp",
    "East Flanders",
    "Flemish Brabant",
    "Hainaut",
    "Liège",
    "Limburg",
    "Luxembourg",
    "Namur",
    "Walloon Brabant",
    "West Flanders",
    "Brussels",
  ],
};

const initialFilters = {
  sortByPrice: "",
  locations: [],
  dateFilter: "",
  customDate: null,
  stopConditions: [],
};

const FiltersJobs = ({ filters, setFilters }) => {
  const [selectedDate, setSelectedDate] = useState(filters.customDate || null);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [loadingLocations, setLoadingLocations] = useState(false);
  const [locations, setLocations] = useState([]);
  const { fetchData } = useFetch();

  const handleSortChange = (e) => {
    setFilters({ ...filters, sortByPrice: e.target.value });
  };

  const handleDateChange = (dateName) => {
    if (dateName === "Custom Date") {
      setFilters({
        ...filters,
        dateFilter: "custom",
        customDate: selectedDate,
      });
    } else {
      setSelectedDate(null);
      setFilters({
        ...filters,
        dateFilter: dateName.toLowerCase().replace(" ", "-"),
        customDate: null,
      });
    }
  };

  useEffect(() => {
    // On initial render or filter update, figure out which countries are selected based on filters.locations
    const countriesWithSelectedRegions = Object.entries(
      regionsByCountry
    ).reduce((acc, [country, regions]) => {
      const hasSelectedRegion = filters.locations.some((loc) =>
        regions.includes(loc)
      );
      if (hasSelectedRegion) acc.push(country);
      return acc;
    }, []);

    setSelectedCountries(countriesWithSelectedRegions);
  }, []);

  const handleCountryToggle = (countryName, isChecked) => {
    let updatedCountries = [...selectedCountries];
    let updatedLocations = [...filters.locations];

    if (isChecked) {
      updatedCountries.push(countryName);
    } else {
      updatedCountries = updatedCountries.filter((c) => c !== countryName);

      // Remove the country’s regions from selected locations
      const regionsToRemove = regionsByCountry[countryName] || [];
      updatedLocations = updatedLocations.filter(
        (loc) => !regionsToRemove.includes(loc)
      );
    }

    setSelectedCountries(updatedCountries);
    setFilters({ ...filters, locations: updatedLocations });
  };

  const handleRegionChange = (region, isChecked) => {
    const updated = isChecked
      ? [...filters.locations, region]
      : filters.locations.filter((loc) => loc !== region);
    setFilters({ ...filters, locations: updated });
  };

  const resetFilters = () => {
    setFilters(initialFilters);
    setSelectedCountries([]);
    setSelectedDate(null);
  };

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        setLoadingLocations(true);
        const response = await fetchData(GET_LOCATIONS);
        setLocations(
          response.data.data.map((address, index) => ({
            id: index + 1,
            name: address,
          }))
        );
      } catch (error) {
        console.error("Failed to fetch locations:", error);
        setLocations([]);
      } finally {
        setLoadingLocations(false);
      }
    };

    fetchLocations();
  }, []);

  return (
    <div className="max-h-[75vh] overflow-y-auto pr-2">
      {/* Reset Button */}
      <div className="flex justify-end">
        <button
          onClick={resetFilters}
          className="text-sm text-blue-500 hover:text-blue-700"
        >
          Reset Filters
        </button>
      </div>

      {/* Sort By */}
      <div className="w-full">
        <h3 className="font-semibold text-md">Sort By</h3>
        <select
          className="mt-2 w-auto border border-[#EEEEF0] py-3 px-3 rounded-xl"
          value={filters.sortByPrice}
          onChange={handleSortChange}
        >
          <option value="">Select</option>
          <option value="low-to-high">By Price (Low to High)</option>
          <option value="high-to-low">By Price (High to Low)</option>
        </select>
      </div>

      {/* Select Countries */}
      <div className="w-full mt-4">
        <h3 className="font-semibold text-md mb-2">By Country</h3>
        <div className="grid grid-cols-2 gap-2">
          {countries.map((country) => (
            <label
              key={country.id}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedCountries.includes(country.name)}
                onChange={(e) =>
                  handleCountryToggle(country.name, e.target.checked)
                }
                className="h-4 w-4"
              />
              <span className="text-[#92939E] text-md">{country.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Select Regions Based on Selected Countries */}
      {selectedCountries.map((country) => (
        <div key={country} className="w-full mt-4">
          <h3 className="font-semibold text-md mb-2">{country} Regions</h3>
          <div className="grid grid-cols-2 gap-2">
            {regionsByCountry[country].map((region, idx) => (
              <label
                key={idx}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={filters.locations.includes(region)}
                  onChange={(e) => handleRegionChange(region, e.target.checked)}
                  className="h-4 w-4"
                />
                <span className="text-[#92939E] text-md">{region}</span>
              </label>
            ))}
          </div>
        </div>
      ))}

      {/* Date Filter */}
      <div className="w-full mt-4">
        <h3 className="font-semibold text-md mb-2">By Date</h3>
        <div className="grid grid-cols-2 gap-2">
          {Dates.map((item) => (
            <div key={item.id}>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="dateFilter"
                  checked={
                    (item.name === "Custom Date" &&
                      filters.dateFilter === "custom") ||
                    filters.dateFilter ===
                      item.name.toLowerCase().replace(" ", "-")
                  }
                  onChange={() => handleDateChange(item.name)}
                  className="h-4 w-4"
                />
                <span className="text-[#92939E] text-md">{item.name}</span>
              </label>
              {item.name === "Custom Date" &&
                filters.dateFilter === "custom" && (
                  <div className="mt-2 ml-6">
                    <DatePicker
                      selected={selectedDate}
                      onChange={(date) => {
                        setSelectedDate(date);
                        setFilters({ ...filters, customDate: date });
                      }}
                      className="border border-[#EEEEF0] py-2 px-3 rounded-xl"
                      placeholderText="Select date"
                    />
                  </div>
                )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FiltersJobs;
