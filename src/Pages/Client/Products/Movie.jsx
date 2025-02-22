import React, { useContext, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  Grid,
} from "@mui/material";
import {
  listObjectById,
  getShowtimes,
  listObjectById_Movie,
  getShowWilltimes,
} from "../../../Services/Repository";
import { ContextMovie_Screening } from "../../../Context/Movie_ScreeningContext";
import { ContextMovies } from "../../../Context/MoviesContext";
import Movie_Detail from "./Movie_Detail";
import { useNavigate } from "react-router-dom";

function Movie(props) {
  const [showall_movies, setShowall_Movies] = useState(true);
  const listMovie_Screening = useContext(ContextMovie_Screening);
  const listMovie = useContext(ContextMovies);
  const navigate = useNavigate();

  // khai báo biến để show sp ko bị trùng lặp
  const uniqueMovies = Array.from(
    new Map(
      listMovie_Screening.map((element) => [element.movie, element])
    ).values()
  );
  const handleDetail = (id) => {
    navigate(`/detail/${id}`);
  };
  return (
    <>
      <div className="lg:mx-20 md:mx-10 mx-5 p-10">
        <Grid container spacing={3}>
          {uniqueMovies.map((product) => {
            const movieDetails =
              listObjectById_Movie(product.movie, listMovie, "id") || {};

            return (
              <Grid
                item
                xs={12}
                md={6}
                lg={3}
                key={product.id}
                onClick={() => handleDetail(movieDetails.id)}
              >
                <Card className="movie">
                  <CardMedia
                    component="img"
                    className="h-[450px] "
                    image={movieDetails.imgUrl || ""}
                    alt={movieDetails.name || "Không có tên phim"}
                  />
                  <CardContent className="text-center">
                    <Typography
                      className="namemovie"
                      variant="h6"
                      gutterBottom
                      sx={{
                        fontWeight: "500",
                        fontSize: "20px",
                        whiteSpace: "nowrap", // Thêm dòng này
                        overflow: "hidden", // Ẩn phần vượt quá
                        textOverflow: "ellipsis", // Thêm dấu "..." nếu nội dung quá dài
                      }}
                    >
                      {movieDetails.name || "Tên phim không xác định"}
                    </Typography>
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{
                        fontSize: "13px",
                      }}
                    >
                      {new Date(product.date).toLocaleDateString("vi-VN")}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </div>
    </>
  );
}

export default Movie;
