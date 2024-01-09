import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import GoogleMaps from "../components/GoogleMap";



function AgentView() {
  const [counties, setCounties] = useState([]);
  const [originCounties, setOriginCounties] = useState([]);
  const [places, setPlaces] = useState([]);
  const [zones, setZones] = useState("");
  const [load, setLoad] = useState(false);

  const getCountiesByZone = async (zoneId) => {
    setCounties(originCounties?.filter((c) => c.zone_id == zoneId));
  };

  useEffect(() => {
    axios
      .get("http://localhost:8081/counties")
      .then((res) => {
        setOriginCounties(res.data);
        let fullPlaces = [];
        res?.data?.forEach((place) => {
          fullPlaces.push({
            id: place?.ID,
            name: place?.name,
            position: { lat: place?.lat, lng: place?.lng },
          });
        });
        setPlaces(fullPlaces);
      })
      .catch((err) => console.log(err));

    axios
      .get("http://localhost:8081/counties-zone")
      .then((res) => {
        setZones(res.data);
        setLoad(true);
        console.log("Zone Counties :: ", res.data);
      })
      .catch((err) => setLoad(true));
  }, []);

  return (
    <div className="container-fluid bg-primary p-3 justify-content-center align-items-center">
      <div className="row align-items-start">
        <div style={{ height: "608px" }} className="col-6 bg-white rounded p-3">
        <GoogleMaps places={places} />
        </div>
        {load && (
          <div className="col-6">
            <div className=" row bg-white rounded p-1">
              {zones?.map(
                (z) =>
                  z.counties != null && (
                    <div
                      key={z.ID}
                      className="card m-2 "
                      style={{ width: "47%" }}
                    >
                      <div className="card-body">
                        <h5 className="card-title text-center">{z.name}</h5>
                        <button href="#" className="btn btn-primary">
                          Select Zone
                        </button>
                        <button
                          onClick={(e) => getCountiesByZone(z?.ID)}
                          className="btn btn-success mx-2"
                        >
                          View Zone
                        </button>
                      </div>
                    </div>
                  )
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AgentView;
