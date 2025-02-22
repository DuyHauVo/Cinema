import React, { useContext, useEffect, useState } from "react";
import "../../../Styles/Home.css";
import SlideHome from "../SlideShow/SlideHome";
import Search from "../Search/Search";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  Grid,
} from "@mui/material";
import SlideNews from "../SlideShow/SlideNews";
import { ContextMovie_Screening } from "../../../Context/Movie_ScreeningContext";
import {
  listObjectById,
  listObjectById_Movie,
  getShowtimes,
  getShowWilltimes,
} from "../../../Services/Repository";
import { ContextMovies } from "../../../Context/MoviesContext";
import SlideEndows from "../SlideShow/SlideEndows";

function Home(props) {
  const listMovie_Screening = useContext(ContextMovie_Screening);
  const listMovie = useContext(ContextMovies);

  const [showing, setShowing] = useState(true);

  const filteredShowtimes = showing
    ? getShowtimes(listMovie_Screening)
    : getShowWilltimes(listMovie_Screening);

  // khai báo biến để show sp ko bị trùng lặp
  const uniqueMovies = Array.from(
    new Map(
      filteredShowtimes.map((element) => [element.movie, element])
    ).values()
  );

  return (
    <div>
      <SlideHome />
      <div className="xl:mx-40  md:mx-20 mx-5   ">
        <Search />
      </div>
      <div className="w-full h-2 bg-red-400"></div>
      <div
        className="w-1/2 bg-slate-400 m-auto"
        style={{
          backgroundImage: "linear-gradient(to top, #fad0c4 0%, #ffd1ff 100%)",
          borderRadius: "5px",
        }}
      >
        <div className="flex gap-3 justify-center my-10">
          <Button
            className="w-1/2"
            color="secondary"
            onClick={() => setShowing(true)}
            style={{
              backgroundImage: showing
                ? "linear-gradient(to right, #fa709a 0%, #fee140 100%)"
                : "",
            }}
          >
            Movies Showing
          </Button>
          <Button
            className="w-1/2"
            color="error"
            onClick={() => setShowing(false)}
            style={{
              backgroundImage: showing
                ? ""
                : "linear-gradient(to right, #fa709a 0%, #fee140 100%)",
            }}
          >
            Upcoming Movies
          </Button>
        </div>
      </div>
      <div className="lg:mx-20 md:mx-10 mx-5 ">
        <Grid container spacing={3}>
          {uniqueMovies.map((product) => {
            const movieDetails = listObjectById_Movie(
              product.movie,
              listMovie,
              "id"
            );

            return (
              <Grid item xs={12} md={6} lg={3} key={product.id}>
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
      <SlideNews />
      <SlideEndows />
    </div>
  );
}

export default Home;
