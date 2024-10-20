import React, { useState, useContext } from "react";
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
import Button_Delete from "../Button_Delete";
import { ContextRegions } from "../../Context/ContextRoom/RegionsContext";
import { ContextLocations } from "../../Context/ContextRoom/LocationContext";
import {
  addDocument,
  deleteDocument,
  updateDocument,
} from "../../Services/Service_Firebase";
import { ContextTheaters } from "../../Context/TheaterContext";
import logo from "../../Assets/logo/logo_theater.png";

function Theater(props) {
  const style = {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    width: "650px",
    margin: "auto",
    marginTop: 5,
    bgcolor: "background.paper",
    p: 2,
  };

  const [open, setOpen] = useState(false);
  const [open_dele, setOpen_dele] = useState(false);
  const [previewImg, setPreviewImg] = useState(null);
  const [imgUpload, setImgUpload] = useState(null);
  const [dele, setDele] = useState(null);
  const [errors, setErrors] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");
  const [theaters, setTheaters] = useState({
    name: "",
    adress: "",
    district: "",
  });

  const regions = useContext(ContextRegions);
  const locations = useContext(ContextLocations);
  const listTheaters = useContext(ContextTheaters);
  const handleClose = () => setOpen(false);
  const handleClose_Dele = () => setOpen_dele(false);

  const handleChange = async (e) => {
    setTheaters({
      ...theaters,
      [e.target.name]: e.target.value,
    });
  };
  // #region ADD
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!Validation()) {
        return;
      }
      if (theaters.id) {
        const { id, ...newObjectWithoutId } = theaters;
        await updateDocument(
          "theaters",
          theaters.id,
          newObjectWithoutId,
          imgUpload,
          theaters.imgUrl
        );
      } else {
        await addDocument("theaters", theaters, imgUpload);
      }
    } catch (error) {
      console.log(error);
    }
    setOpen(false);
    setTheaters({});
    setPreviewImg(null);
  };

  // #region GET IMG
  const handleChangeImage = (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      const render = new FileReader();
      render.onload = () => {
        setPreviewImg(render.result);
      };
      render.readAsDataURL(selectedImage);
      setImgUpload(selectedImage);
    } else {
      setPreviewImg(null);
      setImgUpload(null);
    }
  };

  //#region DELETE
  const handleDelete = async () => {
    // console.log(dele.id);
    try {
      await deleteDocument("theaters", dele.id);
    } catch (error) {
      console.log(error);
    }
    setOpen_dele(false);
  };

  // #region VALIDATION
  const Validation = () => {
    const NewError = {};
    NewError.name = theaters.name ? "" : "Please enter name";
    NewError.adress = theaters.adress ? "" : "Please enter the address";
    NewError.district = theaters.district ? "" : "Please select district";
    setErrors(NewError);
    return !NewError.name && !NewError.adress && !NewError.district;
  };

  // #region FIND LOCA NAME
  const getFindLocation = (id) => {
    const newLocation = locations.find((newloca) => newloca.id === id);
    return newLocation ? newLocation.district : null;
  };
  // console.log(listTheaters);
  const getThearterRegion = (id) => {
    return locations.filter((doc) => doc.region === id);
  };
  const fillterTheater = listTheaters.filter((doc) => {
    const isSearchMatch =
      doc.adress.toLowerCase().includes(search.toLocaleLowerCase()) ||
      doc.name.toLowerCase().includes(search.toLocaleLowerCase());

    const regionTheaters = region ? getThearterRegion(region) : listTheaters;

    const isRegionMatch = regionTheaters.some(
      (regionTheater) => regionTheater.id === doc.id
    );
    console.log(isRegionMatch, " ", isSearchMatch);
    return isSearchMatch || isRegionMatch;
  });

  const handleEdit = (theate) => {
    setOpen(true);
    setTheaters(theate);
    setPreviewImg(theate.imgUrl);
    setErrors({});
  };
  const handleReset = () => {
    setOpen(true);
    setTheaters({});
    setPreviewImg(null);
  };
  return (
    <>
      <div className="grid grid-cols-12 gap-3 p-5">
        {/* Heading spanning all 3 columns */}
        <h1 className="col-span-2 text-3xl font-bold">List Theater</h1>

        {/* Form with text input and button */}
        <form action="" className="col-span-4 flex items-center space-x-2 mr-5">
          <input
            type="text"
            className="border border-gray-300 rounded px-4 py-2 w-full"
            placeholder="Search theater"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="bg-blue-500 text-white px-5 py-2 rounded">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </form>

        <div className="col-span-4 flex justify-between space-x-2 mx-auto w-full ">
          <InputLabel id="select-label" className="m-auto text-right w-full">
            Chosse Region
          </InputLabel>
          <Select
            className="w-full"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            name="region"
            // error={!!errors.region}
            // helperText={errors.region}
          >
            {regions &&
              regions.map((region) => (
                <MenuItem value={region.id}>{region.name}</MenuItem>
              ))}
          </Select>
        </div>

        {/* Button for opening modal */}
        <button
          className="col-span-2 bg-green-500 text-white px-4 py-2 rounded"
          onClick={() => {
            handleReset();
          }}
        >
          ADD THEATERS
        </button>
      </div>
      <TableContainer sx={{ padding: 2 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                #
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Name
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Image
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Adress
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
            {fillterTheater
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) //(start,end)
              .map((theate, index) => (
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="center">{theate.name}</TableCell>
                  <TableCell align="center">
                    <img
                      className="w-36 h-auto m-auto"
                      src={theate.imgUrl}
                      alt=""
                    />
                  </TableCell>
                  <TableCell align="center">{theate.adress}</TableCell>
                  <TableCell align="center">
                    {getFindLocation(theate.district)}
                  </TableCell>
                  <TableCell align="center">
                    <div className="flex justify-center">
                      <div className="mr-2">
                        <Button
                          variant="contained"
                          color="success"
                          onClick={() => {
                            handleEdit(theate);
                          }}
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
                            setDele(theate);
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
          rowsPerPageOptions={[3, 6, 9]}
          component="div"
          count={listTheaters.length}
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
            {/* {regions.id ? "UPDATE REGION" : "ADD REGION"} */}
            add theater
          </Typography>
          <Box className="grid grid-cols-3 gap-3">
            <Box className="grid col-span-2 gap-2">
              <TextField
                label="Name"
                name="name"
                variant="outlined"
                value={theaters.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name}
              />
              <TextField
                label="Adress"
                name="adress"
                variant="outlined"
                value={theaters.adress}
                onChange={handleChange}
                error={!!errors.adress}
                helperText={errors.adress}
              />
              <InputLabel id="select-label" className="text-center w-full">
                Chosse Region
              </InputLabel>
              <Select
                value={theaters.district}
                onChange={handleChange}
                name="district"
                error={!!errors.district}
                helperText={errors.district}
              >
                {regions &&
                  regions.map((region) => (
                    <MenuItem value={region.id}>{region.name}</MenuItem>
                  ))}
              </Select>
              <InputLabel id="select-label" className="text-center w-full">
                Chosse Location
              </InputLabel>
              <Select
                value={theaters.district}
                onChange={handleChange}
                name="district"
                error={!!errors.district}
                helperText={errors.district}
              >
                {locations &&
                  locations.map((loca) => (
                    <MenuItem value={loca.id}>{loca.district}</MenuItem>
                  ))}
              </Select>
            </Box>
            <Box>
              <div className="mb-2 text-lg font-semibold pb-1">
                <label htmlFor="img">Choose Image District</label>
              </div>
              <div>
                <input type="file" onChange={handleChangeImage} />
              </div>
              <div className="w-48 h-auto mt-2">
                <img src={`${previewImg ? previewImg : logo}`} alt="" />
              </div>
            </Box>
          </Box>

          <Button type="submit" variant="contained" color="primary">
            {/* {regions.id ? "UPDATE REGION" : "ADD REGION"} */}
            add theater
          </Button>
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

export default Theater;
