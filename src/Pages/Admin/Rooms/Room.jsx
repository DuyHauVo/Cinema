import React, { useContext, useEffect, useState } from "react";
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
  FormControl,
  tableCellClasses,
} from "@mui/material";

import { ContextRegions } from "../../../Context/ContextRoom/RegionsContext";
import { ContextLocations } from "../../../Context/ContextRoom/LocationContext";
import Button_Delete from "../../Button_Delete";
import { ContextTheaters } from "../../../Context/TheaterContext";
import { ContextChairs } from "../../../Context/ContextChair/ChairsContext";
import { ContextType_Chairs } from "../../../Context/ContextChair/Type_ChairsContext";
import Blue_ChairImg from "../../../Assets/logo/chairs_end.png";
import Vip_ChairImg from "../../../Assets/logo/seat-vip.png";
import Couple_ChairImg from "../../../Assets/logo/seat-couple.png";

import "../../../Styles/Room_Admin.css";
import {
  addDocument,
  deleteDocument,
  updateDocument,
} from "../../../Services/Service_Firebase";
import { ContextRooms } from "../../../Context/ContextRoom/RoomContext";

const inter = {
  name: "",
  theater: "",
  chairs: [],
  region: "",
  district: "",
};
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
  const [open_viewChairs, setOpen_ViewChairs] = useState(false);
  const [numberChairs, setNUmberChairs] = useState([]);
  const [rooms, setRooms] = useState(inter);
  const [filterLocal, setFilterLocal] = useState([]);
  const [listTea, setListTea] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [item_Chairs, setItem_Chairs] = useState([]);
  const [listItem_Chairs_Show, setListItem_Chairs_Show] = useState([]);
  const [dele, setDele] = useState("");
  const [errors, setErrors] = useState("");
  const [search, setSearch] = useState("");

  const handleClose_Design_Chairs = () => setOpen_DesignChairs(false);
  const handleClose = () => setOpen(false);
  const handleClose_Dele = () => setOpen_dele(false);
  const handleClose_View_Chairs = () => setOpen_ViewChairs(false);

  const handleReset = () => {
    setOpen(true);
    setRooms("");
    setListTea([]);
    setItem_Chairs([]);
    setFilterLocal([]);
  };
  const handleEdit = (room) => {
    setOpen(true);
    setItem_Chairs(room.chairs);
    setRooms(room);
  };

  // #region Conmext context
  const regions = useContext(ContextRegions);
  const locations = useContext(ContextLocations);
  const Theaters = useContext(ContextTheaters);
  const Chairs = useContext(ContextChairs);
  const ListRooms = useContext(ContextRooms);

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
    setNUmberChairs([...Result]);
  };

  // #region Add
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!validation()) {
        return;
      }
      rooms.chairs = item_Chairs;
      if (rooms.id) {
        const { id, ...newObjectWithoutId } = rooms;
        await updateDocument("rooms", rooms.id, newObjectWithoutId);
      } else {
        await addDocument("rooms", rooms);
      }
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };
  //#region Delete
  const handleDelete = async () => {
    try {
      await deleteDocument("rooms", dele.id);
    } catch (error) {
      console.log(error);
    }
  };

  // #region Validation
  const validation = () => {
    const NewError = {};
    NewError.name = rooms.name ? "" : "Please enter name";
    NewError.region = rooms.region ? "" : "Please choose region";
    NewError.district = rooms.district ? "" : "Please choose district";
    NewError.theater = rooms.theater ? "" : "Please choose theater";
    NewError.chairs = item_Chairs.length > 0 ? "" : "Please design chairs";
    setErrors(NewError);

    // Kiểm tra xem có lỗi nào không
    return !Object.values(NewError).some((error) => error);
  };

  // #region Search
  const filteredRooms = ListRooms.filter(
    (doc) =>
      doc &&
      ((doc.name && doc.name.toLowerCase().includes(search.toLowerCase())) ||
        (doc.theater &&
          doc.theater.toLowerCase().includes(search.toLowerCase())) ||
        (doc.district &&
          doc.district.toLowerCase().includes(search.toLowerCase())))
  );

  //#region Chose and show theater
  useEffect(() => {
    const local = locations?.filter((a) => a.region === rooms.region);
    setFilterLocal(local);
  }, [rooms.region]);
  useEffect(() => {
    const tea = Theaters.filter((a) => a.district === rooms.district);
    setListTea(tea);
  }, [rooms.district]);

  // #region Choose theater
  const chooseTheater = (id) => {
    if (rooms.theater == id) {
      setRooms({ ...rooms, theater: "" });
    } else {
      setRooms({ ...rooms, theater: id });
    }
  };

  // #region Get theater
  const getnameTheater = (id) => {
    const newnametheater = Theaters.find((newtheater) => newtheater.id === id);
    return newnametheater ? newnametheater.name : null;
  };
  const getImgTheater = (id) => {
    const newimgtheater = Theaters.find((newtheater) => newtheater.id === id);
    return newimgtheater ? newimgtheater.imgUrl : null;
  };
  const getdistrictTheater = (id) => {
    const newdistricttheater = Theaters.find(
      (newtheater) => newtheater.id === id
    );
    return newdistricttheater ? newdistricttheater.adress : null;
  };
  const getlocalTheater = (id) => {
    const newdistricttheater = Theaters.find(
      (newtheater) => newtheater.id === id
    );
    const newdistrictthea = locations.find(
      (newlocal) => newlocal.id === newdistricttheater.district
    );
    const newregion = regions.find(
      (newregi) => newregi.id === newdistrictthea.region
    );
    return newdistrictthea && newregion
      ? `${newdistrictthea.district} - ${newregion.name}`
      : null;
  };

  // #region Choose chairs
  const handleChooseChairs = (doc) => {
    const check = item_Chairs.find((a) => a === doc.id);
    if (check) {
      const newChairs = item_Chairs.filter((a) => a !== doc.id);
      setItem_Chairs(newChairs);
    } else {
      setItem_Chairs([...item_Chairs, doc.id]);
    }
  };
  const checkChair = (id) => {
    return item_Chairs.find((a) => a === id);
  };

  const getchairs = (id) => {
    return listItem_Chairs_Show.find((e) => e === id);
  };
  return (
    <>
      <div className="grid grid-cols-10 gap-5 p-5 ">
        {/* Heading spanning all 3 columns */}
        <h1 className="col-span-3 text-3xl font-bold ">List Rooms</h1>
        <form action="" className="col-span-5 flex items-center space-x-2 mr-5">
          <input
            type="text"
            className="border border-gray-300 rounded px-4 py-2 w-full"
            placeholder="Search Regions"
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
          ADD ROOMS
        </button>
      </div>
      <div className="p-3 ">
        <TableContainer className="rounded ">
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">#</StyledTableCell>
                <StyledTableCell align="center">Name Rooms</StyledTableCell>
                <StyledTableCell align="center">Name Theater</StyledTableCell>
                <StyledTableCell align="center">Img Thearter</StyledTableCell>
                <StyledTableCell align="center">Adress Theater</StyledTableCell>
                <StyledTableCell align="center">
                  Location Theater
                </StyledTableCell>
                <StyledTableCell align="center">Action</StyledTableCell>
              </TableRow>
            </TableHead>
            {filteredRooms
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((room, index) => (
                <TableBody>
                  <StyledTableRow>
                    <StyledTableCell align="center">
                      {page * rowsPerPage + index + 1}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {room.name}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {getnameTheater(room.theater)}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <div>
                        <img
                          className="w-36 m-auto"
                          src={getImgTheater(room.theater)}
                          alt=""
                        />
                      </div>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {getdistrictTheater(room.theater)}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {getlocalTheater(room.theater)}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <div className="flex justify-center">
                        <div className="mr-2">
                          <Button
                            variant="outlined"
                            color="secondary"
                            onClick={() => {
                              setListItem_Chairs_Show(room.chairs);
                              setOpen_ViewChairs(true);
                            }}
                          >
                            {/* icon design chairs room */}
                            <i class="fa-solid fa-chair p-2"></i>
                          </Button>
                        </div>
                        <div className="mr-2">
                          <Button
                            variant="contained"
                            color="success"
                            onClick={() => handleEdit(room)}
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
                              setDele(room);
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
              ))}
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            rowsPerPage={rowsPerPage}
            page={page}
            component="div"
            count={ListRooms.length}
            onPageChange={(e, newpage) => setPage(newpage)}
            onRowsPerPageChange={(e) => {
              setRowsPerPage(parseInt(e.target.value), 10);
              setPage(0);
            }}
          />
        </TableContainer>
      </div>
      {/* Start Modal Add */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box component="form" className="style_room" onSubmit={handleSubmit}>
          <div className="flex justify-between">
            <Typography variant="h6" component="h3">
              {rooms.id ? "UPDATE ROOMS" : "ADD ROOMS"}
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
                error={!!errors.name}
                helperText={errors.name}
              />

              <FormControl fullWidth variant="outlined" margin="normal">
                <InputLabel id="select-label" className="m-auto">
                  Chosse Region
                </InputLabel>
                <Select
                  label="Chosse Region"
                  labelId="select-label"
                  value={rooms.region}
                  name="region"
                  onChange={handleChange}
                  error={!!errors.region}
                  helperText={errors.region}
                >
                  {regions &&
                    regions.map((regi) => (
                      <MenuItem value={regi.id}>{regi.name}</MenuItem>
                    ))}
                </Select>
              </FormControl>

              <FormControl fullWidth variant="outlined" margin="normal">
                <InputLabel id="select-label" className="m-auto ">
                  Chosse Locations
                </InputLabel>
                <Select
                  label="Chosse Locations"
                  labelId="select-label"
                  onChange={handleChange}
                  value={rooms.district}
                  name="district"
                  error={!!errors.district}
                  helperText={errors.district}
                >
                  {filterLocal &&
                    filterLocal.map((data) => (
                      <MenuItem value={data.id}>{data.district}</MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Box>
            <Box className="grid col-span-2  pr-3">
              <div className="flex gap-4 p-2">
                {listTea.map((doc) => (
                  <Card
                    sx={{
                      boxShadow:
                        rooms.theater === doc.id
                          ? "0px 5px 15px rgba(0, 0, 0, 0.35)"
                          : "",
                      transition: "box-shadow 0.3s ease-in-out", // Optional: smooth transition
                    }}
                  >
                    <CardMedia
                      component="img"
                      sx={{ height: "100px" }}
                      image={doc.imgUrl}
                      alt={doc.name}
                    />
                    <CardContent onClick={() => chooseTheater(doc.id)}>
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
                  </Card>
                ))}
              </div>
            </Box>
          </div>
          <div className="flex w-full gap-2">
            <Button
              className="w-1/2"
              type="submit"
              variant="contained"
              color="primary"
            >
              {rooms.id ? "UPDATE ROOMS" : "ADD ROOMS"}
            </Button>
            <div className="w-1/2 relative">
              <Button
                onClick={() => handleDesign()}
                className="w-1/2"
                variant="contained"
                color="primary"
                fullWidth
              >
                Design Chairs
              </Button>
              {errors && (
                <p className="text-red-600 absolute left-1/2 transform -translate-x-1/2">
                  {errors.chairs}
                </p>
              )}
            </div>
          </div>
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
        <Box component="form" className="style3">
          <Typography variant="h5" component="h2" gutterBottom>
            Design Chairs For Room
          </Typography>
          <Box className="grid grid-cols-3">
            <Box className="grid col-span-2 overflow-y-auto h-[400px]">
              <div className="flex flex-wrap">
                <div>
                  <h2 className="text-red-500 text-xl font-bold text-center pb-3">
                    MÀN HÌNH
                  </h2>
                  <div className="pb-3 ">
                    <img
                      className="w-3/4 h-auto m-auto"
                      src="https://www.webstrot.com/html/moviepro/html/images/content/screen.png"
                      alt=""
                    />
                  </div>
                </div>
                {numberChairs.map((doc) => (
                  <div
                    className="p-1 rounded-lg border-gray-300 relative m-auto"
                    onClick={() => handleChooseChairs(doc)}
                  >
                    <img
                      src={doc.imgUrl}
                      alt="seat"
                      className={`w-10 h-10 object-cover ${
                        checkChair(doc.id) ? "opacity-100" : "opacity-20"
                      }`}
                    />
                    <p className="absolute text-xs text-black top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 pb-1 font-medium">
                      {doc.name}
                    </p>
                  </div>
                ))}
              </div>
            </Box>

            <Box className=" grid col-span-1 justify-center items-center">
              <div className="pb-3 flex w-14 h-auto">
                <img src={`${Blue_ChairImg}`} alt="" />
                <p className="px-3 whitespace-nowrap my-auto">Ghế Thường</p>
              </div>
              <div className="pb-3 flex w-14 h-auto">
                <img src={`${Vip_ChairImg}`} alt="" />
                <p className="px-3 whitespace-nowrap my-auto">Ghế Vip</p>
              </div>
              <div className="pb-3 flex w-14 h-auto">
                <img src={`${Couple_ChairImg}`} alt="" />
                <p className="px-3 whitespace-nowrap my-auto">Ghế Couple</p>
              </div>
            </Box>
          </Box>

          <Button
            onClick={() => setOpen_DesignChairs(false)}
            variant="contained"
            color="primary"
          >
            Finish
          </Button>
        </Box>
      </Modal>
      {/* End Modal Design Chairs Rooms */}
      <Modal
        open={open_viewChairs}
        onClose={handleClose_View_Chairs}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box component="form" className="style3">
          <Typography variant="h5" component="h2" gutterBottom>
            Chairs For Room
          </Typography>
          <Box className="grid grid-cols-3 gap-3">
            <Box className="grid col-span-2 overflow-y-auto h-[450px]">
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
                      src={doc.imgUrl}
                      alt="seat"
                      className={`w-10 h-10 object-cover ${
                        getchairs(doc.id) ? "opacity-100" : "opacity-0"
                      }`}
                    />
                    {getchairs(doc.id) && (
                      <p className="absolute text-xs text-black top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 pb-1 font-medium">
                        {doc.name}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </Box>

            <Box className=" grid col-span-1 justify-center items-center">
              <div className="pb-3 flex w-14 h-auto">
                <img src={`${Blue_ChairImg}`} alt="" />
                <p className="px-3 whitespace-nowrap my-auto">Ghế Thường</p>
              </div>
              <div className="pb-3 flex w-14 h-auto">
                <img src={`${Vip_ChairImg}`} alt="" />
                <p className="px-3 whitespace-nowrap my-auto">Ghế Vip</p>
              </div>
              <div className="pb-3 flex w-14 h-auto">
                <img src={`${Couple_ChairImg}`} alt="" />
                <p className="px-3 whitespace-nowrap my-auto">Ghế Couple</p>
              </div>
            </Box>
          </Box>
        </Box>
      </Modal>
      <Button_Delete
        open_dele={open_dele}
        handleClose_Dele={handleClose_Dele}
        handleDelete={handleDelete}
      />
    </>
  );
}

export default Room;
