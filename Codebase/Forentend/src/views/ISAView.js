import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import GoogleMaps from "../components/GoogleMap";
import AutoCompletePlaces from "../components/AutoCompletePlaces";
import { BASE_URL } from "../config";

function ISAView() {
  const [load, setLoad] = useState(false);
  const [counties, setCounties] = useState([]);
  const [originCounties, setOriginCounties] = useState([]);
  const [places, setPlaces] = useState([]);
  const [originPlaces, setOriginPlaces] = useState([]);
  const [name, setName] = useState("");
  const [coordinate, setCoordinate] = useState(null);

  useEffect(() => {
    console.log(coordinate);
    if (coordinate) {
      const oldPlaces = [...originPlaces];
      oldPlaces.push({
        id: -1,
        name: name,
        position: coordinate,
      });
      setPlaces(oldPlaces);
    }
  }, [coordinate]);

  useEffect(() => {
    if (name.length > 0) {
      const filterAddress = counties?.filter((county) =>
        county?.name?.toLowerCase()?.includes(name.toLowerCase())
      );
      setCounties(filterAddress);
      if (filterAddress?.length > 0) {
        toast.success(`Your address ${name} exist`);
      } else {
        toast.error(`Your address ${name} dosen't exist`);
      }
    } else {
      setCounties(originCounties);
    }
  }, [name]);

  const resetSearch = () => {
    setName("");
    setCounties(originCounties);
    window.location.reload();
  };

  useEffect(() => {
    axios
      .get(`https://zonebreakdown.000webhostapp.com/getAllCounties.php`)
      .then((res) => {
        setCounties(res.data);
        setOriginCounties(res.data);
        let fullPlaces = [];
        res?.data?.forEach((place) => {
          fullPlaces.push({
            id: place?.ID,
            name: place?.name,
            position: {
              lat: parseFloat(place?.lat),
              lng: parseFloat(place?.lng),
            },
            zone: place?.zoneName,
          });
        });
        setPlaces(fullPlaces);
        setOriginPlaces(fullPlaces);
        setLoad(true);
      })
      .catch((err) => {
        setLoad(true);
        console.log("err ==> ", err);
      });
  }, []);

  return (
    <div className="container-fluid bg-primary p-3 justify-content-center align-items-center">
      {load && (
        <div className="row align-items-start">
          <div
            style={{ height: "608px" }}
            className="col-7 bg-white rounded p-3"
          >
            <GoogleMaps places={places} />
          </div>
          <div className="col-5">
            <div className=" bg-white rounded p-3">
              <div className="m-2">
                <div className="row align-items-center justify-content-space-between p-2">
                  <h6 className="col-9" htmlFor="search">
                    Search on Counties
                  </h6>
                  <button
                    onClick={(e) => resetSearch()}
                    className="col-3 btn btn-danger"
                  >
                    Reset Search
                  </button>
                </div>

                <AutoCompletePlaces
                  setCoordinate={setCoordinate}
                  setName={setName}
                  name={name}
                />
              </div>
              <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Zip/Code</th>
                    <th>Zone Name</th>
                  </tr>
                </thead>
                <tbody>
                  {counties?.map((county, i) => (
                    <tr key={county?.ID}>
                      <td>{county?.name}</td>
                      <td>{county?.zipcode}</td>
                      <td>{county?.zoneName}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ISAView;
