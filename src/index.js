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
import { NewContext } from "./Context/ContextHelp/NewContext";
import { EndowContext } from "./Context/ContextHelp/EndowContext";
import { UserConetxt } from "./Context/Client/UserConetxt";
import { NotificationProvider } from "./Context/Client/NotificationProvider";
import { LoginContext } from "./Context/LoginContext";
import { BookingContext } from "./Context/BookingContext";
import { TicketContext } from "./Context/Client/OldTicket/TicketContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <LoginContext>
        <NotificationProvider>
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
                                <NewContext>
                                  <EndowContext>
                                    <UserConetxt>
                                      <BookingContext>
                                        <TicketContext>
                                          <App />
                                        </TicketContext>
                                      </BookingContext>
                                    </UserConetxt>
                                  </EndowContext>
                                </NewContext>
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
        </NotificationProvider>
      </LoginContext>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
