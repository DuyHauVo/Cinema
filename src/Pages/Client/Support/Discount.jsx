import React, { useContext } from "react";
import "../../../Styles/Discount.css";
import {
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import { ContextEndow } from "../../../Context/ContextHelp/EndowContext";
function Discount(props) {
  const listNews = useContext(ContextEndow);
  return (
    <>
      <div className="grid lg:grid-cols-11 md:grid-cols-2 sm:grid-cols-1 gap-4 mt-3">
        <div className="lg:col-span-8 md:col-span-2 sm:col-span-1 gap-10 grid grid-cols-2 p-20">
          {listNews.map((doc, index) => (
            <div key={index} className="card col-span-1">
              <span></span>
              <div className="content text-black">
                {/* Hình ảnh */}
                <img
                  className="h-[350px] w-full object-cover rounded-lg"
                  src={doc.imgUrl}
                  alt="News Image"
                />

                {/* Thông tin bài viết */}
                <div className="p-4">
                  <div className="flex justify-between text-base my-2">
                    {/* Người đăng */}
                    <div className="flex items-center">
                      <i className="fa-regular fa-user my-auto mr-3"></i>
                      <p className="font-thin">Admin</p>
                    </div>
                    {/* Ngày đăng */}
                    <div className="flex items-center">
                      <i className="fa-regular fa-clock my-auto mr-3"></i>
                      <p className="font-thin">{doc.date}</p>
                    </div>
                  </div>

                  {/* Tiêu đề bài viết */}
                  <strong>
                    <p className="font-medium text-lg ml-2 my-2">{doc.name}</p>
                  </strong>

                  {/* Mô tả */}
                  <p className="font-extralight text-sm ml-2 my-2">
                    {doc.content.length > 30
                      ? `${doc.content.substring(0, 30)}...`
                      : doc.content}
                  </p>

                  {/* Nút "Xem thêm" */}
                  <Button className="w-full" variant="outlined">
                    <p className="text-black">More</p>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Cột bên phải */}
        <div className="lg:col-span-3 md:col-span-1 sm:col-span-1 h-full">
          <div
            className="my-4 mr-10 rounded-md border border-gray-500 h-full"
            style={{
              backgroundImage:
                "linear-gradient(-225deg, #5d9fff 0%, #b8dcff 48%, #6bbbff 100%)",
            }}
          >
            <div className="fixed w-[365px]">
              <h1 className="text-2xl text-center pt-4">Đặt vé Online</h1>
              <div className="px-3 pb-3">
                <FormControl fullWidth variant="outlined" margin="normal">
                  <InputLabel id="select-label" className="m-auto">
                    Chosse Theater
                  </InputLabel>
                  <Select
                    label="Chosse Theater"
                    labelId="select-label"
                    // value={rooms.region}
                    name="region"
                    // onChange={handleChange}
                  >
                    {/* {regions &&
                  regions.map((regi) => (
                    <MenuItem value={regi.id}>{regi.name}</MenuItem>
                  ))} */}
                  </Select>
                </FormControl>
              </div>
              <div className="px-3 pb-3">
                <FormControl fullWidth variant="outlined" margin="normal">
                  <InputLabel id="select-label" className="m-auto">
                    Chosse Movie
                  </InputLabel>
                  <Select
                    label="Chosse Movie"
                    labelId="select-label"
                    // value={rooms.region}
                    name="region"
                    // onChange={handleChange}
                  >
                    {/* {regions &&
                  regions.map((regi) => (
                    <MenuItem value={regi.id}>{regi.name}</MenuItem>
                  ))} */}
                  </Select>
                </FormControl>
              </div>
              <div className="px-3 pb-3">
                <FormControl fullWidth variant="outlined" margin="normal">
                  <InputLabel id="select-label" className="m-auto">
                    Chosse Date
                  </InputLabel>
                  <Select
                    label="Chosse Date"
                    labelId="select-label"
                    // value={rooms.region}
                    name="region"
                    // onChange={handleChange}
                  >
                    {/* {regions &&
                  regions.map((regi) => (
                    <MenuItem value={regi.id}>{regi.name}</MenuItem>
                  ))} */}
                  </Select>
                </FormControl>
              </div>
              <div className="px-3 pb-3">
                <FormControl fullWidth variant="outlined" margin="normal">
                  <InputLabel id="select-label" className="m-auto">
                    Chosse Movie_Screening
                  </InputLabel>
                  <Select
                    label="Chosse Movie_Screening"
                    labelId="select-label"
                    // value={rooms.region}
                    name="region"
                    // onChange={handleChange}
                  >
                    {/* {regions &&
                  regions.map((regi) => (
                    <MenuItem value={regi.id}>{regi.name}</MenuItem>
                  ))} */}
                  </Select>
                </FormControl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Discount;
