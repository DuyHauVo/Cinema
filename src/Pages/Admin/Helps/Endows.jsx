import React, { useContext, useState } from "react";
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Slide,
} from "@mui/material";
import Button_Delete from "../../Button_Delete";
import logo from "../../../Assets/logo/FILM PRODUCTION LOGO-01.jpg";
import {
  addDocument,
  deleteDocument,
  updateDocument,
} from "../../../Services/Service_Firebase";
import { ContextNews } from "../../../Context/ContextHelp/NewContext";
import { ContextEndow } from "../../../Context/ContextHelp/EndowContext";

const inter = {
  name: "",
  content: "",
  date: "",
};

function Endows(props) {
  const style = {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    width: "1200px",
    margin: "auto",
    marginTop: 10,
    bgcolor: "background.paper",
    p: 2,
  };

  const [open, setOpen] = useState(false);
  const [open_dele, setOpen_dele] = useState(false);
  const [endows, setEndows] = useState(inter);
  const [imgUpload, setImgUpload] = useState("");
  const [previewImg, setPreviewImg] = useState("");
  const [dele, setDele] = useState("");
  const [errors, setErrors] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [search, setSearch] = useState("");

  const listEndows = useContext(ContextEndow);

  const handleClose = () => setOpen(false);
  const handleClose_Dele = () => setOpen_dele(false);
  const handleReset = () => {
    setOpen(true);
    setEndows("");
    setPreviewImg("");
    setImgUpload("");
    setErrors("");
  };
  const handleEdit = (doc) => {
    setOpen(true);
    setEndows(doc);
    setPreviewImg(doc.imgUrl);
    setErrors("");
  };

  const handleChange = (e) => {
    setEndows({
      ...endows,
      [e.target.name]: e.target.value,
    });
  };
  //   #region GET IMG
  const handleChangeImage = (e) => {
    const selectingImg = e.target.files[0];
    if (selectingImg) {
      const render = new FileReader();
      render.onload = () => {
        setPreviewImg(render.result);
      };
      render.readAsDataURL(selectingImg);
      setImgUpload(selectingImg);
    } else {
      setPreviewImg(null);
      setImgUpload(null);
    }
  };
  //   #region ADD
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!validation()) {
        return;
      }
      if (endows.id) {
        const { id, ...newObjectWithoutId } = endows;
        await updateDocument(
          "endows",
          endows.id,
          newObjectWithoutId,
          imgUpload,
          endows.imgUrl
        );
      } else {
        await addDocument("endows", endows, imgUpload);
      }
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };
  // #region VALIDATION
  const validation = () => {
    const NewError = {};
    NewError.name = endows.name ? "" : "Please enter name";
    NewError.date = endows.date ? "" : "Please choose date";
    NewError.content = endows.content ? "" : "Please enter content";
    NewError.imgUpload = endows ? "" : "Please choose img";
    setErrors(NewError);
    return (
      !NewError.name &&
      !NewError.date &&
      !NewError.content &&
      !NewError.imgUpload
    );
  };
  // #region DELETE
  const handleDelete = async () => {
    try {
      await deleteDocument("endows", dele.id);
    } catch (error) {
      console.log(error);
    }
  };
  // #region SEARCH
  const fillterEndow = listEndows.filter(
    (doc) =>
      doc.name.toLowerCase().includes(search.toLocaleLowerCase()) ||
      doc.date.toLowerCase().includes(search.toLocaleLowerCase()) ||
      doc.content.toLowerCase().includes(search.toLocaleLowerCase())
  );
  return (
    <>
      <div className="grid grid-cols-10 gap-3 p-3  items-center">
        {/* Heading spanning all 3 columns */}
        <h1 className="col-span-3 text-3xl font-bold">List Endows</h1>

        {/* Form with text input and button */}
        <form action="" className="col-span-5 flex items-center space-x-2 mr-5">
          <input
            type="text"
            className="border border-gray-300 rounded px-4 py-2 w-full"
            placeholder="Search Endows"
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
          ADD ENDOWS
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
                Content
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Date
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          {fillterEndow
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((doc, index) => (
              <TableBody>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">
                    {page * rowsPerPage + index + 1}
                  </TableCell>
                  <TableCell align="center">{doc.name}</TableCell>
                  <TableCell align="center">
                    <img
                      className="w-32 h-auto m-auto"
                      src={doc.imgUrl}
                      alt="ảnh"
                    />
                  </TableCell>
                  <TableCell align="center">
                    {doc.content.length > 30
                      ? `${doc.content.substring(0, 30)}...`
                      : doc.content}
                  </TableCell>

                  <TableCell align="center" className="flex-wrap">
                    {doc.date}
                  </TableCell>

                  <TableCell align="center">
                    <div className="flex justify-center">
                      <div className="mr-2">
                        <Button
                          variant="contained"
                          color="success"
                          onClick={() => {
                            handleEdit(doc);
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
                            setDele(doc);
                          }}
                        >
                          {/* icon delete */}
                          <i class="fa-solid fa-trash p-2"></i>
                        </Button>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            ))}
        </Table>
        <TablePagination
          rowsPerPageOptions={[3, 6, 9]}
          component="div"
          count={listEndows.length}
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
      <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
        <DialogTitle>
          <Typography variant="h5" component="h2">
            {endows.id ? "UPDATE ENDOWS" : "ADD ENDOWS"}
          </Typography>
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent dividers>
            <Box className="grid grid-cols-3 gap-3">
              <Box className="grid col-span-2 gap-2">
                <TextField
                  label="Name"
                  name="name"
                  variant="outlined"
                  fullWidth
                  value={endows.name}
                  onChange={handleChange}
                  error={!!errors.name}
                  helperText={errors.name}
                />
                <TextField
                  name="date"
                  type="date"
                  variant="outlined"
                  fullWidth
                  value={endows.date}
                  onChange={handleChange}
                  error={!!errors.date}
                  helperText={errors.date}
                />
                <TextField
                  label="Content"
                  name="content"
                  variant="outlined"
                  multiline
                  rows={13}
                  fullWidth
                  value={endows.content}
                  onChange={handleChange}
                  error={!!errors.content}
                  helperText={errors.content}
                />
              </Box>
              <Box className="text-center">
                <Typography variant="subtitle1" gutterBottom>
                  Choose Image Endows
                </Typography>
                <div className="relative">
                  <input type="file" onChange={handleChangeImage} />
                  {errors && (
                    <p className="absolute mt-2 left-1/2 transform -translate-x-1/2 text-red-600">
                      {errors.imgUpload}
                    </p>
                  )}
                </div>
                <Box mt={3} textAlign="center">
                  <img
                    className="mx-auto mt-10"
                    src={previewImg ? previewImg : logo}
                    alt="Preview"
                    style={{ width: "80%" }}
                  />
                </Box>
              </Box>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} className="w-full" color="secondary">
              Cancel
            </Button>
            <Button
              type="submit"
              className="w-full"
              variant="contained"
              color="primary"
            >
              {endows.id ? "UPDATE ENDOWS" : "ADD ENDOWS"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
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

export default Endows;
