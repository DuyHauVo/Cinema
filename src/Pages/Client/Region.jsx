import React, { useContext } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  colors,
  Button,
} from "@mui/material";
import { ContextRegions } from "../../Context/ContextRoom/RegionsContext";
import { hover } from "@testing-library/user-event/dist/hover";

function Region(props) {
  const listRegion = useContext(ContextRegions);
  return (
    <div className="grid grid-cols-3 gap-5 p-16">
      {listRegion.map((doc) => (
        <Card
          sx={{
            color: "white",
            boxShadow:
              "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px",
            transition: "transform 0.3s ease-in-out", // Hiệu ứng chuyển động
            margin: "auto",
            backgroundImage:
              "linear-gradient(to top, #09203f 0%, #537895 100%)",
          }}
        >
          <CardMedia
            className="h-[200px] w-[440px] object-cover"
            image={doc.imgUrl} // Đường dẫn đến hình ảnh
            sx={{
              transition: "transform 0.3s ease-in-out", // Hiệu ứng chuyển động cho ảnh
              "&:hover": {
                transform: "scale(1.02)", // Phóng to ảnh khi hover
              },
            }}
          />
          <CardContent className="text-center">
            <Typography variant="h6" component="div">
              <div className="">{doc.name}</div>
            </Typography>
            <div className="flex my-3">
              <i class="fa-solid fa-phone mr-2 mt-1"></i>
              <p>0457559350</p>
            </div>
            <Button
              className="w-3/4 h-10 rounded-lg mt-3"
              sx={{
                backgroundImage:
                  "linear-gradient(to top, #c4c5c7 0%, #dcdddf 52%, #ebebeb 100%)",
                "&:hover": {
                  transform: "scale(1.02)",
                  backgroundImage:
                    "linear-gradient(-225deg, #2CD8D5 0%, #C5C1FF 56%, #FFBAC3 100%)",
                },
              }}
              type="button"
            >
              <p className="hover:text-red-500 text-black mt-1">Details</p>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default Region;
