import React, { useContext, useEffect, useRef } from "react";
import { Checkbox } from "@mui/material";
import { ContextBooking } from "../../../../Context/BookingContext";
import JsBarcode from "jsbarcode";
import logo from "../../../../Assets/logo/hau_admin-removebg-preview.png";
import bap from "../../../../Assets/logo/bắp.webp";
import {
  getObjectById,
  listObjectById_Movie,
} from "../../../../Services/Repository";
import { ContextMovies } from "../../../../Context/MoviesContext";
import { ContextRooms } from "../../../../Context/ContextRoom/RoomContext";
import { ContextTheaters } from "../../../../Context/TheaterContext";
import { ContextLocations } from "../../../../Context/ContextRoom/LocationContext";
import { ContextChairs } from "../../../../Context/ContextChair/ChairsContext";
import { ContextType_Chairs } from "../../../../Context/ContextChair/Type_ChairsContext";
import { ContextServices } from "../../../../Context/ContextService/ServiceContext";
import { ContextMovie_Screening } from "../../../../Context/Movie_ScreeningContext";
import { ContextLogin } from "../../../../Context/LoginContext";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { initialOptions } from "../../../../Utils/Contants";
import { addDocument } from "../../../../Services/Service_Firebase";
import { useNotification } from "../../../../Context/Client/NotificationProvider";
import { useNavigate } from "react-router-dom";

function FilePay(props) {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const { booking, setBooking } = useContext(ContextBooking);
  const barCode = useRef(null);

  const generateRandomCode = () => {
    return Math.floor(100000000000 + Math.random() * 900000000000).toString();
  };

  const barCodeValue = generateRandomCode();

  useEffect(() => {
    if (barCode.current) {
      JsBarcode(barCode.current, barCodeValue, {
        format: "CODE128",
        background: "transparent",
        displayValue: false, // Hiển thị số dưới mã vạch
        width: 2, // Độ rộng vạch
        height: 50, // Chiều cao mã vạch
      });
    }
  }, [barCodeValue]);

  const movie = useContext(ContextMovies);
  const room = useContext(ContextRooms);
  const theater = useContext(ContextTheaters);
  const location = useContext(ContextLocations);
  const chairs = useContext(ContextChairs);
  const movie_Screening = useContext(ContextMovie_Screening);
  const { isLogin } = useContext(ContextLogin);
  const showAlert = useNotification();
  const totalUseRef = useRef(0);
  const navigation = useNavigate();

  const nameTheater = getObjectById(
    listObjectById_Movie(booking.id_movie, movie_Screening, "movie")
      ?.list_room[0],
    room
  )?.theater;

  const date_Screenig = listObjectById_Movie(
    booking.id_movie,
    movie_Screening,
    "movie"
  )?.date;

  useEffect(() => {
    totalUseRef.current = booking.priceTicket + booking.priceCombo;
  }, [booking]);

  const createSecce = async (transactionId) => {
    if (transactionId) {
      await addDocument("createTicket", {
        ...booking,
        transactionId: transactionId,
        id_user: isLogin.id,
        date: new Date(),
      });
      showAlert("successful payment", "success");
      navigation("/");
      setBooking({ listChairs: [], combo : [] });
    } else {
      showAlert("unsuccessful payment", "error");
    }
  };

  return (
    <div>
      <div className="px-48 py-5">
        <h1 className=" p-3 text-center bg-gray-300 rounded-md text-3xl font-semibold ">
          THANH TOÁN
        </h1>
      </div>
      <div className="grid grid-cols-7 w-[1450px] gap-5 px-5 mx-auto">
        <div className="col-span-5 relative">
          <div className="w-full absolute top-1/2 -translate-y-1/2">
            <div
              className=" rounded-md"
              style={{
                backgroundImage:
                  "linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)",
                boxShadow:
                  "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
              }}
            >
              <div className="p-4  grid grid-cols-3">
                <div className="flex justify-center">
                  <img className="w-8 h-auto" src={logo} alt="" />
                  <span className="pl-2 text-base font-thin">H CINEMAS</span>
                </div>
                <div className="flex items-center justify-center">
                  <em>
                    <p className="text-3xl font-serif italic ">VÉ XEM PHIM</p>
                  </em>
                </div>
                <div className="flex items-center justify-center">
                  <img className="w-8 h-auto" src={logo} alt="" />
                  <span className="pl-2 text-base font-thin">H CINEMAS</span>
                </div>
              </div>

              <div className="grid grid-cols-3 p-5 bg-white">
                <div className="flex gap-2 ">
                  <img
                    className="w-36"
                    src={getObjectById(booking.id_movie, movie)?.imgUrl}
                    alt=""
                  />
                  <div>
                    <p className="border-b-[1px] border-b-solid border-black mb-4">
                      <em className="font-serif italic text-center">
                        {getObjectById(nameTheater, theater)?.name +
                          " - " +
                          getObjectById(
                            getObjectById(nameTheater, theater)?.district,
                            location
                          )?.district || "errr"}
                      </em>
                    </p>
                    <div className="pt-2">
                      <p>
                        <strong>Movie:</strong>{" "}
                        {getObjectById(booking.id_movie, movie)?.name ||
                          "Chưa chọn phim"}
                      </p>
                      <p className=" py-2">
                        <strong>Room: </strong>{" "}
                        {getObjectById(booking.handleRooms, room)?.name ||
                          "Chưa chọn rạp"}
                      </p>
                      <p>
                        <strong>Movie_Screening: </strong>
                        {booking.time}
                      </p>
                      <p className="py-2">
                        <strong>Date: </strong>
                        {new Date(date_Screenig).toLocaleDateString("vi-VN")}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="ml-2 mt-2">
                    <div className="text-red-500 flex justify-center gap-3">
                      {booking.listChairs.map((doc) => (
                        <span className="border border-[1px] border-red-500 inline-block p-2 rounded-md ">
                          {getObjectById(doc, chairs)?.name}
                        </span>
                      ))}
                    </div>
                    <div className="text-center">
                      <p className="pt-6">
                        <strong>Số lượng ghế</strong>
                      </p>
                      <p className="my-2 rounded-full border border-[1px] border-red-500 inline-block p-3">
                        {booking.listChairs.length}
                      </p>

                      <div className="py-2">
                        <p>
                          <strong>Tổng Tiền</strong>
                        </p>
                        <p>
                          {parseInt(booking.priceTicket).toLocaleString(
                            "vi-VN"
                          ) + " đ"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <img className="w-14 h-auto mx-auto" src={bap} alt="" />
                    <div className="text-center">
                      <p className="pt-5">
                        <strong>Số lượng Combo:</strong>
                      </p>
                      <p className="my-2 rounded-full border border-[1px] border-red-500 inline-block p-3">
                        {booking.combo.length}
                      </p>
                      <div className="py-2">
                        <p>
                          <strong>Tổng Tiền</strong>
                        </p>
                        <p>
                          {parseInt(booking.priceCombo).toLocaleString(
                            "vi-VN"
                          ) + " đ"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center pt-2 ">
                  {/* nét đứt */}
                  <div className="absolute top-0 left-[66,80%] h-full border-l-2 border-dashed border-gray-500"></div>

                  <div>
                    <p>
                      <strong>FULLNAME</strong>
                    </p>
                    <p>{isLogin.username}</p>
                  </div>
                  <div className="py-3">
                    <p>
                      <strong>EMAIL</strong>
                    </p>
                    <p>{isLogin.email}</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-1 ">
                <div className=" col-span-2 flex items-center justify-center text-3xl font-serif">
                  <p>Mã vé Phim: </p>
                  <svg ref={barCode}></svg>
                  {/* <p>{barCodeValue}</p> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-2">
          <div className="bg-gray-300 p-4 text-xl font-bold rounded text-center">
            <h1>THÔNG TIN THANH TOÁN</h1>
          </div>
          <div className="border border-gray-300 mt-2 px-7 text-lg font-semibold rounded">
            <div className="flex justify-between py-3 mb-3 ml-2">
              <div>
                <h1 className="py-2">COMBO:</h1>
                <h1>VÉ:</h1>
              </div>
              <div>
                <p className="py-2">
                  {parseInt(booking.priceTicket).toLocaleString("vi-VN") + "đ"}
                </p>
                <p>
                  {parseInt(booking.priceCombo).toLocaleString("vi-VN") + "đ"}
                </p>
              </div>
            </div>
            <div className="w-full h-[1px] bg-gray-500"></div>
            <div className="flex justify-between my-3">
              <h1 className="border-b-[1px] border-black px-2">TỔNG</h1>
              <p>
                {parseInt(
                  booking.priceTicket + booking.priceCombo
                ).toLocaleString("vi-VN") + "đ"}
              </p>
            </div>
            <div className="p-5">
              <div>
                <Checkbox {...label} />
                <span>VNPay</span>
              </div>
              <div>
                <Checkbox {...label} />
                <span>Ví Momo</span>
              </div>
              <div>
                <Checkbox {...label} />
                <span>MB Bank</span>
              </div>
            </div>
          </div>
          <PayPalScriptProvider options={initialOptions}>
            <PayPalButtons
              style={{ layout: "vertical" }}
              createOrder={(data, actions) => {
                const total = (totalUseRef.current / 24000).toFixed(2);
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: total,
                      },
                    },
                  ],
                });
              }}
              onApprove={(data, actions) => {
                return actions.order.capture().then((details) => {
                  const transactionId = details.id; // Lấy ID giao dịch từ PayPal
                  createSecce(transactionId);
                });
              }}
              onError={(err) => {
                console.error("PayPal error:", err);
              }}
            />
          </PayPalScriptProvider>
        </div>
      </div>
    </div>
  );
}

export default FilePay;
