import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';
import axios from 'axios';
import {SearchSuggestionProps} from '../types/types';



const SearchSuggestion: React.FC<SearchSuggestionProps> = ({ placeholder, value, onChange }) => {
  const [suggestions, setSuggestions] = useState([]);
  

  const getSuggestions = async (value: string) => {
    const trimmedValue = value.trim();
    if (trimmedValue.length === 0) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await axios.get(
        `https://atlas.microsoft.com/search/fuzzy/json`,
        {
          params: {
            'api-version': '1.0',
            'subscription-key': '73BID6yU0sTZnxvIeHLhvlOIvEOEuzepgXOLSWjeaNKjPsBBgssbJQQJ99BCACYeBjFWeNo1AAAgAZMP3AOH',
            'query': trimmedValue,
            'limit': 5
          }
        }
      );
      

      const suggestions = response.data.results.map((result: any) => ({
        label: result.address.freeformAddress,
        value: result
      }));

      setSuggestions(suggestions);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSuggestions([]);
    }
  };

  const onSuggestionsFetchRequested = ({ value }: { value: string }) => {
    getSuggestions(value);
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const getSuggestionValue = (suggestion: any) => suggestion.label;

  const renderSuggestion = (suggestion: any) => (
    <div className="suggestion-item">
      {suggestion.label}
    </div>
  );

  const handleChange = (event: React.FormEvent<HTMLElement>, { newValue }: Autosuggest.ChangeEvent) => {
    onChange(newValue);
  };

  const inputProps = {
    placeholder: placeholder || 'Search for a location',
    value,
    onChange: handleChange,
    className: 'w-full pl-10 pr-4 py-2 bg-gray-800 rounded-lg focus:ring-2 focus:ring-gray-600 outline-none'
  };

  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
      theme={{
        container: 'relative',
        suggestionsContainer: 'absolute z-10 bg-gray-800 text-white rounded-lg shadow-lg mt-1',
        suggestion: 'p-2 cursor-pointer hover:bg-gray-700',
        suggestionHighlighted: 'bg-gray-700'
      }}
    />
  );
};

export default SearchSuggestion;