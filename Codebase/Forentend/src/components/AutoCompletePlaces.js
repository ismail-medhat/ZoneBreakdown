import React, { useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

const bounds = {
  east: -74.6895,
  north: 42.2736,
  south: 39.6964,
  west: -80.5199,
}; // Coordinates defining the boundary of Pennsylvania

const AutoCompletePlaces = ({
  setCoordinate,
  setName,
  name = "",
  setPlaces,
}) => {
  const [address, setAddress] = useState(name);

  const handleSelect = async (selectedAddress) => {
    const results = await geocodeByAddress(selectedAddress);
    console.log("results Place:", results[0]?.formatted_address);
    const latLng = await getLatLng(results[0]);
    console.log("Selected Place:", latLng);
    setCoordinate(latLng);
    setAddress(results[0]?.formatted_address);
    setName(results[0]?.formatted_address);
    if (setPlaces) {
      setPlaces([
        {
          id: 1,
          name: results[0]?.formatted_address,
          position: latLng,
        },
      ]);
    }
  };

  return (
    <PlacesAutocomplete
      value={address}
      onChange={setAddress}
      onSelect={handleSelect}
      searchOptions={{
        bounds: bounds,
        // types: ["locality", "country"],
      }}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div>
          <input
            className="form-control"
            {...getInputProps({ placeholder: "Search Places" })}
          />
          <div>
            {loading ? <div>Loading...</div> : null}
            {suggestions.map((suggestion) => {
              const style = {
                backgroundColor: suggestion.active ? "#41b6e6" : "#fff",
              };
              return (
                <div {...getSuggestionItemProps(suggestion, { style })}>
                  {suggestion.description}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  );
};

export default AutoCompletePlaces;
