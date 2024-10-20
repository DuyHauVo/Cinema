import React, { useContext, useState } from "react";
import { styled } from "@mui/material/styles";

import {
  Button,
  TablePagination,
  Modal,
  Typography,
  TextField,
  Box,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  Select,
  MenuItem,
  InputLabel,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  tableCellClasses,
} from "@mui/material";

import { ContextRegions } from "../../../Context/ContextRoom/RegionsContext";
import { ContextLocations } from "../../../Context/ContextRoom/LocationContext";
import Button_Delete from "../../Button_Delete";
import { ContextTheaters } from "../../../Context/TheaterContext";
import { ContextChairs } from "../../../Context/ContextChair/ChairsContext";
import { ContextType_Chairs } from "../../../Context/ContextChair/Type_ChairsContext";
import Gray_ChairImg from "../../../Assets/logo/chairs_start.png";
import "../../../Styles/Room_Admin.css";

function Room() {
  // start mui
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));
  // end mui

  const [open, setOpen] = useState(false);
  const [open_dele, setOpen_dele] = useState(false);
  const [open_designChairs, setOpen_DesignChairs] = useState(false);
  const [numberChairs, setNUmberChairs] = useState([]);
  const [rooms, setRooms] = useState({
    name: "",
    theater: "",
    chairs: "",
  });

  const handleClose_Design_Chairs = () => setOpen_DesignChairs(false);
  const handleClose = () => setOpen(false);
  const handleClose_Dele = () => setOpen_dele(false);
  const handleReset = () => {
    setOpen(true);
  };
  const handleEdit = () => {
    setOpen(true);
  };

  // #region Get Data
  const handleChange = (e) => {
    setRooms({
      ...rooms,
      [e.target.name]: e.target.value,
    });
  };

  // #region Design Chairs
  const handleDesign = () => {
    setOpen_DesignChairs(true);
    const Result = Chairs.sort((a, b) => {
      const regex = /([A-Z]+)(\d+)/; // Tách chữ cái và số
      const [, letterA, numberA] = a.name.match(regex); // Tách cho ghế a
      const [, letterB, numberB] = b.name.match(regex); // Tách cho ghế b
      // So sánh chữ cái trước
      if (letterA === letterB) {
        // Nếu chữ cái giống nhau, so sánh số
        return parseInt(numberA) - parseInt(numberB);
      }
      return letterA.localeCompare(letterB); // So sánh chữ cái
    });
    console.log(Result);
    setNUmberChairs([...Result]);
  };

  // #region Add
  const handleSubmit = async (e) => {};

  //  kết nối với context
  const regions = useContext(ContextRegions);
  const locations = useContext(ContextLocations);
  const Theaters = useContext(ContextTheaters);
  const Chairs = useContext(ContextChairs);
  const type_Chairs = useContext(ContextType_Chairs);

  return (
    <>
      <div className="grid grid-cols-10 gap-5 p-5 ">
        {/* Heading spanning all 3 columns */}
        <h1 className="col-span-2 text-3xl font-bold ">List Rooms</h1>
        <div className="col-span-6 flex justify-around space-x-2 mr-5 ">
          {/* <div className="grid grid-cols-2 gap-3 w-full">
            <InputLabel id="select-label" className="m-auto text-right w-full">
              Chosse Region
            </InputLabel>
            <Select
              value={rooms.region}
              onChange={handleChange}
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
          <div className="grid grid-cols-2 gap-3  w-full">
            <InputLabel id="select-label" className="m-auto text-right w-full">
              Chosse Location
            </InputLabel>
            <Select
              value={rooms.location}
              onChange={handleChange}
              name="location"
              // error={!!errors.region}
              // helperText={errors.region}
            >
              {locations &&
                locations.map((location) => (
                  <MenuItem value={location.id}>{location.adress}</MenuItem>
                ))}
            </Select>
          </div> */}
        </div>

        {/* Button for opening modal */}
        <button
          className="col-span-2 bg-green-500 text-white px-4 py-2 rounded"
          onClick={() => {
            handleReset();
          }}
        >
          ADD ROOMS
        </button>
      </div>
      <div className="p-3 ">
        <TableContainer className="rounded">
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">#</StyledTableCell>
                <StyledTableCell align="center">Name Rooms</StyledTableCell>
                <StyledTableCell align="center">Name Theater</StyledTableCell>
                <StyledTableCell align="center">Img Thearter</StyledTableCell>
                <StyledTableCell align="center">Adress Theater</StyledTableCell>
                <StyledTableCell align="center">Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <StyledTableRow>
                <StyledTableCell align="center">1</StyledTableCell>
                <StyledTableCell align="center">Rạp 1</StyledTableCell>
                <StyledTableCell align="center">Rio</StyledTableCell>
                <StyledTableCell align="center">
                  <div>
                    <img
                      className="w-36 m-auto"
                      src="https://www.shutterstock.com/image-vector/cinema-hall-white-blank-screen-260nw-2469487413.jpg"
                      alt=""
                    />
                  </div>
                </StyledTableCell>
                <StyledTableCell align="center">
                  44 điện biên phủ
                </StyledTableCell>
                <StyledTableCell align="center">
                  <div className="flex justify-center">
                    <div className="mr-2">
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => handleDesign()}
                      >
                        {/* icon design chairs room */}
                        <i class="fa-solid fa-chair p-2"></i>
                      </Button>
                    </div>
                    <div className="mr-2">
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => handleEdit()}
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
                          // setDele(mo);
                        }}
                      >
                        {/* icon delete */}
                        <i class="fa-solid fa-trash p-2"></i>
                      </Button>
                    </div>
                  </div>
                </StyledTableCell>
              </StyledTableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      {/* Start Modal Add */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box component="form" className="style" onSubmit={handleSubmit}>
          <div className="flex justify-between">
            <Typography variant="h6" component="h3">
              {/* {performer.id ? "UPDATE PERFORMER" : "ADD PERFORMERS"} */}
              UPDATE ROOM
            </Typography>
            <Typography
              variant="h7"
              component="h3"
              className="pr-72 text-red-500 font-bold"
            >
              <p className="p-1 bg-yellow-100 px-7 rounded">LIST THEATERS</p>
            </Typography>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <Box className="grid col-span-1 gap-2">
              <TextField
                label="Name Room"
                name="name"
                variant="outlined"
                value={rooms.name}
                onChange={handleChange}
                // error={!!errors.name}
                // helperText={errors.name}
              />
              <InputLabel id="select-label" className="m-auto ">
                Chosse Region
              </InputLabel>
              <Select
                value={rooms.region}
                onChange={handleChange}
                name="region"
                // error={!!errors.region}
                // helperText={errors.region}
              >
                {regions &&
                  regions.map((regi) => (
                    <MenuItem value={regi.id}>{regi.name}</MenuItem>
                  ))}
              </Select>
              <InputLabel id="select-label" className="m-auto ">
                Chosse Locations
              </InputLabel>
              <Select
                value={rooms.region}
                onChange={handleChange}
                name="region"
                // error={!!errors.region}
                // helperText={errors.region}
              >
                {locations &&
                  locations.map((data) => (
                    <MenuItem value={data.id}>{data.district}</MenuItem>
                  ))}
              </Select>
            </Box>
            <Box className="grid col-span-2 overflow-y-auto h-[300px] pr-3">
              <div className=" grid grid-cols-4 gap-4 p-2">
                {Theaters.map((doc) => (
                  <Card sx={{ maxWidth: 200, padding: 0, margin: 0 }}>
                    <CardMedia
                      component="img"
                      sx={{ height: "auto" }}
                      image={doc.imgUrl}
                      alt={doc.name}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {doc.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                      >
                        {doc.adress}
                      </Typography>
                    </CardContent>

                    <CardActions>
                      <div className="m-auto">
                        <Button size="small" color="primary">
                          Choose
                        </Button>
                      </div>
                    </CardActions>
                  </Card>
                ))}
              </div>
            </Box>
          </div>
          <Button type="submit" variant="contained" color="primary">
            {/* {performer.id ? "UPDATE PERFORMER" : "ADD PERFORMERS"} */}
            add room
          </Button>
        </Box>
      </Modal>
      {/* End Modal Add */}

      {/* Start Modal Design Chairs Rooms */}
      <Modal
        open={open_designChairs}
        onClose={handleClose_Design_Chairs}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box component="form" className="style" onSubmit={handleSubmit}>
          <Typography variant="h5" component="h2" gutterBottom>
            {/* {regions.id ? "UPDATE REGION" : "ADD REGION"} */}
            Design Chairs For Room
          </Typography>
          <Box className="grid grid-cols-3 gap-3">
            <Box className="grid col-span-2">
              <div className="flex flex-wrap ">
                <div>
                  <h2 className="text-red-500 text-2xl font-bold text-center pb-3">
                    MÀN HÌNH
                  </h2>
                  <div className="pb-3">
                    <img
                      src="https://www.webstrot.com/html/moviepro/html/images/content/screen.png"
                      alt=""
                    />
                  </div>
                </div>
                {numberChairs.map((doc) => (
                  <div className="p-1 rounded-lg border-gray-300 relative m-auto">
                    <img
                      src={`${Gray_ChairImg}`}
                      alt="seat"
                      className="w-10 h-10 object-cover "
                    />
                    <p className="absolute text-xs text-black top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 pb-1 font-medium">
                      {doc.name}
                    </p>
                  </div>
                ))}
              </div>
            </Box>

            <Box></Box>
          </Box>

          <Button type="submit" variant="contained" color="primary">
            {/* {regions.id ? "UPDATE REGION" : "ADD REGION"} */}
            ADD
          </Button>
        </Box>
      </Modal>
      {/* End Modal Design Chairs Rooms */}
      <Button_Delete
        open_dele={open_dele}
        handleClose_Dele={handleClose_Dele}
        // handleDelete={handleDelete}
      />
    </>
  );
}

export default Room;
