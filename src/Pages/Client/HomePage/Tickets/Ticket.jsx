import React, { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  getObjectById,
  listObjectById_Movie,
} from "../../../../Services/Repository";
import { ContextMovie_Screening } from "../../../../Context/Movie_ScreeningContext";
import { ContextMovies } from "../../../../Context/MoviesContext";
import { ContextRooms } from "../../../../Context/ContextRoom/RoomContext";
import { ContextTheaters } from "../../../../Context/TheaterContext";
import { ContextLocations } from "../../../../Context/ContextRoom/LocationContext";
import { ContextChairs } from "../../../../Context/ContextChair/ChairsContext";
import { ContextType_Chairs } from "../../../../Context/ContextChair/Type_ChairsContext";
import { useNotification } from "../../../../Context/Client/NotificationProvider";
import { ContextServices } from "../../../../Context/ContextService/ServiceContext";
import { ContextBooking } from "../../../../Context/BookingContext";
import { ContextLogin } from "../../../../Context/LoginContext";

function Ticket() {
  const [nameChairs, setNameChairs] = useState("");

  const movie_Screening = useContext(ContextMovie_Screening);
  const movie = useContext(ContextMovies);
  const room = useContext(ContextRooms);
  const theater = useContext(ContextTheaters);
  const location = useContext(ContextLocations);
  const chairs = useContext(ContextChairs);
  const type_Chairs = useContext(ContextType_Chairs);
  const services = useContext(ContextServices);
  const { booking, setBooking } = useContext(ContextBooking);
  const { isLogin } = useContext(ContextLogin);

  const loca = useLocation();
  const path = loca.pathname;

  const navigation = useNavigate();
  const showAlert = useNotification();

  const date_Screenig = listObjectById_Movie(
    booking.id_movie,
    movie_Screening,
    "movie"
  )?.date;

  const nameTheater = getObjectById(
    listObjectById_Movie(booking.id_movie, movie_Screening, "movie")
      ?.list_room[0],
    room
  )?.theater;

  useEffect(() => {
    let result = "";
    const chairsName = booking.listChairs?.map((item) => {
      const chairItem = chairs.find((doc) => doc.id === item);
      return chairItem ? chairItem.name : "ghế ko có";
    });
    chairsName.map((e, i) => {
      if (i % 7 == 0 && i > 0) {
        result += e + "\n";
      } else {
        result += e + ",";
      }
    });

    setNameChairs(result);
  }, [booking.listChairs]);

  const price = booking.listChairs?.reduce(
    (sum, e) =>
      sum +
      parseInt(
        getObjectById(getObjectById(e, chairs)?.type, type_Chairs)?.price
      ),
    0
  );

  const a = booking.combo?.reduce(
    (sum, doc) => sum + getObjectById(doc.id, services).price * doc.quantity,
    0
  );

  const handlecompo = () => {
    if (nameChairs.length <= 0) {
      showAlert("Registration successful", "error");
    } else if (path === "/composervice") {
      if (isLogin === null) {
        showAlert(" Please log in", "error");
        setBooking({ ...booking, priceTicket: price, priceCombo: a });
        return;
      }
      navigation("/pay");
      setBooking({ ...booking, priceTicket: price, priceCombo: a });
    } else {
      navigation("/composervice");
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-3">
        {/* Cột bên trái */}
        <div className=" md:col-span-1 flex md:ml-20">
          <div className="mb-4">
            <img
              className="w-32 h-auto px-2 m-auto"
              src={getObjectById(booking.id_movie, movie)?.imgUrl}
              alt="Image"
            />
          </div>
          <div className="ml-5 my-auto">
            <ul>
              <li>
                <strong>Phim: </strong>{" "}
                <span>{getObjectById(booking.id_movie, movie)?.name}</span>
              </li>
              <li>
                <strong>Rạp: </strong>
                <span>{getObjectById(nameTheater, theater)?.name} </span>
                <span>
                  {
                    getObjectById(
                      getObjectById(nameTheater, theater)?.district,
                      location
                    )?.district
                  }
                </span>
              </li>
              <li>
                <strong>Phòng:</strong>{" "}
                <span>{getObjectById(booking.handleRooms, room)?.name}</span>
              </li>
              <li>
                <strong>Xuất: </strong>{" "}
                <span>
                  {booking.time
                    ? `${booking.time} - ${new Date(
                        date_Screenig
                      ).toLocaleDateString("vi-VN")}`
                    : `${booking.time} - ${new Date(
                        date_Screenig
                      ).toLocaleDateString("vi-VN")}`}
                </span>
              </li>
              <li>
                <strong>Thể Loại: </strong>
                <span>2D Phụ Đề</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Cột bên phải */}
        <div className=" md:col-span-1 md:grid md:grid-cols-3 w-full gap-4">
          <div className="md:my-auto ">
            <ul>
              <li>
                <strong>Ghế:</strong> <span>{nameChairs}</span>
              </li>
              <li>
                <strong>Combo:</strong>{" "}
                <span className="text-sm">
                  {booking.combo?.map(
                    (e) => getObjectById(e.id, services)?.name
                  ) + ","}
                </span>
              </li>
              <li>
                <strong>Tổng Tiền:</strong>
                <span>
                  {parseInt(price + a).toLocaleString("vi-VN") + " đ"}
                </span>
              </li>
            </ul>
          </div>
          <div className="my-auto">
            <ul>
              <li>
                <strong>Tiền vé:</strong>{" "}
                <span>{parseInt(price).toLocaleString("vi-VN") + " đ"}</span>
              </li>
              <li>
                <strong>Tiền Combo:</strong>{" "}
                <span>{parseInt(a).toLocaleString("vi-VN") + " đ"}</span>
              </li>
            </ul>
          </div>
          <div className="my-auto">
            <button
              className="bg-red-500 rounded-full w-full p-4 text-lg font-semibold text-white"
              onClick={handlecompo}
            >
              NEXT
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Ticket;
