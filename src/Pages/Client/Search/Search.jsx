import React, { useContext, useState } from "react";
import { ContextRegions } from "../../../Context/ContextRoom/RegionsContext";
import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import { ContextLocations } from "../../../Context/ContextRoom/LocationContext";
import { ContextTheaters } from "../../../Context/TheaterContext";
import { ContextMovies } from "../../../Context/MoviesContext";
import { listObjectById } from "../../../Services/Repository";
function Search(props) {
  const listRegion = useContext(ContextRegions);
  const listLocation = useContext(ContextLocations);
  const listTheater = useContext(ContextTheaters);
  const listMovie = useContext(ContextMovies);
  const [regi, setReGi] = useState("");
  const [local, setLocal] = useState("");
  return (
    <div className="grid grid-cols-3 gap-3 p-5">
      <div className="cols-span-1">
        <FormControl className="w-full">
          <InputLabel id="select-label" className="m-auto w-full">
            Chosse Regions
          </InputLabel>

          <Select
            label="Chosse Regions"
            labelId="select-label"
            onChange={(e) => setReGi(e.target.value)}
            name="district"
          >
            {listRegion &&
              listRegion.map((data) => (
                <MenuItem value={data.id}>{data.name}</MenuItem>
              ))}
          </Select>
        </FormControl>
      </div>
      <div className="cols-span-1 ">
        <FormControl className="w-full">
          <InputLabel id="select-label" className="m-auto w-full">
            Chosse Locations
          </InputLabel>
          <Select
            label="Chosse Locations"
            labelId="select-label"
            onChange={(e) => setLocal(e.target.value)}
            name="district"
          >
            {listLocation &&
              listObjectById(regi, listLocation, "region").map((data) => (
                <MenuItem value={data.id}>{data.district}</MenuItem>
              ))}
          </Select>
        </FormControl>
      </div>
      <div className="cols-span-1 ">
        <FormControl className="w-full">
          <InputLabel id="select-label" className="m-auto w-full">
            Chosse Theaters
          </InputLabel>
          <Select
            // onChange={handleChange}
            name="district"
            label="Chosse Theaters"
            labelId="select-label"
          >
            {listTheater &&
              listObjectById(local, listTheater, "district").map((data) => (
                <MenuItem value={data.id}>{data.name}</MenuItem>
              ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
}

export default Search;
