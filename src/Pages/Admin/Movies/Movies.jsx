import React, { useContext, useState } from "react";
import { styled } from "@mui/material/styles";
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import "../../../Styles/Movie_Admin.css";
import { ContextPerformers } from "../../../Context/PerformerContext";
import { ContextCategories } from "../../../Context/CategoryContext";
import Button_Delete from "../../Button_Delete";
import {
  addDocument,
  deleteDocument,
  updateDocument,
} from "../../../Services/Service_Firebase";
import { ContextMovies } from "../../../Context/MoviesContext";
import logo from "../../../Assets/logo/FILM PRODUCTION LOGO-01.jpg";
function Movies(props) {
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
  // End MUI

  const [open, setOpen] = useState(false);
  const [open_Trailer, setOpen_Trailer] = useState(false);
  const [open_perfor, setOpen_perfor] = useState(false);
  const [open_performer, setOpen_Performer] = useState(false);
  const [open_category, setOpen_Category] = useState(false);
  const [open_dele, setOpen_dele] = useState(false);
  const [movie, setMovie] = useState({});
  const [list_cate, setListCate] = useState([]);
  const [list_performer, setList_performer] = useState([]);
  const [previewImg, setPreviewImg] = useState(null);
  const [imgUpload, setImgUpload] = useState(null);
  const [outPlay, setOutPlay] = useState("");
  const [errors, setErrors] = useState({});
  const [dele, setDele] = useState(null);
  const [page, setPage] = useState(0); //page ban đầu
  const [rowsPerPage, setRowsPerPage] = useState(3); //số page có thể đổi được
  const [search, setSearch] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleClose_Trailer = () => setOpen_Trailer(false);
  const handleClose_Perfor = () => setOpen_perfor(false);
  const handleClose_performer = () => setOpen_Performer(false);
  const handleClose_category = () => setOpen_Category(false);
  const handleClose_Dele = () => setOpen_dele(false);

  const performer = useContext(ContextPerformers); //Kết nối với contect
  const movies = useContext(ContextMovies);
  const category = useContext(ContextCategories);
  // #region LẤY DL NHẬP VÀO
  const handleChange = (e) => {
    setMovie({
      ...movie,
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
      if (movie.id) {
        const updateMovie = { ...movie, list_cate, list_performer };
        const { id, ...newObjectWithoutId } = updateMovie;
        await updateDocument(
          "movies",
          movie.id,
          newObjectWithoutId,
          imgUpload,
          movie.imgUrl
        );
      } else {
        const movieNew = { ...movie, list_cate, list_performer };
        await addDocument("movies", movieNew, imgUpload);
      }
    } catch (error) {
      console.log(error);
    }
    handleClose();
    setListCate([]);
    setList_performer([]);
    setMovie({});
  };

  // #region Dele
  const handleDelete = async () => {
    try {
      await deleteDocument("movies", dele.id);
    } catch (error) {
      console.log(error);
    }
  };

  // #region Tim để đổi màu performer
  const handlePerformer = (id) => {
    const a = list_performer.find((b) => b === id);
    return a;
  };

  // Kiểm tra chọn và xoá performer
  const choosePerformer = (id) => {
    const a = list_performer.find((b) => b === id);
    if (a) {
      const newPerformer = list_performer.filter((a) => a !== id);
      setList_performer(newPerformer);
    } else {
      setList_performer([...list_performer, id]);
    }
    const imgUrl = getPerformerImgUrl(id);
    if (imgUrl) {
      console.log(`Img URL của performer có id ${id}:`, imgUrl);
    }
  };
  // Lấy hình ảnh qua id
  const getPerformerImgUrl = (id) => {
    const performerData = performer.find((perfor) => perfor.id === id);
    return performerData ? performerData.imgUrl : null;
  };
  // Kiểm tra có chọn hay ko
  const chooseCategories = (id) => {
    // kiem tra
    const findcateID = list_cate.find((b) => b === id);
    if (findcateID) {
      const newCate = list_cate.filter((newcate) => newcate !== id);
      setListCate(newCate);
    } else {
      setListCate([...list_cate, id]);
    }
  };
  // #region Tìm để đổi màu cate
  const handleChooseCate = (id) => {
    const b = list_cate.find((a) => a === id);
    return b;
  };
  // Lấy categories qua id
  const getCategoriesName = (id) => {
    const findCateDate = category.find((cate_Data) => cate_Data.id === id);
    return findCateDate ? findCateDate.name : "";
  };
  // #region Lấy poster
  const HandleChangeImage = (e) => {
    const selecter = e.target.files[0];
    if (selecter) {
      const render = new FileReader();
      render.onload = () => {
        setPreviewImg(render.result);
      };
      render.readAsDataURL(selecter);
      setImgUpload(selecter);
    } else {
      setPreviewImg(null);
      setImgUpload(null);
    }
  };

  // #region Validation
  const Validation = () => {
    const NewError = {};
    NewError.name = movie.name ? "" : "Vui lòng nhập name phim";
    NewError.date = movie.date ? "" : "Vui lòng nhập date";
    NewError.age = movie.age ? "" : "Vui lòng nhập age";
    NewError.duration_Movie = movie.duration_Movie
      ? ""
      : "Vui lòng nhập duration_Movie";
    NewError.url_Trailer = movie.url_Trailer
      ? ""
      : "Vui lòng truyền đường Link URL";
    NewError.director = movie.director ? "" : "Vui lòng nhập Director";
    setErrors(NewError);
    console.log(errors);
    return (
      !NewError.name &&
      !NewError.date &&
      !NewError.age &&
      !NewError.duration_Movie &&
      !NewError.url_Trailer &&
      !NewError.director
    );
  };

  // #region Search
  const filterMovies = movies.filter(
    (mo) =>
      mo.name.toLowerCase().includes(search.toLocaleLowerCase()) ||
      mo.director.toLowerCase().includes(search.toLocaleLowerCase())
    // mo.cate.toLowerCase().includes(search.toLocaleLowerCase())
    // mo.duration_Movie.toLowerCase().includes(search.toLocaleLowerCase())
  );

  const handleEdit = (mo) => {
    setOpen(true);
    setListCate(mo.list_cate);
    setList_performer(mo.list_performer);
    setMovie(mo);
    setPreviewImg(mo.imgUrl);
    setErrors({});
  };
  const handleReset = () => {
    setMovie({});
    setListCate([]);
    setList_performer([]);
    setPreviewImg(null);
  };

  return (
    <div>
      <div className="grid grid-cols-10 gap-5 p-5 ">
        {/* Heading spanning all 3 columns */}
        <h1 className="col-span-3 text-3xl font-bold ">List Movies</h1>

        {/* Form with text input and button */}
        <form action="" className="col-span-5 flex items-center space-x-2 mr-5">
          <input
            type="text"
            className="border border-gray-300 rounded px-4 py-2 w-full"
            placeholder="Search Movies"
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
            handleOpen();
            handleReset();
          }}
        >
          ADD MOVIES
        </button>
      </div>
      <div className="p-5">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">#</StyledTableCell>

                <StyledTableCell align="center">Name</StyledTableCell>
                <StyledTableCell align="center">Poster_Movie</StyledTableCell>
                <StyledTableCell align="center">Type_Movie</StyledTableCell>
                <StyledTableCell align="center">Age</StyledTableCell>
                <StyledTableCell align="center">Director</StyledTableCell>
                <StyledTableCell align="center">Duration_Movie</StyledTableCell>
                <StyledTableCell align="center">Release_Date</StyledTableCell>
                <StyledTableCell align="center">Url_Trailer</StyledTableCell>
                <StyledTableCell align="center">Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filterMovies
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((mo, index) => (
                  <StyledTableRow>
                    <StyledTableCell align="center">
                      {page * rowsPerPage + index + 1}
                    </StyledTableCell>
                    <StyledTableCell align="center">{mo.name}</StyledTableCell>
                    <StyledTableCell align="center">
                      <img className="w-20 m-auto" src={mo.imgUrl} alt="" />
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Button class="relative group-tolit ">
                        <p className="font-extrabold">Categories</p>
                        <Box className="absolute hidden tooplit">
                          {mo.list_cate.map((a) => getCategoriesName(a)) + " "}
                        </Box>
                      </Button>
                    </StyledTableCell>
                    <StyledTableCell align="center">{mo.age}+</StyledTableCell>
                    <StyledTableCell align="center">
                      {mo.director}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {mo.duration_Movie} phút
                    </StyledTableCell>
                    <StyledTableCell align="center">{mo.date}</StyledTableCell>
                    <StyledTableCell align="center">
                      <Button
                        onClick={() => {
                          setOpen_Trailer(true);
                          setOutPlay(
                            mo.url_Trailer.replace("?", "?autoplay=1&")
                          );
                        }}
                        color="secondary"
                      >
                        Trailer Movie
                      </Button>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <div className="flex justify-center">
                        <div className="mr-2">
                          <Button
                            variant="outlined"
                            color="secondary"
                            onClick={() => {
                              setOpen_perfor(true);
                              setList_performer(mo.list_performer);
                            }}
                          >
                            {/* icon performer */}
                            <i class="fa-solid fa-people-group p-2"></i>
                          </Button>
                        </div>
                        <div className="mr-2">
                          <Button
                            variant="contained"
                            color="success"
                            onClick={() => handleEdit(mo)}
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
                              setDele(mo);
                            }}
                          >
                            {/* icon delete */}
                            <i class="fa-solid fa-trash p-2"></i>
                          </Button>
                        </div>
                      </div>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[3, 6, 9]}
            component="div"
            count={movies.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(event, newPage) => setPage(newPage)}
            onRowsPerPageChange={(event) => {
              setRowsPerPage(parseInt(event.target.value, 10));
              setPage(0);
            }}
          />
        </TableContainer>
      </div>

      {/* Start Modal Add */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
        fullWidth
        maxWidth="lg" // Adjust size as needed
      >
        <DialogTitle id="dialog-title">
          {movie.id ? "UPDATE MOVIES" : "ADD MOVIES"}
        </DialogTitle>
        <DialogContent>
          <Box component="form" className="style" onSubmit={handleSubmit}>
            <Box className="grid grid-cols-3 gap-3">
              {/* Left Column */}
              <Box className="grid gap-2">
                <TextField
                  label="Movie Name"
                  name="name"
                  variant="outlined"
                  value={movie.name}
                  onChange={handleChange}
                  error={!!errors.name}
                  helperText={errors.name}
                />
                <TextField
                  name="date"
                  variant="outlined"
                  type="date"
                  value={movie.date}
                  onChange={handleChange}
                  error={!!errors.date}
                  helperText={errors.date}
                />
                <TextField
                  label="Age"
                  name="age"
                  variant="outlined"
                  value={movie.age}
                  onChange={handleChange}
                  error={!!errors.age}
                  helperText={errors.age}
                />
                <Button
                  sx={{ marginBottom: "20px" }}
                  variant="contained"
                  onClick={() => setOpen_Category(true)}
                >
                  Choose Categories
                </Button>
              </Box>

              {/* Middle Column */}
              <Box className="grid gap-2">
                <TextField
                  label="Duration_Movie"
                  name="duration_Movie"
                  variant="outlined"
                  value={movie.duration_Movie}
                  onChange={handleChange}
                  error={!!errors.duration_Movie}
                  helperText={errors.duration_Movie}
                />
                <TextField
                  label="Url_Trailer"
                  name="url_Trailer"
                  variant="outlined"
                  inputProps={{ accept: "video/*" }}
                  value={movie.url_Trailer}
                  onChange={handleChange}
                  error={!!errors.url_Trailer}
                  helperText={errors.url_Trailer}
                />
                <TextField
                  label="Director"
                  name="director"
                  variant="outlined"
                  value={movie.director}
                  onChange={handleChange}
                  error={!!errors.director}
                  helperText={errors.director}
                />
                <Button
                  sx={{ marginBottom: "20px" }}
                  variant="contained"
                  onClick={() => setOpen_Performer(true)}
                >
                  Choose Performer
                </Button>
              </Box>

              {/* Right Column */}
              <Box>
                <div>
                  <input type="file" onChange={HandleChangeImage} />
                </div>
                <div className="mt-2 w-48">
                  <img src={previewImg ? previewImg : `${logo}`} alt="" />
                </div>
              </Box>
            </Box>

            {/* Categories List */}
            <Box className="mt-10">
              <DialogTitle id="dialog-title">CATEGORIES</DialogTitle>
              <Box className="flex gap-2 flex-wrap ">
                {list_cate.map((cate) => (
                  <Box key={cate}>
                    <Button
                      className="text-nowrap relative"
                      variant="contained"
                      color="primary"
                    >
                      {getCategoriesName(cate)}
                      <i
                        onClick={() => chooseCategories(cate)}
                        className="fa-solid fa-xmark absolute icon cursor-pointer"
                      ></i>
                    </Button>
                  </Box>
                ))}
              </Box>
            </Box>
            <Box className="mt-10 mb-5">
              <DialogTitle id="dialog-title">PERFORMERS</DialogTitle>
              {/* Performers List */}
              <Box className="grid grid-cols-5 gap-3 ">
                {list_performer.map((perforId) => (
                  <Box key={perforId} className="relative">
                    <img
                      className="w-32 h-36 object-cover"
                      src={getPerformerImgUrl(perforId)}
                      alt=""
                    />
                    <i
                      onClick={() => choosePerformer(perforId)}
                      className="fa-solid fa-xmark"
                    ></i>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <div className=" flex w-full gap-2">
            <Button
              className="w-full"
              onClick={handleClose}
              variant="outlined"
              color="secondary"
            >
              Cancel
            </Button>
            <Button
              className="w-full"
              type="submit"
              variant="contained"
              color="primary"
            >
              {movie.id ? "UPDATE MOVIES" : "ADD MOVIES"}
            </Button>
          </div>
        </DialogActions>
      </Dialog>

      {/* End Modal Add */}

      {/* Start Modal Trailer*/}
      <Modal
        open={open_Trailer}
        onClose={handleClose_Trailer}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="style_trailer">
          <iframe
            width="100%"
            height="500"
            src={outPlay}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            sx={{ border: "none" }}
          ></iframe>
        </Box>
      </Modal>
      {/* End Modal Trailer*/}

      {/* Start Modal show perfomer */}
      <Modal
        open={open_perfor}
        onClose={handleClose_Perfor}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box component="form" className="p-10">
          <Box className="grid grid-cols-4 gap-3 m-auto relative style2">
            {list_performer &&
              list_performer.map((perfor) => (
                <Box>
                  <img
                    className="object-cover"
                    src={getPerformerImgUrl(perfor)}
                    alt=""
                  />
                </Box>
              ))}
          </Box>
        </Box>
      </Modal>
      {/* End Modal Cate*/}

      {/* Start Modal Add Performer*/}
      <Modal
        open={open_performer}
        onClose={handleClose_performer}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box component="form" className="p-10">
          <Box className="grid grid-cols-4 gap-3 m-auto relative style2 overflow-y-auto h-[550px]">
            {performer &&
              performer.map((perfor) => (
                <Box
                  onClick={() => choosePerformer(perfor.id)}
                  className={`h-52  ${
                    handlePerformer(perfor.id) ? "border-2 border-blue-700" : ""
                  }`}
                >
                  <img className="object-cover" src={perfor.imgUrl} alt="" />
                </Box>
              ))}
          </Box>
          <Box className="text-center mt-3">
            <Button
              className="absolute bottom-8"
              type="submit"
              variant="contained"
              color="primary"
              onClick={() => {
                setOpen_Performer(false);
              }}
            >
              CHOOSE PERFORMERS
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Start Modal Add Category*/}
      <Modal
        open={open_category}
        onClose={handleClose_category}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box component="form" className="style2">
          <Box className="flex gap-2 flex-wrap">
            {category &&
              category.map((cate) => (
                <Box onClick={() => chooseCategories(cate.id)}>
                  <Button
                    className={` text-nowrap  ${
                      handleChooseCate(cate.id) ? "pri" : "err"
                    }`}
                    color="primary"
                  >
                    {cate.name}
                  </Button>
                </Box>
              ))}
          </Box>
          <Box className="text-center mt-3">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={() => {
                setOpen_Category(false);
              }}
            >
              CHOOSE CATEGORIES
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Start Modal Show Category*/}
      {/* <Modal
          open={show_cate}
          onClose={handleClose_showCate}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box component="form" className="style2">
            <Box className="flex gap-2 flex-wrap">
              {category &&
                category.map((cate) => (
                  <Box onClick={() => chooseCategories(cate.id)}>
                    <Button className="text-nowrap pri" color="primary">
                      {cate.name}
                    </Button>
                  </Box>
                ))}
              <h1>show_cate</h1>
              <Button type="submit" variant="contained" color="primary">
                CHOOSE CATEGORIES
              </Button>
            </Box>
            <Box className="text-center mt-3">
              <Button type="submit" variant="contained" color="primary">
                CHOOSE CATEGORIES
              </Button>
            </Box>
          </Box>
        </Modal> */}

      {/* Button delete */}
      <Button_Delete
        open_dele={open_dele}
        handleClose_Dele={handleClose_Dele}
        handleDelete={handleDelete}
      />
    </div>
  );
}

export default Movies;
