import React, { useState, useContext} from "react";
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
import {
  addDocument,
  fetchDocuments,
  deleteDocument,
  updateDocument,
} from "../../Services/Service_Firebase";
import Buttons from "@mui/material/Button";
import Button_Delete from "../Button_Delete";
import { ContextCategories } from "../../Context/CategoryContext";
const style = {
  display: "flex",
  flexDirection: "column",
  gap: 2,
  width: "300px",
  margin: "auto",
  marginTop: 5,
  bgcolor: "background.paper",
  p: 2,
};
function Categories(props) {
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleClose_Dele = () => setOpen_dele(false);
  const [open, setOpen] = useState(false);
  const [open_dele, setOpen_dele] = useState(false);
  const [category, setCategory] = useState({});
  const list_cate = useContext(ContextCategories);
  const [dele, setDele] = useState(null);
  const [errors, setErrors] = useState({});
  const [page, setPage] = useState(0); // Trang hiện tại
  const [rowsPerPage, setRowsPerPage] = useState(5); // Số lượng dòng mỗi trang
  const [search, setSearch] = useState("");

  // #region LẤY DL NHẬP VÀO
  const handleChange = (e) => {
    setCategory({
      ...category,
      [e.target.name]: e.target.value,
    });
  };

  //#region ADD CATE
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(category);
    // #region EDIT CATEGORI
    try {
      if (!validation()) {
        return;
      }
      if (category.id) {
        // Cập nhật danh sách
        await updateDocument("categories", category.id, category);
      } else {
        // Thêm mới danh mục
        await addDocument("categories", category);
      }
    } catch (error) {
      console.log("Error adding or updating document:", error);
    }
    setCategory({});
    handleClose();
  };

  const validation = () => {
    const newError = {};
    newError.name = category.name ? "" : "Vui lòng nhập tên";
    newError.description = category.description ? "" : "vui lòng nhập mô tả";
    setErrors(newError);
    return !newError.name && !newError.description;
  };
  //#region XOÁ CATEGORY
  const handleDelete = async () => {
    try {
      await deleteDocument("categories", dele.id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleReset = async () => {
    handleOpen();
    setCategory({});
  };
  const handleResetUpdate = () => {
    handleOpen();
    setErrors({});
  };
  const filterCate = list_cate.filter(
    (cate) =>
      cate.name.toLowerCase().includes(search.toLocaleLowerCase()) ||
      cate.description.toLowerCase().includes(search.toLocaleLowerCase())
  );
  return (
    <>
      <div className="grid grid-cols-10 gap-5 p-5">
        {/* Heading spanning all 3 columns */}
        <h1 className="col-span-3 text-3xl font-bold">List Categories</h1>

        {/* Form with text input and button */}
        <form action="" className="col-span-5 flex items-center space-x-2 mr-5">
          <input
            type="text"
            className="border border-gray-300 rounded px-4 py-2 w-full"
            placeholder="Search categories"
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
          ADD CATEGORY
        </button>
      </div>

      <div
        className="p-3"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  #
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Name_Categories
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Description
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filterCate
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((cate, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">
                      {page * rowsPerPage + index + 1}
                    </TableCell>
                    <TableCell align="center">{cate.name}</TableCell>
                    <TableCell align="center">{cate.description}</TableCell>
                    <TableCell align="center">
                      <div className="flex justify-center">
                        <div className="mr-3">
                          <Buttons
                            variant="contained"
                            color="success"
                            onClick={ () => {
                              handleResetUpdate();
                              setCategory(cate);
                            }}
                          >
                            {/* icon edit */}
                            <i class="fa-solid fa-pen-to-square p-2"></i>
                          </Buttons>
                        </div>
                        <div className="mr-3">
                          <Buttons
                            variant="contained"
                            color="error"
                            onClick={() => {
                              setOpen_dele(true);
                              setDele(cate);
                            }}
                          >
                            {/* icon delete */}
                            <i class="fa-solid fa-trash p-2"></i>
                          </Buttons>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={list_cate.length}
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

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box component="form" sx={style} onSubmit={handleSubmit}>
          <Typography variant="h5" component="h2" gutterBottom>
            {category.id ? "Update Category" : "Add New Category"}
          </Typography>

          <TextField
            label="Category Name"
            name="name"
            variant="outlined"
            value={category.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
          />

          <TextField
            label="Description"
            name="description"
            variant="outlined"
            multiline
            rows={4}
            value={category.description}
            onChange={handleChange}
            error={!!errors.description}
            helperText={errors.description}
          />

          <Button type="submit" variant="contained" color="primary">
            {category.id ? "UPDATE CATEGORY" : "ADD CATEGORY"}
          </Button>
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

export default Categories;
