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
} from "@mui/material";
import Button_Delete from "../../Button_Delete";
import {
  addDocument,
  deleteDocument,
  updateDocument,
} from "../../../Services/Service_Firebase";
import { ContextPerformers } from "../../../Context/PerformerContext";
import logo from "../../../Assets/logo/659a924f51c6b.png";

const style = {
  display: "flex",
  width: "900px",
  flexDirection: "column",
  margin: "auto",
  gap: 2,
  marginTop: 10,
  bgcolor: "background.paper",
  p: 4,
  borderRadius: "10px",
};

function Performer(props) {
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleClose_Dele = () => setOpen_dele(false);
  const [open, setOpen] = useState(false);
  const [open_dele, setOpen_dele] = useState(false);
  const list_performer = useContext(ContextPerformers);
  const [dele, setDele] = useState(null);
  const [errors, setErrors] = useState({});
  const [previewImg, setPreviewImg] = useState(null);
  const [imgUpload, setImgUpload] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0); //trang hiện tại là 0
  const [rowsPerPage, setRowsPerPage] = useState(3); //phần tử xuất hiện mỗi trang
  const [performer, setPerformer] = useState({
    name: "",
    img: "",
    information: "",
  });

  const handleChange = (e) => {
    setPerformer({
      ...performer,
      [e.target.name]: e.target.value,
    });
  };

  //#region Handle img
  const handleImageChange = (e) => {
    const selectedImg = e.target.files[0];

    if (selectedImg) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImg(reader.result);
      };
      reader.readAsDataURL(selectedImg);
      setImgUpload(selectedImg);
    } else {
      setPreviewImg(null);
      setImgUpload(null);
    }
  };

  // #region ADD
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!Validation()) {
        return;
      }
      if (performer.id) {
        const { id, ...newObjectWithoutId } = performer;
        await updateDocument(
          "performers",
          performer.id,
          newObjectWithoutId,
          performer.imgUrl
        );
      } else {
        await addDocument("performers", performer, imgUpload);
      }
    } catch (error) {
      console.log(error);
    }
    handleClose();
    setPerformer({});
  };
  //#region DELETE
  const handleDelete = async () => {
    try {
      await deleteDocument("performers", dele.id);
    } catch (error) {
      console.log(error);
    }
  };
  // #region Validation
  const Validation = () => {
    const NewError = {};
    NewError.name = performer.name ? "" : "Vui lòng nhập tên diễn viên";
    NewError.information = performer.information
      ? ""
      : "Vui lòng nhập mô tả của diễn viên";
    NewError.imgUpload = imgUpload ? "" : "Vui lòng chọn ảnh";
    setErrors(NewError);
    return !NewError.name && !NewError.information;
  };

  //#region Search
  const filterPerfor = list_performer.filter(
    (perfor) =>
      // perfor.name.toLowerCase().includes(search.toLocaleLowerCase());
      perfor.name.toLowerCase().includes(search.toLocaleLowerCase()) ||
      perfor.information.toLowerCase().includes(search.toLocaleLowerCase())
  );
  const handleReset = () => {
    setPreviewImg(null);
    setPerformer({});
    setErrors("");
  };
  const handleEdit = (perfor) => {
    handleOpen();
    setPerformer(perfor);
    setPreviewImg(perfor.imgUrl);
    setErrors({});
  };
  //#region RETURN
  return (
    <div className="">
      <div className="">
        <div className="grid grid-cols-10 gap-5 p-5 ">
          {/* Heading spanning all 3 columns */}
          <h1 className="col-span-3 text-3xl font-bold ">List Performers</h1>

          {/* Form with text input and button */}
          <form
            action=""
            className="col-span-5 flex items-center space-x-2 mr-5"
          >
            <input
              type="text"
              className="border border-gray-300 rounded px-4 py-2 w-full"
              placeholder="Search Performers"
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
              handleOpen(true);
              handleReset();
            }}
          >
            ADD PERFORMERS
          </button>
        </div>
      </div>
      <div className="p-3">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  #
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Name Performer
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  IMG
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Information
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filterPerfor
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((perfor, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">
                      {page * rowsPerPage + index + 1}
                    </TableCell>

                    <TableCell align="center">{perfor.name}</TableCell>
                    <TableCell align="center">
                      <img className="w-20 m-auto" src={perfor.imgUrl} alt="" />
                    </TableCell>
                    <TableCell align="center">{perfor.information}</TableCell>
                    <TableCell align="center">
                      <div className="flex justify-center">
                        <div className="mr-2">
                          <Button
                            variant="contained"
                            color="success"
                            onClick={() => {
                              handleEdit(perfor);
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
                              setDele(perfor);
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
            count={list_performer.length}
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box component="form" sx={style} onSubmit={handleSubmit}>
          <Typography variant="h6" component="h3">
            {performer.id ? "UPDATE PERFORMER" : "ADD PERFORMERS"}
          </Typography>
          <div className="grid grid-cols-2 gap-2">
            <Box className="grid gap-3">
              <TextField
                label="Name Performer"
                name="name"
                variant="outlined"
                value={performer.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name}
              />
              <TextField
                label="Information Performer"
                name="information"
                variant="outlined"
                multiline
                rows={5}
                value={performer.information}
                onChange={handleChange}
                error={!!errors.information}
                helperText={errors.information}
              />
              <div className="relative mb-4 w-full">
                <TextField
                  name="img"
                  variant="outlined"
                  type="file"
                  fullWidth
                  onChange={handleImageChange}
                  error={!!errors.img}
                  helperText={errors.img}
                />
                {errors && (
                  <p className="text-red-600 absolute left-1/2 transform -translate-x-1/2 text-xs">
                    {errors.imgUpload}
                  </p>
                )}
              </div>
            </Box>
            <img
              className="object-cover h-80"
              src={previewImg ? previewImg : `${logo}`}
              alt=""
            />
          </div>
          <Button type="submit" variant="contained" color="primary">
            {performer.id ? "UPDATE PERFORMER" : "ADD PERFORMERS"}
          </Button>
        </Box>
      </Modal>
      {/* End Modal Add */}
      <Button_Delete
        open_dele={open_dele}
        handleClose_Dele={handleClose_Dele}
        handleDelete={handleDelete}
      />
    </div>
  );
}

export default Performer;
