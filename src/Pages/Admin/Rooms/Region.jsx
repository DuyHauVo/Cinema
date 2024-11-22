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
import { ContextRegions } from "../../../Context/ContextRoom/RegionsContext";

function Region(props) {
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleClose_Dele = () => setOpen_dele(false);
  const [open, setOpen] = useState(false);
  const [open_dele, setOpen_dele] = useState(false);
  const [dele, setDele] = useState(null);
  const [errors, setErrors] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState("");
  const [regions, setRegion] = useState({
    name: "",
  });

  const list_region = useContext(ContextRegions);

  const handleChange = (e) => {
    setRegion({
      ...regions,
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
      if (regions.id) {
        const { id, ...newObjectWithoutId } = regions;
        await updateDocument("regions", regions.id, newObjectWithoutId);
      } else {
        await addDocument("regions", regions);
      }
    } catch (error) {
      console.log(error);
    }
    handleClose();
    setRegion({});
  };

  //   #region DELETE
  const handleDelete = async () => {
    try {
      await deleteDocument("regions", dele.id);
    } catch (error) {
      console.log(error);
    }
  };
  //   #region VALIDATION
  const validation = () => {
    const NewError = {};
    NewError.name = regions.name ? "" : "Vui lòng nhập vùng";
    setErrors(NewError);
    return !NewError.name;
  };
  // #region SEARCH
  const fillterRegion = list_region.filter((region) =>
    region.name.toLowerCase().includes(search.toLocaleLowerCase())
  );
  const handleReset = () => {
    handleOpen();
    setRegion({});
  };
  const handleResetUpdate = (region) => {
    handleOpen();
    setRegion(region);
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
      <div className="grid grid-cols-10 gap-5 p-5">
        {/* Heading spanning all 3 columns */}
        <h1 className="col-span-3 text-3xl font-bold ">List Regions</h1>

        {/* Form with text input and button */}
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
          ADD REGIONS
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
                Name Region
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fillterRegion
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((region, index) => (
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="center">{region.name}</TableCell>
                  <TableCell align="center">
                    <div className="flex justify-center">
                      <div className="mr-2">
                        <Button
                          variant="contained"
                          color="success"
                          onClick={() => {
                            handleResetUpdate(region);
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
                            setDele(region);
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
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={list_region.length}
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
            {regions.id ? "UPDATE REGION" : "ADD REGION"}
          </Typography>

          <TextField
            label="Region Name"
            name="name"
            variant="outlined"
            value={regions.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
          />

          <Button type="submit" variant="contained" color="primary">
            {regions.id ? "UPDATE REGION" : "ADD REGION"}
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

export default Region;
