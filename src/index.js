import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { PerformerContext } from "./Context/PerformerContext";
import { CategoryContext } from "./Context/CategoryContext";
import { MoviesContext } from "./Context/MoviesContext";
import { Type_ChairsContext } from "./Context/ContextChair/Type_ChairsContext";
import { RegionsContext } from "./Context/ContextRoom/RegionsContext";
import { LocationContext } from "./Context/ContextRoom/LocationContext";
import { ChairsContext } from "./Context/ContextChair/ChairsContext";
import { TheaterContext } from "./Context/TheaterContext";
import { RoomContext } from "./Context/ContextRoom/RoomContext";
import { ServiceContext } from "./Context/ContextService/ServiceContext";
import Movie_Screening from "./Pages/Admin/Movies/Movie_Screening";
import { Movie_ScreeningContext } from "./Context/Movie_ScreeningContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <PerformerContext>
        <CategoryContext>
          <MoviesContext>
            <RegionsContext>
              <Type_ChairsContext>
                <LocationContext>
                  <ChairsContext>
                    <TheaterContext>
                      <RoomContext>
                        <ServiceContext>
                          <Movie_ScreeningContext>
                            <App />
                          </Movie_ScreeningContext>
                        </ServiceContext>
                      </RoomContext>
                    </TheaterContext>
                  </ChairsContext>
                </LocationContext>
              </Type_ChairsContext>
            </RegionsContext>
          </MoviesContext>
        </CategoryContext>
      </PerformerContext>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
