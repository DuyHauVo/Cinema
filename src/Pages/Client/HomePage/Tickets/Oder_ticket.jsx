import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TV_Leds from "../../../../Assets/bg/TV_LED.png";
import Ticket from "./Ticket";
import { ContextRooms } from "../../../../Context/ContextRoom/RoomContext";
import { Box } from "@mui/material";
import {
  getObjectById,
  listObjectById,
  listObjectById_Movie,
} from "../../../../Services/Repository";
import { ContextMovie_Screening } from "../../../../Context/Movie_ScreeningContext";
import { ContextChairs } from "../../../../Context/ContextChair/ChairsContext";
import chair_yl from "../../../../Assets/logo/chairs_yl.png";
import chair_gray from "../../../../Assets/logo/seat_gray.png";
import chair_end from "../../../../Assets/logo/chairs_end.png";
import chair_vip from "../../../../Assets/logo/seat-vip.png";
import chair_couple from "../../../../Assets/logo/seat-couple.png";
import { ContextBooking } from "../../../../Context/BookingContext";
import { ContextTicket } from "../../../../Context/Client/OldTicket/TicketContext";
import { ContextLogin } from "../../../../Context/LoginContext";
function Oder_ticket(props) {
  const [listChairs, setListChairs] = useState([]);
  const [idChairs, setIdChair] = useState(null);

  const { booking, setBooking } = useContext(ContextBooking);
  const { isLogin } = useContext(ContextLogin);
  const movie_Screening = useContext(ContextMovie_Screening);
  const createTickets = useContext(ContextTicket);
  const list_rooms = useContext(ContextRooms);
  const chairs = useContext(ContextChairs);
  const listMovie_Screening = useContext(ContextMovie_Screening);

  const handleDesign = () => {
    const Result = chairs.sort((a, b) => {
      const regex = /([A-Z]+)(\d+)/; // Tách chữ cái và số
      const [, letterA, numberA] = a.name.match(regex); // Tách cho ghế a
      const [, letterB, numberB] = b.name.match(regex); // Tách cho ghế b
      // So sánh chữ cái trước
      if (letterA === letterB) {
        // Nếu chữ cái giống nhau, so sánh số
        return parseInt(numberA) - parseInt(numberB);
      }
      return letterA.localeCompare(letterB); // So sánh chữ cái
    });
    setListChairs([...Result]);
  };

  const handleRooms = listObjectById_Movie(
    booking.id_movie,
    listMovie_Screening,
    "movie"
  )?.list_room.sort((a, b) => {
    const nameA = getObjectById(a, list_rooms)?.name?.toLowerCase() || "";
    const nameB = getObjectById(b, list_rooms)?.name?.toLowerCase() || "";
    return nameA.localeCompare(nameB); // Sắp xếp theo thứ tự chữ cái
  });

  useEffect(() => {
    handleChooseRoom();
  }, []);

  const handleChooseRoom = (doc) => {
    if (doc !== booking.handleRooms) {
      setBooking({ ...booking, listChairs: [], handleRooms: doc });
    }
  };

  const handleChooseChairs = (doc) => {
    const check = booking.listChairs?.find((a) => a === doc.id);
    if (check) {
      const newChairs = booking.listChairs?.filter((a) => a !== doc.id);
      setBooking({
        ...booking,
        listChairs: newChairs,
      });
    } else {
      setBooking({
        ...booking,
        listChairs: [...booking?.listChairs, doc.id],
      });
    }
  };
  const checkChair = (id) => {
    return booking.listChairs.find((a) => a === id);
  };
  const getchairs = (id) => {
    return idChairs.find((e) => e === id);
  };

  const handleCheckChair = (id) => {
    const date_Screenig = listObjectById_Movie(
      booking.id_movie,
      movie_Screening,
      "movie"
    )?.date;

    return createTickets?.some(
      (e) =>
        e.id_movie_screening === booking.id_movie_screening &&
        e.id_movie === booking.id_movie &&
        e.time === booking.time &&
        e.handleRooms == booking?.handleRooms &&
        e.listChairs.some((e) => e === id)
    );
  };
  console.log(booking);
  function convertTimestamps(item) {
    if (item.date && item.date.seconds) {
      const date = new Date(item.date.seconds * 1000);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    }
  }

  return (
    <div>
      <div className=" mt-5">
        <h2 className="text-red-500 text-2xl font-bold text-center pb-3">
          MÀN HÌNH
        </h2>
        <img className="w-[850px] h-auto m-auto" src={TV_Leds} alt="" />
        <Box className="flex">
          <Box className="flex-1 flex gap-3 flex-col pl-10">
            <div className="flex">
              <img className="w-10 h-10" src={chair_gray} alt="" />
              <p className="p-2">Ghế Đã Bán</p>
            </div>
            <div className="flex">
              <img className="w-10 h-10" src={chair_yl} alt="" />
              <p className="p-2">Ghế Đang Chọn</p>
            </div>
            <div className="flex">
              <img className="w-10 h-10" src={chair_couple} alt="" />
              <p className="p-2">Ghế Đôi</p>
            </div>
            <div className="flex">
              <img className="w-10 h-10" src={chair_end} alt="" />
              <p className="p-2">Ghế Thường</p>
            </div>
            <div className="flex">
              <img className="w-10 h-10" src={chair_vip} alt="" />
              <p className="p-2">Ghế Vip</p>
            </div>
          </Box>
          <Box className="md:w-[48vw]">
            <div className="flex flex-wrap">
              {listChairs.map((data) => (
                <div
                  className="p-1 rounded-lg border-gray-300 relative m-auto"
                  onClick={() => {
                    if (getchairs(data.id) && !handleCheckChair(data.id)) {
                      handleChooseChairs(data); // Chỉ gọi hàm nếu `getchairs` trả về true
                    }
                  }}
                >
                  {}
                  <img
                    src={
                      handleCheckChair(data.id)
                        ? chair_gray
                        : checkChair(data.id)
                        ? chair_yl
                        : data.imgUrl
                    }
                    alt="seat"
                    className={`md:w-10 md:h-10 w-[34px] h-[34px] object-cover ${
                      getchairs(data.id) ? "opacity-100" : "opacity-0"
                    }`}
                  />
                  {getchairs(data.id) && (
                    <p className="absolute text-xs text-black top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 pb-1 font-medium">
                      {data.name}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </Box>
          <Box className="flex-1">
            <div className="flex md:justify-end justify-center">
              {handleRooms?.map((doc) => (
                <div className="p-3" key={doc}>
                  <button
                    onClick={() => {
                      handleDesign();
                      setIdChair(getObjectById(doc, list_rooms)?.chairs);
                      handleChooseRoom(doc);
                    }}
                    className={`px-4 py-2 rounded-md ${
                      booking.handleRooms === doc
                        ? "bg-green-500 text-white hover:bg-green-600"
                        : "bg-red-500 text-white hover:bg-red-600"
                    }`}
                  >
                    {getObjectById(doc, list_rooms)?.name ||
                      "Tên không xác định"}
                  </button>
                </div>
              ))}
            </div>
          </Box>
        </Box>
      </div>
      <div className="md:h-[50vh]"></div>
      <div
        className=" bg-white w-full  md:fixed bottom-0"
        style={{
          boxShadow:
            "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
        }}
      >
        <Ticket />
      </div>
    </div>
  );
}

export default Oder_ticket;
