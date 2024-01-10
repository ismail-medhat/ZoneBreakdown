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
  setZipcode
}) => {
  const [address, setAddress] = useState(name);

  const handleSelect = async (selectedAddress) => {
    const results = await geocodeByAddress(selectedAddress);
    const lat = results[0]?.geometry?.location.lat();
    const lng = results[0]?.geometry?.location.lng();
    const latLng = { lat: lat, lng: lng };
    const address = results[0]?.formatted_address;
    let postCode = "";
    await results[0]?.address_components?.forEach((addressObj) => {
      if (addressObj?.types[0] == "postal_code") {
        postCode = addressObj?.short_name;
      }
    });
    console.log("results latLng:", latLng);
    console.log("results address:", address);
    setCoordinate(latLng);
    setAddress(address);
    setName(address);
    if(setZipcode){
      setZipcode(postCode);
    }
   
    if (setPlaces) {
      setPlaces([
        {
          id: 1,
          name: address,
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
                <div
                  key={suggestion.description}
                  {...getSuggestionItemProps(suggestion, { style })}
                >
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
