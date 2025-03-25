import React, { useContext, useEffect, useState } from "react";
import { ContextTicket } from "../../../Context/Client/OldTicket/TicketContext";
import DashboardCharts from "./DashboardCharts";
import { getObjectById } from "../../../Services/Repository";
import { ContextMovies } from "../../../Context/MoviesContext";
import DashboardPi from "./DashboardPi";
import { ContextRooms } from "../../../Context/ContextRoom/RoomContext";
import { ContextTheaters } from "../../../Context/TheaterContext";
import { TablePagination } from "@mui/material";
import { ContextLocations } from "../../../Context/ContextRoom/LocationContext";

function Dashboard(props) {
  const [topMovie, setTopMovie] = useState([]);
  const [topTheaters, setTopTheaters] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [top5Movie, setTop5Movie] = useState([]);
  const [top5Theaters, setTop5Theaters] = useState([]);

  const listBooking = useContext(ContextTicket);
  const listRoom = useContext(ContextRooms);
  const listTheater = useContext(ContextTheaters);
  const movies = useContext(ContextMovies);
  const locations = useContext(ContextLocations);
  useEffect(() => {
    const dataMovie = [];
    listBooking?.map((element) => {
      const index = dataMovie.findIndex((e) => e.id == element.id_movie);
      if (index != -1) {
        dataMovie[index].total += element.priceTicket;
        dataMovie[index].totalNumberChairs += element.listChairs.length;
      } else {
        dataMovie.push({
          id: element.id_movie,
          name: getObjectById(element.id_movie, movies)?.name,
          total: element.priceTicket,
          totalNumberChairs: element.listChairs.length,
        });
      }
    });
    setTopMovie(dataMovie);
  }, [listBooking, movies]);

  useEffect(() => {
    const result = [];
    listBooking.map((element) => {
      const arrTheater = result.findIndex(
        (e) =>
          e.id ==
          getObjectById(
            getObjectById(element.handleRooms, listRoom)?.theater,
            listTheater
          )?.id
      );
      if (arrTheater != -1) {
        result[arrTheater].total += element.priceTicket + element.priceCombo;
      } else {
        result.push({
          id: getObjectById(
            getObjectById(element.handleRooms, listRoom)?.theater,
            listTheater
          )?.id,
          name: getObjectById(
            getObjectById(element.handleRooms, listRoom)?.theater,
            listTheater
          )?.name,
          adress: getObjectById(
            getObjectById(element.handleRooms, listRoom)?.theater,
            listTheater
          )?.adress,
          location: getObjectById(
            getObjectById(element.handleRooms, listRoom)?.district,
            locations
          )?.district,
          total: element.priceTicket + element.priceCombo,
        });
      }
    });
    setTopTheaters(result);
  }, [listBooking, listRoom, listTheater]);

  useEffect(() => {
    setTop5Movie(topMovie.sort((a, b) => b.total - a.total));
  }, [topMovie]);
  useEffect(() => {
    setTop5Theaters(topTheaters.sort((a, b) => b.total - a.total));
  }, [topTheaters]);
  console.log(top5Theaters);
  return (
    <div className="grid grid-cols-2 gap-3 p-10 bg-white">
      <div className="chart grid grid-rows-3 gap-3">
        <div className="row-span-1">
          <DashboardCharts topMovie={topMovie} />
        </div>
        <div className="bg-black h-[780px] row-span-2 p-3 rounded-2xl shadow-md overflow-y-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-black text-white border-b-2 border-white">
                <th className="p-3 text-center">ID</th>
                <th className="p-3 text-center">Image</th>
                <th className="p-3 text-center">Name</th>
                <th className="p-3 text-center">Total</th>
                <th className="p-3 text-center">Total chair</th>
              </tr>
            </thead>
            <tbody>
              {top5Movie.map((e, index) => (
                <tr className="bg-black text-white border-b-2 border-white">
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">
                    <img
                      src={getObjectById(e.id, movies)?.imgUrl}
                      alt="Avatar 1"
                      className="w-20 h-auto m-auto"
                    />
                  </td>
                  <td className="p-3 text-center">
                    {getObjectById(e.id, movies)?.name}
                  </td>

                  <td className="p-3 text-center">
                    {parseInt(e.total).toLocaleString("vi-VN") + "đ"}
                  </td>
                  <td className="p-3 text-center">{e.totalNumberChairs}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center mt-4">
          <TablePagination
            rowsPerPageOptions={[5, 10]}
            //  ko phai là listBooking
            count={Math.min(5, top5Movie.length)}
            component="div"
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(e, page) => setPage(page)}
            onRowsPerPageChange={(e) => {
              setRowsPerPage(parseInt(e.target.value, 10));
              setPage(0);
            }}
          />
        </div>
      </div>
      <div className="p grid grid-rows-3 gap-3">
        <div className="row-span-1">
          <DashboardPi topTheaters={topTheaters} />
        </div>
        <div
          className={`bg-black h-[780px] row-span-2 p-3 rounded-2xl shadow-md overflow-y-auto ${
            top5Theaters.length > 6 ? "" : "-mt-7"
          }`}
        >
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-black text-white border-b-2 border-white">
                <th className="p-3 text-center">ID</th>
                <th className="p-3 text-center">Name</th>
                <th className="p-3 text-center">Adress</th>
                <th className="p-3 text-center">Location</th>
                <th className="p-3 text-center">Total</th>
              </tr>
            </thead>
            <tbody>
              {top5Theaters.map((e, index) => (
                <tr className="bg-black text-white border-b-2 border-white">
                  <td className="p-5 text-center">{index + 1}</td>
                  <td className="p-5 text-center">{e.name}</td>
                  <td className="p-5 text-center">{e.adress}</td>
                  <td className="p-5 text-center">{e.location}</td>

                  <td className="p-5 text-center">
                    {parseInt(e.total).toLocaleString("vi-VN") + "đ"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {top5Theaters.length > 6 && (
          <div className="flex justify-center mt-4">
            <TablePagination
              rowsPerPageOptions={[5, 10]}
              count={Math.min(5, top5Theaters.length)}
              component="div"
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={(e, page) => setPage(page)}
              onRowsPerPageChange={(e) => {
                setRowsPerPage(parseInt(e.target.value, 10));
                setPage(0);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
