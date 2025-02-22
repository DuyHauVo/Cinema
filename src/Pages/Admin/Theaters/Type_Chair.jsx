import React, { useState, useEffect, useContext } from "react";
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
} from "@mui/material";
import Button_Delete from "../../Button_Delete";
import {
  addDocument,
  fetchDocuments,
  deleteDocument,
  updateDocument,
} from "../../../Services/Service_Firebase";

import "../../../Styles/Region.css";
import { ContextType_Chairs } from "../../../Context/ContextChair/Type_ChairsContext";

function Type_Chair(props) {
  const [open, setOpen] = useState(false);
  const [open_dele, setOpen_dele] = useState(false);
  const [errors, setErrors] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const list_Type_Chairs = useContext(ContextType_Chairs);
  const [dele, setDele] = useState(null);
  const [search, setSearch] = useState("");
  const [type_Chairs, setType_Chairs] = useState({
    name: "",
    price: "",
  });

  const handleClose = () => setOpen(false);
  const handleClose_Dele = () => setOpen_dele(false);

  const handleChange = async (e) => {
    setType_Chairs({
      ...type_Chairs,
      [e.target.name]: e.target.value,
    });
  };

  // #region ADD
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!validation()) {
        return;
      }
      if (type_Chairs.id) {
        await updateDocument("type_chairs", type_Chairs.id, type_Chairs);
      } else {
        await addDocument("type_chairs", type_Chairs);
      }
    } catch (error) {
      console.log(error);
    }
    setOpen(false);
    setType_Chairs({});
  };

  // #region DELETE
  const handleDelete = async () => {
    try {
      await deleteDocument("type_chairs", dele.id);
    } catch (error) {
      console.log(error);
    }
  };
  // #region VALIDATION
  const validation = () => {
    const NewError = {};
    NewError.name = type_Chairs.name ? "" : "Vui lòng nhập tên ghế";
    NewError.price = type_Chairs.price ? "" : "Vui lòng nhập giá ghế";
    setErrors(NewError);
    return !NewError.name && !NewError.price;
  };

  // #region SEARCH
  const fillterType_chairs = list_Type_Chairs.filter(
    (type) =>
      type.name.toLowerCase().includes(search.toLocaleLowerCase()) ||
      type.price.toLowerCase().includes(search.toLocaleLowerCase())
  );

  // reset lại button add
  const handleReset = () => {
    setOpen(true);
    setType_Chairs({});
  };

  // reset và truyền dữ liệu vào hàm update
  const handleResetUpdate = (type) => {
    setOpen(true);
    setType_Chairs(type);
    setErrors({});
  };

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
  return (
    <>
      <div className="grid grid-cols-10 gap-5 p-5 ">
        {/* Heading spanning all 3 columns */}
        <h1 className="col-span-3 text-3xl font-bold ">List Type Chairs</h1>

        {/* Form with text input and button */}
        <form action="" className="col-span-5 flex items-center space-x-2 mr-5">
          <input
            type="text"
            className="border border-gray-300 rounded px-4 py-2 w-full"
            placeholder="Search Type_Chairs"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="bg-blue-500 text-white px-5 py-2 rounded">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </form>

        {/* Button for opening modal */}
        <button
          className="col-span-2 bg-green-500 text-white px-4 py-2 rounded"
          onClick={() => handleReset()}
        >
          ADD TYPE_CHAIRS
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
                Name Chairs
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Price Chairs
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fillterType_chairs
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((type, index) => (
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">
                    {page * rowsPerPage + index + 1}
                  </TableCell>
                  <TableCell align="center">{type.name}</TableCell>
                  <TableCell align="center">
                    {parseInt(type.price).toLocaleString("vi-VN") + " đ"}
                  </TableCell>
                  <TableCell align="center">
                    <div className="flex justify-center">
                      <div className="mr-2">
                        <Button
                          variant="contained"
                          color="success"
                          onClick={() => {
                            handleResetUpdate(type);
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
                            setDele(type);
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
          count={list_Type_Chairs.length}
          page={page}
          component="div"
          onPageChange={(event, newPage) => setPage(newPage)}
          onRowsPerPageChange={(event) => {
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
      >
        <Box component="form" sx={style} onSubmit={handleSubmit}>
          <Typography variant="h5" component="h2" gutterBottom>
            {type_Chairs.id ? "UPDATE TYPE_CHAIRS" : "ADD TYPE_CHAIRS"}
          </Typography>

          <TextField
            label="Name Type_Chairs"
            name="name"
            variant="outlined"
            value={type_Chairs.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            label="Price Type_Chairs"
            name="price"
            variant="outlined"
            value={type_Chairs.price}
            onChange={handleChange}
            error={!!errors.price}
            helperText={errors.price}
          />

          <Button type="submit" variant="contained" color="primary">
            {type_Chairs.id ? "UPDATE TYPE_CHAIRS" : "ADD TYPE_CHAIRS"}
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

export default Type_Chair;
