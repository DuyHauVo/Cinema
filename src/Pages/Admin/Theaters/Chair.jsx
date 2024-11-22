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
import { ContextType_Chairs } from "../../../Context/ContextChair/Type_ChairsContext";
import {
  addDocument,
  deleteDocument,
  updateDocument,
} from "../../../Services/Service_Firebase";
import { ContextChairs } from "../../../Context/ContextChair/ChairsContext";
import Gray_ChairImg from "../../../Assets/logo/logo_chair.png";

function Chair(props) {
  const style = {
    flexDirection: "column",
    gap: 2,
    width: "400px",
    margin: "auto",
    marginTop: 5,
    bgcolor: "background.paper",
    p: 4,
  };

  const [open, setOpen] = useState(false);
  const [open_dele, setOpen_dele] = useState(false);
  const [dele, setDele] = useState(null);
  const [page, setPage] = useState(0);
  const [errors, setErrors] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState("");
  const [previewImg, setPreviewImg] = useState(null);
  const [imgUpload, setImgUpload] = useState(null);
  const [chairs, setChairs] = useState({
    name: "",
    type: "",
  });
  const handleClose = () => setOpen(false);
  const handleClose_Dele = () => setOpen_dele(false);

  // kết nối với context
  const type_chairs = useContext(ContextType_Chairs);
  const listChairs = useContext(ContextChairs);

  const handleChange = (e) => {
    setChairs({
      ...chairs,
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
      if (chairs.id) {
        const { id, ...NewObjectWithoutId } = chairs;
        await updateDocument(
          "chairs",
          chairs.id,
          NewObjectWithoutId,
          imgUpload,
          chairs.imgUrl
        );
      } else {
        await addDocument("chairs", chairs, imgUpload);
      }
    } catch (error) {}
    setChairs({});
    setOpen(false);
  };
  // #region delete
  const handleDelete = async () => {
    try {
      await deleteDocument("chairs", dele.id);
    } catch (error) {
      console.log(error);
    }
  };
  // #region search
  const filterChair = listChairs.filter(
    (data) =>
      data.name.toLowerCase().includes(search.toLocaleLowerCase()) ||
      data.type.toLowerCase().includes(search.toLocaleLowerCase())
  );

  // #region add one img
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
  console.log(imgUpload);
  console.log(previewImg);

  // #region validation
  const Validation = () => {
    const NewError = {};
    NewError.name = chairs.name ? "" : "Please enter name";
    NewError.type = chairs.type ? "" : "Please choose type";
    setErrors(NewError);
    return !NewError.name && !NewError.type;
  };

  const getType_Chairs = (id) => {
    const findtype_ChairId = type_chairs.find((data) => data.id === id);
    return findtype_ChairId ? findtype_ChairId.name : "";
  };
  const handleReset = () => {
    setOpen(true);
    setChairs({});
    setPreviewImg(null);
  };
  const handleEdit = (chair) => {
    setOpen(true);
    setChairs(chair);
    setErrors({});
    setPreviewImg(chair.imgUrl);
  };

  return (
    <>
      <div className="grid grid-cols-10 gap-5 p-5 ">
        {/* Heading spanning all 3 columns */}
        <h1 className="col-span-3 text-3xl font-bold ">List Chairs</h1>

        {/* Form with text input and button */}
        <form action="" className="col-span-5 flex items-center space-x-2 mr-5">
          <input
            type="text"
            className="border border-gray-300 rounded px-4 py-2 w-full"
            placeholder="Search Chairs"
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
          ADD CHAIRS
        </button>
      </div>
      <TableContainer sx={{ paddingRight: 2, paddingLeft: 2 }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                #
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Name Chair
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Image
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Type Chair
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filterChair
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((chair, index) => (
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">
                    {page * rowsPerPage + index + 1}
                  </TableCell>
                  <TableCell align="center">{chair.name}</TableCell>
                  <TableCell align="center">
                    <img
                      className="w-10 h-auto m-auto"
                      src={chair.imgUrl}
                      alt=""
                    />
                  </TableCell>
                  <TableCell align="center">
                    {getType_Chairs(chair.type)}
                  </TableCell>
                  <TableCell align="center">
                    <div className="flex justify-center">
                      <div className="mr-2">
                        <Button
                          variant="contained"
                          color="success"
                          onClick={() => handleEdit(chair)}
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
                            setDele(chair);
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
          rowsPerPageOptions={[5, 10, 25]}
          rowsPerPage={rowsPerPage}
          component="div"
          count={listChairs.length}
          page={page}
          onPageChange={(event, newPage) => setPage(newPage)}
          onRateChange={(event) => {
            setRowsPerPage(parseInt(event.target.value), 10);
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
        className="p-5"
      >
        <Box component="form" sx={style} onSubmit={handleSubmit}>
          <Typography variant="h6" component="h3" className="pb-3">
            {chairs.id ? "UPDATE CHAIRS" : "ADD CHAIRS"}
          </Typography>
          {/* <Box className="grid grid-cols-3 gap-3"> */}
          <Box className="grid gap-2">
            <TextField
              label="Chairs Name"
              name="name"
              variant="outlined"
              value={chairs.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
            />
            <InputLabel id="select-label" className="m-auto ">
              Chosse Chairs
            </InputLabel>
            <Select
              value={chairs.type_chairs}
              onChange={handleChange}
              name="type"
              error={!!errors.type}
              helperText={errors.type}
            >
              {type_chairs &&
                type_chairs.map((type) => (
                  <MenuItem value={type.id}>{type.name}</MenuItem>
                ))}
            </Select>
            <input type="file" onChange={handleChangeImage} />
            <div className="w-20 h-auto m-auto">
              <img src={previewImg ? previewImg : `${Gray_ChairImg}`} alt="" />
            </div>
            <Button type="submit" variant="contained" color="primary">
              {chairs.id ? "UPDATE CHAIRS" : "ADD CHAIRS"}
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

export default Chair;
