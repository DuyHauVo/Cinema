import React, { useContext, useEffect, useState } from "react";
import { useFetcher, useParams } from "react-router-dom"; //lấy id từ url
import { ContextTheaters } from "../../../Context/TheaterContext";
import { ContextLocations } from "../../../Context/ContextRoom/LocationContext";
import { ContextRegions } from "../../../Context/ContextRoom/RegionsContext";
import { ContextMovies } from "../../../Context/MoviesContext";
import {
  getShowtimes,
  listObjectById,
  getObjectById,
  listObjectById_Movie,
} from "../../../Services/Repository";
import { ContextMovie_Screening } from "../../../Context/Movie_ScreeningContext";
import { ContextRooms } from "../../../Context/ContextRoom/RoomContext";
import { useNavigate } from "react-router-dom";
import { ContextBooking } from "../../../Context/BookingContext";

function Movie_Detail() {
  const { id } = useParams();

  const [movie_detail, setMovie_Detail] = useState(null);
  const [locals, setLocals] = useState(null);
  const [child, setChild] = useState(null);

  const listTheater = useContext(ContextTheaters);
  const listRooms = useContext(ContextRooms);
  const listRegions = useContext(ContextRegions);
  const listLocal = useContext(ContextLocations);
  const listMovie_Screening = useContext(ContextMovie_Screening);
  const listMovie = useContext(ContextMovies);
  const { booking, setBooking } = useContext(ContextBooking);

  const navigation = useNavigate();
  const idMovie = getObjectById(id, listMovie_Screening)?.movie;
  console.log(idMovie);
  useEffect(() => {
    const selectedMovie = listMovie.find((doc) => doc.id === idMovie);
    setMovie_Detail(selectedMovie || null);
  }, [id, listMovie]);

  useEffect(() => {
    const localItem = getShowtimes(listMovie_Screening).filter(
      (doc) => doc.movie === idMovie
    );
    setLocals(localItem);
  }, [id]);

  const movie_Screening_old = listObjectById_Movie(
    booking.id_movie,
    listMovie_Screening,
    "movie"
  )?.id;
  const localFilter = locals?.map(
    (b) =>
      getObjectById(
        getObjectById(b.list_room[0], listRooms)?.theater,
        listTheater
      )?.id
  );

  const showDate = (doc) => {
    const finday = locals.filter(
      (a) =>
        getObjectById(
          getObjectById(a.list_room[0], listRooms)?.theater,
          listTheater
        )?.id === doc
    );
    return finday;
  };

  const handleClick = (doc) => {
    if (doc === child) {
      setChild(null);
    } else {
      setChild(doc);
    }
  };
  const handleTicket = (time) => {
    setBooking({
      ...booking,
      id_movie: idMovie,
      id_movie_screening: id,
      time: time,
    });
    navigation(`/oder_ticket`);
  };
  console.log(booking);
  if (!movie_detail) {
    return (
      <p className="text-center text-lg">
        Đang tải thông tin chi tiết của bộ phim...
      </p>
    );
  }
  return (
    <div className="p-5">
      <div className="grid md:grid-cols-3 grid-cols-1 md:py-18 md:px-60 md:gap-10">
        <div className="col-span-1">
          <img className="p-10" src={movie_detail?.imgUrl} alt="" />
        </div>
        <div className="col-span-2 mt-8 ">
          <div className="flex justify-around">
            <div>
              <h1 className="text-3xl font-semibold">{movie_detail?.name}</h1>
              <p className="text-sm pt-1 pb-4 text-center">Comedy-2D</p>
            </div>
            <div className="w-10 h-10 rounded-lg shadow-[0_0_10px_2px_rgba(255,0,0,1)] bg-amber-400 relative">
              <p className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-black font-medium">
                {"T" + movie_detail?.age}
              </p>
            </div>
          </div>
          {/* line  */}
          <div className="h-[1px] w-full bg-slate-200 my-4"></div>
          <div>
            <div className="my-7">
              <p className="hover:text-red-500">
                <span className="text-red-500 font-medium">Đạo diễn: </span>
                {movie_detail?.director}
              </p>
            </div>
            <div className="my-6">
              <p className="hover:text-red-500">
                <span className="text-red-500 font-medium">Diễn viên: </span>
                Song Luân, NSƯT Thành Lộc, Kaity Nguyễn, Đoàn Thiên Ân, Công
                Dương, NS Thanh Thủy, NSƯT Hữu Châu,…
              </p>
            </div>
            <div className="my-6">
              <p className="hover:text-red-500">
                <span className="text-red-500 font-medium">Ngày chiếu: </span>{" "}
                {movie_detail?.date}
              </p>
            </div>
            <div className="my-6">
              <p className="hover:text-red-500">
                <span className="text-red-500 font-medium">Thời Lượng: </span>
                {movie_detail?.duration_Movie + " "} phút
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="md:px-52">
        <h2 className="text-red-500 font-semibold text-xl border-b-2 border-red-500 inline">
          Mô Tả
        </h2>
        <p className="md:py-4 md:text-sm">
          Lấy cảm hứng từ giai thoại nổi tiếng của nhân vật được mệnh danh là
          thiên hạ đệ nhất chơi ngông, Công Tử Bạc Liêu là bộ phim tâm lý hài
          hước, lấy bối cảnh Nam Kỳ Lục Tỉnh xưa của Việt Nam. BA HƠN - Con trai
          được thương yêu hết mực của ông Hội đồng Lịnh vốn là chủ ngân hàng đầu
          tiên tại Việt Nam, sau khi du học Pháp về đã sử dụng cả gia sản của
          mình vào những trò vui tiêu khiển, ăn chơi trác tán – nên được người
          dân gọi bằng cái tên Công Tử Bạc Liêu.
        </p>
        {[...new Set(localFilter)]?.map((doc) => (
          <div
            className="bg-gray-200 rounded-md"
            style={{
              boxShadow:
                "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
            }}
          >
            <div className="p-10 flex items-center">
              <div>
                <h1 className="text-2xl font-medium">
                  {getObjectById(doc, listTheater)?.name +
                    " " +
                    getObjectById(
                      getObjectById(doc, listTheater)?.district,
                      listLocal
                    )?.district}
                </h1>
                <p className="py-2 text-sm">
                  {getObjectById(doc, listTheater)?.adress +
                    " - " +
                    getObjectById(
                      getObjectById(doc, listTheater)?.district,
                      listLocal
                    )?.district +
                    " - " +
                    getObjectById(
                      getObjectById(
                        getObjectById(doc, listTheater)?.district,
                        listLocal
                      )?.region,
                      listRegions
                    )?.name}
                </p>
              </div>
              <i
                class={` ml-auto text-red-500 text-2xl ${
                  child === doc ? " fa-solid fa-minus " : "fa-solid fa-plus"
                } `}
                onClick={() => {
                  handleClick(doc);
                }}
              ></i>
            </div>
            {showDate(doc).map((data) => (
              <div
                className={`py-4 px-8 bg-white ${
                  child === doc ? "" : "hidden"
                }`}
                style={{
                  boxShadow:
                    "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
                }}
              >
                <p
                  className={`bg-slate-400 text-xl font-semibold text-red-900 py-2 px-6 rounded-md text-center ${
                    child === doc ? "" : "hidden"
                  }`}
                  style={{
                    backgroundImage:
                      "linear-gradient(120deg, #f6d365 0%, #fda085 100%)",
                  }}
                >
                  {new Date(data.date).toLocaleDateString("vi-VN")}
                </p>
                <div
                  className={`flex justify-evenly p-6 ${
                    child === doc ? "" : "hidden"
                  }`}
                >
                  {data.arrTime.map((data) => (
                    <>
                      <button
                        type="button"
                        className="px-5 py-2 text-yellow-300 bg-red-500 text-base font-medium rounded-lg transform transition-transform duration-300 hover:scale-95 hover:bg-red-600 hover:text-yellow-400"
                        onClick={() => handleTicket(data)}
                      >
                        {data}
                      </button>
                    </>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Movie_Detail;
