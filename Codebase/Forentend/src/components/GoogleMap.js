import React, { Fragment, useState } from "react";

import {
  GoogleMap,
  InfoWindowF,
  MarkerF,
  useLoadScript,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "520px",
};

const center = {
  lat: 41.2033,
  lng: -77.1945,
}; // Coordinates for the center of Pennsylvania

const bounds = {
  east: -74.6895,
  north: 42.2736,
  south: 39.6964,
  west: -80.5199,
}; // Coordinates defining the boundary of Pennsylvania

const GoogleMaps = ({ places=[] }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAH82XtWoXIcRBAgBgj_wzk5PE0-T50TNU",
  });
  const [activeMarker, setActiveMarker] = useState(null);

  const markers = [
    {
      id: 1,
      name: "Qobustan",
      position: { lat: 41.2033216, lng: -77.1945247 },
    },
    {
      id: 2,
      name: "Sumqayit",
      position: { lat: 42.12922409999999, lng: -80.085059 },
    },
    {
      id: 3,
      name: "Baku",
      position: { lat: 40.4940037, lng: -80.2590849 },
    },
  ];

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  return (
    <Fragment>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={7}
          options={{
            restriction: {
            //   latLngBounds: bounds,
              strictBounds: false,
            },
          }}
        >
          {places?.map(({ id, name, position }) => (
            <MarkerF
              key={id}
              position={position}
              onClick={() => handleActiveMarker(id)}
              // icon={{
              //   url:"https://t4.ftcdn.net/jpg/02/85/33/21/360_F_285332150_qyJdRevcRDaqVluZrUp8ee4H2KezU9CA.jpg",
              //   scaledSize: { width: 50, height: 50 }
              // }}
            >
              {activeMarker === id ? (
                <InfoWindowF onCloseClick={() => setActiveMarker(null)}>
                  <div>
                    <p>{name}</p>
                  </div>
                </InfoWindowF>
              ) : null}
            </MarkerF>
          ))}
        </GoogleMap>
      )}
    </Fragment>
  );
};

export default GoogleMaps;
