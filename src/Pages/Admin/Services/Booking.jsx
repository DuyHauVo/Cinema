import React, { useContext, useState } from "react";
import {
  Button,
  TablePagination,
  TableRow,
  Box,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  Tooltip,
} from "@mui/material";
import { ContextTicket } from "../../../Context/Client/OldTicket/TicketContext";
import { getObjectById } from "../../../Services/Repository";
import { ContextServices } from "../../../Context/ContextService/ServiceContext";
import { ContextRooms } from "../../../Context/ContextRoom/RoomContext";
import { ContextMovies } from "../../../Context/MoviesContext";
import { ContextUsers } from "../../../Context/Client/UserConetxt";
import { ContextChairs } from "../../../Context/ContextChair/ChairsContext";
import Button_Delete from "../../Button_Delete";
import { deleteDocument } from "../../../Services/Service_Firebase";

function Booking(props) {
  const [dele, setDele] = useState("");
  const [open_dele, setOpen_dele] = useState(false);
  const handleClose_Dele = () => setOpen_dele(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState("");

  const oldTicket = useContext(ContextTicket);
  const services = useContext(ContextServices);
  const movies = useContext(ContextMovies);
  const rooms = useContext(ContextRooms);
  const users = useContext(ContextUsers);
  const chairs = useContext(ContextChairs);

  const handleDelete = async () => {
    try {
      await deleteDocument("createTicket", dele);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="grid grid-cols-10 gap-5 p-5">
        {/* Heading spanning all 3 columns */}
        <h1 className="col-span-3 text-3xl font-bold">List Ticket</h1>

        {/* Form with text input and button */}
        <form action="" className="col-span-5 flex items-center space-x-2 mr-5">
          <input
            type="text"
            className="border border-gray-300 rounded px-4 py-2 w-full"
            placeholder="Search Ticket"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="bg-blue-500 text-white px-5 py-2 rounded">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </form>

        {/* Button for opening modal */}
        {/* <button
          className="col-span-2 bg-green-500 text-white px-4 py-2 rounded"
          onClick={() => {
            // handleReset();
          }}
        >
          ADD CATEGORY
        </button> */}
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
                  Poster
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Room
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Date & Time
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Email_user
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Combo
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Chairs
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Total
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            {oldTicket
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((doc) => (
                <TableBody>
                  <TableRow
                    // key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">
                      <img
                        className="w-20 h-auto mx-auto"
                        src={getObjectById(doc.id_movie, movies)?.imgUrl}
                        alt=""
                      />
                    </TableCell>
                    <TableCell align="center">
                      {getObjectById(doc.handleRooms, rooms)?.name}
                    </TableCell>
                    <TableCell align="center">
                      {doc.date.toDate().toDateString() + " - " + doc.time}
                    </TableCell>
                    <TableCell align="center">
                      {getObjectById(doc.id_user, users)?.email}
                    </TableCell>
                    <TableCell align="center">
                      <Button class="relative group-tolit ">
                        <p className="font-bold">Combo</p>
                        <Box className="absolute hidden tooplit">
                          {doc.combo.map(
                            (a) => getObjectById(a.id, services)?.name
                          )}
                        </Box>
                      </Button>
                    </TableCell>
                    <TableCell align="center">
                      {doc.listChairs.map(
                        (a) => getObjectById(a, chairs)?.name + ", "
                      )}
                    </TableCell>
                    <TableCell>
                      {parseInt(
                        doc.priceCombo + doc.priceTicket
                      ).toLocaleString("vi-VN") + "đ"}
                    </TableCell>
                    <TableCell align="center">
                      <div className="flex justify-center">
                        <div className="mr-3">
                          {/* <Button
                          variant="contained"
                          color="success"
                          onClick={() => {
                          }}
                        >
                          <i class="fa-solid fa-pen-to-square p-2"></i>
                        </Button> */}
                        </div>
                        <div className="mr-3">
                          <Button
                            variant="contained"
                            color="error"
                            onClick={() => {
                              setOpen_dele(true);
                              setDele(doc.id);
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
            rowsPerPageOptions={[10, 20]}
            page={page}
            rowsPerPage={rowsPerPage}
            count={oldTicket.length}
            component="div"
            onPageChange={(e, newpage) => setPage(newpage)}
            onRowsPerPageChange={(event) => {
              setRowsPerPage(parseInt(event.target.value, 10));
              setPage(0);
            }}
          />
        </TableContainer>
        <Button_Delete
          open_dele={open_dele}
          handleClose_Dele={handleClose_Dele}
          handleDelete={handleDelete}
        />
      </div>
    </>
  );
}

export default Booking;
