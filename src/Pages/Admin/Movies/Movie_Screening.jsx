import React, { useContext, useEffect, useState } from "react";
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
  FormControl,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Button_Delete from "../../Button_Delete";
import { ContextRegions } from "../../../Context/ContextRoom/RegionsContext";
import { ContextLocations } from "../../../Context/ContextRoom/LocationContext";
import { ContextTheaters } from "../../../Context/TheaterContext";
import { ContextRooms } from "../../../Context/ContextRoom/RoomContext";
import { ContextMovies } from "../../../Context/MoviesContext";
import logo from "../../../Assets/logo/FILM PRODUCTION LOGO-01.jpg";
import CloseIcon from "@mui/icons-material/Close";
import {
  addDocument,
  deleteDocument,
  updateDocument,
} from "../../../Services/Service_Firebase";
import { ContextMovie_Screening } from "../../../Context/Movie_ScreeningContext";
import { filterById, getObjectById } from "../../../Services/Repository";

const inter = {
  movie: "",
  date: "",
  theater: "",
  room: "",
};
// #region Start MUI
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
function Movie_Screening(props) {
  // End MUI
  const [open, setOpen] = useState(false);
  const [open_dele, setOpen_dele] = useState(false);
  const [open_Movies, setOpen_Movies] = useState(false);
  const [local, setLocal] = useState([]);
  const [filterlocal, setFilterlocal] = useState([]);
  const [room, setRoom] = useState([]);
  const [arrTime, setArrTime] = useState([]);
  const [time, setTime] = useState("");
  const [list_room, setList_Room] = useState([]);
  const [show_list_room, setShow_List_Room] = useState([]);
  const [dele, setDele] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [uefLocal, setUefLocal] = useState("");
  const [uefTheater, setUefTheater] = useState("");
  const [search, setSearch] = useState("");
  const [errors, setErrors] = useState("");
  const [listTheater, setListTheater] = useState([]);
  const [movie_Screening, setMovie_Screening] = useState(inter);

  const handleClose = () => setOpen(false);
  const handleClose_Dele = () => setOpen_dele(false);
  const handleClose_Movie = () => setOpen_Movies(false);
  const handleReset = () => {
    setOpen(true);
    setMovie_Screening([]);
    setList_Room([]);
    setArrTime([]);
    setErrors("");
    setShow_List_Room([]);
  };
  const handleEdit = (doc) => {
    setOpen(true);
    setMovie_Screening(doc);
    setList_Room(doc.list_room);
    setArrTime(doc.arrTime);
    setErrors("");
  };

  // #region Connect context
  const regions = useContext(ContextRegions);
  const locations = useContext(ContextLocations);
  const theaters = useContext(ContextTheaters);
  const rooms = useContext(ContextRooms);
  const movies = useContext(ContextMovies);
  const listMovie_Screening = useContext(ContextMovie_Screening);

  const handleChange = (e) => {
    setMovie_Screening({
      ...movie_Screening,
      [e.target.name]: e.target.value,
    });
  };
  // #region Add
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!validation()) {
        return;
      }
      if (movie_Screening.id) {
        const updateMovie_screeing = { ...movie_Screening, arrTime, list_room };
        const { id, ...newObjectWithoutId } = updateMovie_screeing;
        await updateDocument(
          "movie_screening",
          movie_Screening.id,
          newObjectWithoutId
        );
      } else {
        const newMovie_screeing = { ...movie_Screening, arrTime, list_room };
        await addDocument("movie_screening", newMovie_screeing);
      }
    } catch (error) {
      console.log(error);
    }
    setOpen(false);
    setArrTime([]);
    setShow_List_Room([]);
    setListTheater([]);
    setMovie_Screening([]);
  };
  // #region Delete
  const handleDelete = async () => {
    try {
      await deleteDocument("movie_screening", dele.id);
    } catch (error) {
      console.log(error);
    }
  };
  // #region Validation
  const validation = () => {
    const newError = {};
    newError.date = movie_Screening.date ? "" : "Please Enter Date";
    newError.time = arrTime.length > 0 ? "" : "Please Choose Time";
    newError.region = movie_Screening.region ? "" : "Please Choose region";
    newError.district = movie_Screening.district
      ? ""
      : "Please Choose district";
    newError.movie = movie_Screening.movie ? "" : " Please choose movie";
    setErrors(newError);
    return !Object.values(newError).some((error) => error);
  };
  // #region Search
  const handleResetSearch = () => {
    setUefLocal("");
    setUefTheater("");
  };
  const filterMovie_Screening = listMovie_Screening.filter((doc) => {
    const movie = movies.find((a) => a.id === doc.movie);
    // const room = rooms.find((a) => a.id === itemRoom);
    if (!uefTheater || doc.district === uefTheater) {
      if (movie) {
        const nameMovie = movie.name;
        return nameMovie.toLowerCase().includes(search.toLowerCase());
      } else {
        const formattedDate = new Date(doc.date).toLocaleDateString("vi-VN");
        return formattedDate.toLowerCase().includes(search.toLowerCase());
      }
    }
    return false;
  });

  // #region Get function
  const getMovieDetail = (id, type) => {
    const movie = movies.find((a) => a.id == id);
    return movie
      ? type === "name"
        ? movie.name
        : type === "poster"
        ? movie.imgUrl
        : null
      : null;
  };
  const getRoomDetails = (id) => {
    const nameRoom = rooms.find((a) => a.id === id);
    return nameRoom ? nameRoom.name : null;
  };
  const getTheaterDetail = (roomIds) => {
    const firstRoom = rooms.find((r) => r.id === roomIds[0]);
    const theater = theaters.find((t) => t.id === firstRoom?.theater);
    return theater ? theater.name : null;
  };

  // #region Choose and Handle
  const chooseMoview = (id) => {
    if (movie_Screening.movie == id) {
      setMovie_Screening({ ...movie_Screening, movie: "" });
    } else {
      setMovie_Screening({ ...movie_Screening, movie: id });
    }
  };
  const chooseRoom = (id) => {
    setList_Room(
      list_room.includes(id)
        ? list_room.filter((roomId) => roomId !== id)
        : [...list_room, id]
    );
  };
  const handleRoom = (id) => list_room.includes(id);

  const chooseTheater = (id) => {
    const list_rom = rooms.filter((a) => a.theater == id);
    setShow_List_Room(list_rom);
  };
  const handleFindPosterMovie = () => {
    const newposter = movies.find(
      (ID_Movie) => ID_Movie.id === movie_Screening.movie
    );
    return newposter ? newposter.imgUrl : null;
  };
  // #region UseEffect Find
  useEffect(() => {
    const fillterlocal = locations.filter(
      (a) => a.region === movie_Screening.region
    );
    setLocal(fillterlocal);
  }, [movie_Screening.region]);

  useEffect(() => {
    const fillterrooms = rooms.filter(
      (b) => b.district === movie_Screening.district
    );
    setRoom(fillterrooms);
  }, [movie_Screening.district]);
  useEffect(() => {
    const fillteeTheater = theaters.filter(
      (b) => b.district === movie_Screening.district
    );
    setListTheater(fillteeTheater);
  }, [movie_Screening.district]);

  // find show
  useEffect(() => {
    const listtea = theaters.filter((a) => a.id === uefTheater);
    setListTheater(listtea);
  }, [uefTheater]);

  useEffect(() => {
    const fillterlocal = locations.filter((a) => a.region === uefLocal);
    setFilterlocal(fillterlocal);
  }, [uefLocal]);

  // #region Time
  const getTime = (a) => {
    return a;
  };
  const addTime = () => {
    setArrTime([...arrTime, time]);
    setTime("");
  };
  const deletime = (i) => {
    const newTime = arrTime.filter((_, index) => index !== i);
    setArrTime([...newTime]);
  };
  return (
    <>
      <div className="grid grid-cols-12 gap-3 p-3  items-center">
        {/* Heading spanning all 3 columns */}
        <h1 className="col-span-2 text-lg font-bold">List Movie_Screening</h1>

        {/* Form with text input and button */}
        <form action="" className="col-span-4 flex items-center space-x-2 mr-5">
          <input
            type="text"
            className="border border-gray-300 rounded px-4 py-2 w-full"
            placeholder="Search Movie_Screening"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="bg-blue-500 text-white px-5 py-2 rounded">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </form>
        <div className="col-span-4 flex justify-between space-x-2 mx-auto w-full ">
          <div className="w-1/2">
            <FormControl className="w-full">
              <InputLabel className="m-auto ">Chosse Region</InputLabel>
              <Select
                label="Choose Region"
                onChange={(e) => setUefLocal(e.target.value)}
                value={movie_Screening.region}
                name="region"
              >
                {regions &&
                  regions.map((data) => (
                    <MenuItem value={data.id}>{data.name}</MenuItem>
                  ))}
              </Select>
            </FormControl>
          </div>
          <div className="w-1/2">
            <FormControl className="w-full">
              <InputLabel className="m-auto ">Chosse Locations</InputLabel>
              <Select
                label="Choose Location"
                onChange={(e) => setUefTheater(e.target.value)}
                value={movie_Screening.district}
                name="district"
              >
                {filterlocal &&
                  filterlocal.map((data) => (
                    <MenuItem value={data.id}>{data.district}</MenuItem>
                  ))}
              </Select>
            </FormControl>
          </div>
          <button
            className="col-span-1 bg-blue-500 text-white rounded-full"
            onClick={() => {
              handleResetSearch();
            }}
          >
            <CloseIcon />
          </button>
        </div>

        {/* Button for opening modal */}
        <button
          className="col-span-2 bg-green-500 text-white px-2 py-2 rounded"
          onClick={() => {
            handleReset();
          }}
        >
          ADD MOVIE_SCREENING
        </button>
      </div>
      <div className="p-3">
        <TableContainer>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">#</StyledTableCell>
                <StyledTableCell align="center">Name Movies</StyledTableCell>
                <StyledTableCell align="center">Poster Movies</StyledTableCell>
                <StyledTableCell align="center">Name Room</StyledTableCell>
                <StyledTableCell align="center">Name Theater</StyledTableCell>
                <StyledTableCell align="center">Date</StyledTableCell>
                <StyledTableCell align="center">Time(Array)</StyledTableCell>
                <StyledTableCell align="center">Action</StyledTableCell>
              </TableRow>
            </TableHead>
            {filterMovie_Screening
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((doc, index) => (
                <TableBody>
                  <StyledTableRow>
                    <StyledTableCell align="center">
                      {page * rowsPerPage + index + 1}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {getMovieDetail(doc.movie, "name")}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <img
                        className="w-20 m-auto"
                        src={getMovieDetail(doc.movie, "poster")}
                        alt=""
                      />
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {doc.list_room.map((a) => getObjectById(a, rooms)?.name) +
                        " "}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {getTheaterDetail(doc.list_room)}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {new Date(doc.date).toLocaleDateString("vi-VN")}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Button className="relative box_tooplit">
                        <p className="text-red-600 ">Time</p>
                        <Box className="absolute hidden tooplte_time">
                          {doc.arrTime.map((a) => (
                            <Button variant="text" disabled>
                              <p className="text-sky-500">{getTime(a)}</p>
                            </Button>
                          ))}
                        </Box>
                      </Button>
                    </StyledTableCell>
                    <StyledTableCell align="center ">
                      <div className="flex justify-center">
                        <div className="mr-2">
                          <Button
                            variant="contained"
                            color="success"
                            onClick={() => handleEdit(doc)}
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
                              setDele(doc);
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
            count={listMovie_Screening.length}
            component="div"
            onPageChange={(e, newPage) => setPage(newPage)}
            onRowsPerPageChange={(e) => {
              setRowsPerPage(parseInt(e.target.value), 10);
              setPage(0);
            }}
          />
        </TableContainer>

        {/* Start Modal Add */}
        <Dialog
          open={open}
          onClose={handleClose}
          maxWidth="lg"
          fullWidth
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <DialogTitle>Movie Screening</DialogTitle>

          <DialogContent dividers>
            <Box
              component="form"
              className="style_movie_Screening p-2"
              // onSubmit={handleSubmit}
            >
              <Box className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 md:gap-2 gap-3">
                <Box className="col-span-1 flex gap-3 flex-col">
                  <TextField
                    name="date"
                    variant="outlined"
                    type="date"
                    value={movie_Screening.date}
                    onChange={handleChange}
                    fullWidth
                    error={!!errors.date}
                    helperText={errors.date}
                  />
                  <div className="relative">
                    <TextField
                      name="time"
                      type="time"
                      variant="outlined"
                      value={movie_Screening.time}
                      onChange={(e) => setTime(e.target.value)}
                      fullWidth
                      error={!!errors.time}
                      helperText={errors.time}
                    />
                    <button
                      type="button"
                      className={`absolute right-10 -translate-y-1/2 ${
                        errors.time ? "top-[calc(50%-12px)]" : "top-1/2"
                      }`}
                      onClick={addTime}
                    >
                      <i className="fa-solid fa-circle-plus  text-sm"></i>
                    </button>
                  </div>
                  <Box className="border w-full h-auto rounded grid grid-cols-4 gap-2 p-2">
                    {arrTime.map((time, index) => (
                      <Button
                        key={time}
                        className="relative col-span-1"
                        variant="outlined"
                        color="error"
                      >
                        <p className="text-black p-2">{time}</p>
                        <i
                          className="fa-solid fa-trash-can absolute right-1 top-1 text-sm text-red-400"
                          onClick={() => deletime(index)}
                        ></i>
                      </Button>
                    ))}
                  </Box>
                </Box>

                <Box className="col-span-1 flex gap-3 flex-col">
                  <FormControl className="w-full">
                    <InputLabel>Choose Region</InputLabel>
                    <Select
                      label="Choose Region"
                      onChange={handleChange}
                      value={movie_Screening.region}
                      name="region"
                      error={!!errors.region}
                      helperText={errors.region}
                    >
                      {regions &&
                        regions.map((data) => (
                          <MenuItem key={data.id} value={data.id}>
                            {data.name}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                  <FormControl className="w-full">
                    <InputLabel>Choose Location</InputLabel>
                    <Select
                      label="Choose Location"
                      onChange={handleChange}
                      value={movie_Screening.district}
                      name="district"
                      error={!!errors.district}
                      helperText={errors.district}
                    >
                      {local &&
                        local.map((data) => (
                          <MenuItem key={data.id} value={data.id}>
                            {data.district}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                  <div className="relative pb-6">
                    <Button
                      variant="contained"
                      onClick={() => setOpen_Movies(true)}
                      fullWidth
                    >
                      Choose Movies
                    </Button>
                    {errors.movie && (
                      <p className="text-red-600 absolute left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                        {errors.movie}
                      </p>
                    )}
                  </div>
                  <Box className="w-1/2 m-auto">
                    <img
                      src={`${
                        handleFindPosterMovie() ? handleFindPosterMovie() : logo
                      }`}
                      alt=""
                    />
                  </Box>
                </Box>

                <Box className="lg:col-span-2 md:col-span-1 pr-3">
                  <div className="grid lg:grid-cols-3 md:grid-cols-1 gap-4 p-2">
                    {filterById(room, movie_Screening.theater, "theater")
                      .length > 0 ? (
                      <>
                        {filterById(
                          room,
                          movie_Screening.theater,
                          "theater"
                        ).map((doc) => (
                          <Card
                            key={doc.id}
                            className="grid col-span-1"
                            onClick={() => chooseRoom(doc.id)}
                            sx={{
                              boxShadow: handleRoom(doc.id)
                                ? "rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px"
                                : "",
                              transition: "box-shadow 0.3s ease-in-out",
                            }}
                          >
                            <CardMedia
                              component="img"
                              sx={{ height: "150px" }}
                              image={
                                getObjectById(doc.theater, theaters)?.imgUrl
                              }
                            />
                            <CardContent>
                              <Typography
                                variant="h5"
                                component="div"
                                className="text-center"
                              >
                                {getObjectById(doc.theater, theaters)?.name}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                textAlign="center"
                              >
                                {doc.name}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                textAlign="center"
                              >
                                {getObjectById(doc.theater, theaters)?.adress}
                              </Typography>
                            </CardContent>
                          </Card>
                        ))}
                        <i
                          class="fa-solid fa-circle-arrow-left text-3xl ml-2 text-cyan-700 "
                          onClick={() =>
                            setMovie_Screening({
                              ...movie_Screening,
                              theater: "",
                            })
                          }
                        ></i>
                      </>
                    ) : (
                      listTheater.map((doc) => (
                        <Card
                          value={movie_Screening.theater}
                          onClick={() =>
                            setMovie_Screening({
                              ...movie_Screening,
                              theater: doc.id,
                            })
                          }
                        >
                          <CardMedia
                            component="img"
                            sx={{ height: "100px" }}
                            image={doc.imgUrl}
                            alt={doc.name}
                          />
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="div"
                            >
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
                      ))
                    )}
                  </div>
                </Box>
              </Box>
            </Box>
          </DialogContent>

          <DialogActions>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              className="w-1/2"
            >
              {movie_Screening.id ? "UPDATE" : "ADD"}
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleClose}
              className="w-1/2"
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
        {/* End Modal Add */}

        {/* Start Modal Add Movie*/}
        <Dialog
          open={open_Movies}
          onClose={handleClose_Movie}
          aria-labelledby="dialog-title"
          aria-describedby="dialog-description"
          maxWidth="lg"
        >
          {/* Tiêu đề */}
          <DialogTitle id="dialog-title">Choose a Movie</DialogTitle>

          {/* Nội dung */}
          <DialogContent dividers className="p-4">
            <Box className="grid lg:grid-cols-4 md:grid-cols-3 gap-3 grid-rows-2 m-auto relative p-5">
              {movies &&
                movies.map((mo) => (
                  <Box
                    key={mo.id}
                    onClick={() => chooseMoview(mo.id)}
                    sx={{
                      boxShadow:
                        movie_Screening.movie === mo.id
                          ? "rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;"
                          : "none",
                      transition: "box-shadow 0.3s ease-in-out",
                    }}
                    className="row-span-1"
                  >
                    <img className="object-cover" src={mo.imgUrl} alt="" />
                  </Box>
                ))}
            </Box>
          </DialogContent>

          {/* Hành động */}
          <DialogActions>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setOpen_Movies(false)}
            >
              CHOOSE MOVIE
            </Button>
          </DialogActions>
        </Dialog>
        {/* Button delete */}
        <Button_Delete
          open_dele={open_dele}
          handleClose_Dele={handleClose_Dele}
          handleDelete={handleDelete}
        />
      </div>
    </>
  );
}

export default Movie_Screening;
