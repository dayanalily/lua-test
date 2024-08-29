import React, { useState, useEffect, ChangeEvent, FocusEvent } from "react";
import { fetchData } from "../data/mockData";
import "../styles/AutoComplete.css";

interface AutoCompleteProps {
  placeholder?: string;
  onSelect?: (selectedItem: string) => void;
}

interface AutoCompleteResult {
  items: string[];
  loading: boolean;
}

const AutoComplete: React.FC<AutoCompleteProps> = ({ placeholder, onSelect }) => {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<AutoCompleteResult>({
    items: [],
    loading: false,
  });
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(true);

  useEffect(() => {
    if (query.length > 0) {
      setResults({ items: [], loading: true });
      fetchData(query).then((data) =>
        setResults({ items: data, loading: false })
      );
    } else {
      setResults({ items: [], loading: false });
    }
  }, [query]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    setIsDropdownVisible(true);
  };

  const handleSelect = (item: string) => {
    setQuery(item);
    setIsDropdownVisible(false);
    if (onSelect) {
      onSelect(item);
    }
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    setTimeout(() => {
      setIsDropdownVisible(false);
    }, 200);
  };

  const highlightMatch = (text: string) => {
    const regex = new RegExp(`(${query})`, "gi");
    return {
      __html: text.replace(regex, "<mark>$1</mark>"),
    };
  };

  return (
    <div className="autocomplete-container">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        className="autocomplete-input"
      />
      {results.loading && <div className="loading">Loading...</div>}
      {!results.loading && results.items.length === 0 && query.length > 0 && (
        <div className="no-matches">No matches found</div>
      )}
      {isDropdownVisible && results.items.length > 0 && (
        <ul className="autocomplete-list">
          {results.items.map((item, index) => (
            <li
              key={index}
              className="autocomplete-item"
              dangerouslySetInnerHTML={highlightMatch(item)}
              onClick={() => handleSelect(item)} 
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutoComplete;
