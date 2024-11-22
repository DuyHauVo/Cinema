import React, { useContext } from "react";
import { ContextRegions } from "../../../Context/ContextRoom/RegionsContext";
import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import { ContextLocations } from "../../../Context/ContextRoom/LocationContext";
import { ContextTheaters } from "../../../Context/TheaterContext";
import { ContextMovies } from "../../../Context/MoviesContext";

function Search(props) {
  const listRegion = useContext(ContextRegions);
  const listLocation = useContext(ContextLocations);
  const listTheater = useContext(ContextTheaters);
  const listMovie = useContext(ContextMovies);
  return (
    <div className="grid grid-cols-4 gap-3 p-5">
      <div className="cols-span-1">
        <FormControl className="w-full">
          <InputLabel id="select-label" className="m-auto w-full">
            Chosse Regions
          </InputLabel>
          <Select
            // onChange={handleChange}
            // value={rooms.district}
            name="district"
            // error={!!errors.district}
            // helperText={errors.district}
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
            Chosse Regions
          </InputLabel>
          <Select
            // onChange={handleChange}
            // value={rooms.district}
            name="district"
            // error={!!errors.district}
            // helperText={errors.district}
          >
            {listLocation &&
              listLocation.map((data) => (
                <MenuItem value={data.id}>{data.district}</MenuItem>
              ))}
          </Select>
        </FormControl>
      </div>
      <div className="cols-span-1 ">
        <FormControl className="w-full">
          <InputLabel id="select-label" className="m-auto w-full">
            Chosse Regions
          </InputLabel>
          <Select
            // onChange={handleChange}
            // value={rooms.district}
            name="district"
            // error={!!errors.district}
            // helperText={errors.district}
          >
            {listTheater &&
              listTheater.map((data) => (
                <MenuItem value={data.id}>{data.name}</MenuItem>
              ))}
          </Select>
        </FormControl>
      </div>
      <div className="cols-span-1 ">
        <FormControl className="w-full">
          <InputLabel id="select-label" className="m-auto w-full">
            Chosse Regions
          </InputLabel>
          <Select
            // onChange={handleChange}
            // value={rooms.district}
            name="district"
            // error={!!errors.district}
            // helperText={errors.district}
          >
            {listMovie &&
              listMovie.map((data) => (
                <MenuItem value={data.id}>{data.name}</MenuItem>
              ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
}

export default Search;
