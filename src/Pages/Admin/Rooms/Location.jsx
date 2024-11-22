import React, { useContext, useState } from "react";
import {
  Button,
  TablePagination,
  Modal,
  Paper,
  Typography,
  TextField,
  Box,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  tableCellClasses,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import Button_Delete from "../../Button_Delete";
import { ContextRegions } from "../../../Context/ContextRoom/RegionsContext";
import {
  addDocument,
  deleteDocument,
  updateDocument,
} from "../../../Services/Service_Firebase";
import { ContextLocations } from "../../../Context/ContextRoom/LocationContext";

function Location(props) {
  const [open, setOpen] = useState(false);
  const [open_dele, setOpen_dele] = useState(false);
  const [errors, setErrors] = useState("");
  const [dele, setDele] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const [locations, setLocations] = useState({
    district: "",
    region: "",
  });

  const handleClose = () => setOpen(false);
  const handleClose_Dele = () => setOpen_dele(false);

  //   kết nối với context
  const regions = useContext(ContextRegions);
  const listLocation = useContext(ContextLocations);

  //   #region lấy dữ liệu
  const handleChange = async (e) => {
    setLocations({
      ...locations,
      [e.target.name]: e.target.value,
    });
  };
  // #region add
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!Validation()) {
        return;
      }
      if (locations.id) {
        const { id, ...newObjectWithoutId } = locations;
        await updateDocument("locations", locations.id, newObjectWithoutId);
      } else {
        await addDocument("locations", locations);
      }
    } catch (error) {
      console.log(error);
    }
    setOpen(false);
    setLocations({});
  };

  // #region delete
  const handleDelete = async () => {
    try {
      await deleteDocument("locations", dele.id);
    } catch (error) {
      console.log(error);
    }
  };
  // #region handleedit
  const handleEdit = (location) => {
    setOpen(true);
    setLocations(location);
    setErrors({});
  };

  const handleReset = () => {
    setOpen(true);
    setLocations({});
  };

  //#region   validation
  const Validation = () => {
    const NewError = {};
    NewError.district = locations.district ? "" : "Please enter district";
    NewError.region = locations.region ? "" : "Please choose region";
    setErrors(NewError);
    return !NewError.district && !NewError.region;
  };

  // #region search
  const filterLoaction = listLocation.filter(
    (loca) =>
      loca.district.toLowerCase().includes(search.toLocaleLowerCase()) ||
      loca.region.toLowerCase().includes(search.toLocaleLowerCase())
  );

  const getRegionName = (id) => {
    const findName = regions.find((data) => data.id === id);
    return findName ? findName.name : "";
  };

  const style = {
    flexDirection: "column",
    gap: 2,
    width: "400px",
    margin: "auto",
    marginTop: 5,
    bgcolor: "background.paper",
    p: 4,
  };
  return (
    <>
      <div className="grid grid-cols-10 gap-5 px-3 pt-1 ">
        {/* Heading spanning all 3 columns */}
        <h1 className="col-span-3 text-3xl font-bold ">List Locations</h1>

        {/* Form with text input and button */}
        <form action="" className="col-span-5 flex items-center space-x-2 mr-5">
          <input
            type="text"
            className="border border-gray-300 rounded px-4 py-2 w-full"
            placeholder="Search Locations"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="bg-blue-500 text-white px-5 py-2 rounded">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </form>

        {/* Button for opening modal */}
        <button
          className="col-span-2 bg-green-500 text-white px-4 py-2 rounded"
          onClick={() => {
            handleReset();
          }}
        >
          ADD LOCATIONS
        </button>
      </div>
      <TableContainer   sx={{ padding: 1 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                #
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Region
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                District
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filterLoaction
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((location, index) => (
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">
                    {page * rowsPerPage + index + 1}
                  </TableCell>
                  <TableCell align="center">
                    {getRegionName(location.region)}
                  </TableCell>
                  <TableCell align="center">{location.district}</TableCell>
                  <TableCell align="center">
                    <div className="flex justify-center">
                      <div className="mr-2">
                        <Button
                          variant="contained"
                          color="success"
                          onClick={() => handleEdit(location)}
                        >
                          {/* icon edit */}
                          <i class="fa-solid fa-pen-to-square p-2"></i>
                        </Button>
                      </div>
                      <div className="">
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => {
                            setOpen_dele(true);
                            setDele(location);
                          }}
                        >
                          {/* icon delete */}
                          <i class="fa-solid fa-trash p-2"></i>
                        </Button>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[4, 8, 16]}
          component="div"
          count={listLocation.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(event, newPage) => setPage(newPage)}
          onRowsPerPageChange={(event) => {
            setRowsPerPage(parseInt(event.target.value, 10));
            setPage(0);
          }}
        />
      </TableContainer>
      {/* Start Modal Add */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box component="form" sx={style} onSubmit={handleSubmit}>
          <Typography variant="h5" component="h2" gutterBottom>
            {locations.id ? "UPDATE LOCATION" : "ADD LOCATION"}
          </Typography>
          <Box className=" grid grid-cols-1 gap-2">
            <InputLabel id="select-label" className="m-auto ">
              Chosse Region
            </InputLabel>
            <Select
              value={locations.region}
              onChange={handleChange}
              name="region"
              error={!!errors.region}
              helperText={errors.region}
            >
              {regions &&
                regions.map((region) => (
                  <MenuItem value={region.id}>{region.name}</MenuItem>
                ))}
            </Select>
            <TextField
              label="District"
              name="district"
              variant="outlined"
              value={locations.district}
              onChange={handleChange}
              error={!!errors.district}
              helperText={errors.district}
            />

            <Button type="submit" variant="contained" color="primary">
              {locations.id ? "UPDATE LOCATION" : "ADD LOCATION"}
            </Button>
          </Box>
        </Box>
      </Modal>
      {/* End Modal Add */}

      {/* Button delete */}
      <Button_Delete
        open_dele={open_dele}
        handleClose_Dele={handleClose_Dele}
        handleDelete={handleDelete}
      />
    </>
  );
}

export default Location;
