import React, { useContext, useState } from "react";
import { Button, TextField } from "@mui/material";
import { ContextLogin } from "../../../Context/LoginContext";
import { ContextTicket } from "../../../Context/Client/OldTicket/TicketContext";
import { getObjectById, listObjectById } from "../../../Services/Repository";
import { ContextMovies } from "../../../Context/MoviesContext";
import { ContextChairs } from "../../../Context/ContextChair/ChairsContext";

function About_Us(props) {
  const { isLogin } = useContext(ContextLogin);
  const oldTicket = useContext(ContextTicket);
  const movies = useContext(ContextMovies);
  const chairs = useContext(ContextChairs);
  const listObjectTicket = listObjectById(isLogin.id, oldTicket, "id_user");
  return (
    <div className="flex h-screen">
      <div className="w-1/3 h-full fixed  p-5">
        <div className="w-[350px] h-[350px] mx-auto object-cover ">
          <img
            src={isLogin?.imgUrl}
            alt="Avatar"
            className=" rounded-full  p-2 "
            style={{
              boxShadow: " rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
            }}
          />
        </div>
        <div className="bg-slate-200 p-4  mt-3 rounded-lg ml-2">
          <div className="flex gap-3 mb-3">
            <TextField
              disabled
              id="standard-disabled"
              value={`Name: ${isLogin?.username}`}
              variant="standard"
              className="w-1/2"
            />
            <TextField
              disabled
              id="standard-disabled"
              value={`Phone: ${isLogin?.phone}`}
              variant="standard"
              className="w-1/2"
            />
          </div>
          <TextField
            fullWidth
            disabled
            id="standard-disabled"
            value={`Email: ${isLogin?.email}`}
            variant="standard"
            style={{
              marginBottom: "12px",
            }}
          />
          <TextField
            fullWidth
            disabled
            type="password"
            id="standard-disabled"
            defaultValue="1222121"
            variant="standard"
          />
          <div className="w-full mt-2">
            <Button
              className="w-full"
              style={{
                backgroundImage:
                  "linear-gradient(120deg, #89f7fe 0%, #66a6ff 100%)",
              }}
              variant="soft"
            >
              Cập Nhật
            </Button>
          </div>
        </div>
      </div>
      <div className="w-2/3 h-full ml-auto flex justify-end bg-white p-6 overflow-y-auto">
        <div className="w-full bg-gray-100 mt-4 p-4 rounded-lg shadow-lg">
          <h2 className="text-xl text-center font-bold mb-2">Vé đã đặt</h2>
          {listObjectTicket.map((ticket) => (
            <div className="flex justify-around border border-solid border-black p-5 rounded-md mb-5">
              <ul>
                <li>
                  🎟 Name Movie: {getObjectById(ticket.id_movie, movies)?.name}
                </li>
                <li>🎟 date & time: {ticket.date.toDate().toDateString()}</li>
                <li>
                  🎟 Chairs:{" "}
                  {ticket.listChairs.map(
                    (a) => getObjectById(a, chairs)?.name + ","
                  )}
                </li>
              </ul>
              <ul>
                <li>
                  🎟 Status:
                  {ticket.transactionId ? (
                    <span>đã thanh toán</span>
                  ) : (
                    <span>chưa thanh toán</span>
                  )}
                </li>
                <li>
                  🎟 Price Combo:{" "}
                  {parseInt(ticket.priceCombo).toLocaleString("vi-VN") + "đ"}
                </li>
                <li>
                  🎟 Price Ticket:{" "}
                  {parseInt(ticket.priceTicket).toLocaleString("vi-VN") + "đ"}
                </li>
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default About_Us;
