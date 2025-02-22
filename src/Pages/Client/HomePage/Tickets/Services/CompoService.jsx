import React, { useContext, useEffect, useState } from "react";
import Ticket from "../Ticket";
import { ContextBooking } from "../../../../../Context/BookingContext";
import { ContextServices } from "../../../../../Context/ContextService/ServiceContext";
import { ContextChairs } from "../../../../../Context/ContextChair/ChairsContext";

function CompoService(props) {
  const { booking, setBooking } = useContext(ContextBooking);

  const service = useContext(ContextServices);
  const chairs = useContext(ContextChairs);

  const [quantity, setQuantity] = useState(
    service.reduce((count, vice) => {
      count[vice.id] = 0;
      return count;
    }, {})
  );

  const handAddValue = (id) => {
    setQuantity((prev) => ({
      ...prev,
      [id]: prev[id] + 1,
    }));
  };
  const handMinusValue = (id) => {
    setQuantity((prev) => ({
      ...prev,
      [id]: Math.max(prev[id] - 1, 0),
    }));
  };

  useEffect(() => {
    const a = Object.keys(quantity).filter((e) => quantity[e] > 0);
    const ObjectCombo = a.map((e) => ({ id: e, quantity: quantity[e] }));
    setBooking({ ...booking, combo: ObjectCombo });
  }, [quantity]);

  return (
    <div className="">
      <div className="px-48 py-5">
        <h1 className=" p-3 text-center bg-gray-300 rounded-md text-3xl font-semibold ">
          CHỌN COMBO
        </h1>
      </div>
      <div className="grid grid-cols-2 mt-5 px-32 gap-5">
        {service.map((vice) => (
          <div
            className="flex p-5 rounded"
            style={{
              boxShadow:
                "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
            }}
          >
            <div className="p-2 rounded-md">
              <img className="w-[150px] h-auto" src={vice.imgUrl} alt="" />
            </div>
            <div className="mx-auto mt-2">
              <div className="">
                <h1 className="text-lg font-bold text-red-500 px-5 pt-3">
                  {vice.name}
                </h1>
                <p className="text-center text-sm text-gray-500 px-5 pb-4">
                  {vice.describe}
                </p>
                <h2 className="text-lg text-red-500 font-semibold text-center">
                  {parseInt(vice.price).toLocaleString("vi-VN") + "đ"}
                </h2>
                <div className="flex justify-center mt-5 relative">
                  <div
                    className="bg-red-500 w-10 h-10 relative rounded hover:bg-yellow-500 cursor-pointer"
                    onClick={() => handMinusValue(vice.id)}
                  >
                    <i class="fa-solid fa-minus absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 "></i>
                  </div>
                  <p className="text-center text-lg font-medium mx-5 mt-[5px]">
                    {quantity[vice.id]}
                  </p>
                  <div
                    className="bg-red-500 w-10 h-10 relative rounded hover:bg-yellow-500 cursor-pointer"
                    onClick={() => handAddValue(vice.id)}
                  >
                    <i class="fa-solid fa-plus absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 "></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="md:h-[40vh]"></div>

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

export default CompoService;
