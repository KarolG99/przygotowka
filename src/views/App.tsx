import React from "react";
import { GlobalStyle } from "../assets/styles/GlobalStyle";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Main } from "../components/atoms/Main.styles";
import HomePage from "../components/organisms/HomePage/HomePage";
import { ThemeProvider } from "styled-components";
import { theme } from "../assets/styles/theme";
import LogIn from "../components/organisms/LogIn/LogIn";
import Register from "../components/organisms/Register/Register";
import UserProvider from "../Providers/UserProvider";
import UserProfile from "../components/organisms/UserProfile/UserProfile";
import CreateRestaurant from "../components/organisms/CreateRestaurant/CreateRestaurant";
import UsersFavRestaurants from "../components/organisms/UsersFavRestaurants/UsersFavRestaurants";
import RestaurantProfile from "../components/organisms/RestaurantProfile/RestaurantProfile";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LogIn />} />
              <Route path="/register" element={<Register />} />
              <Route path="/:id/profile" element={<UserProfile />} />
              <Route path="/:id/add-restaurant" element={<CreateRestaurant />} />
              <Route path="/:id/my-restaurants" element={<UsersFavRestaurants />} />
              <Route path="/:id/my-restaurants/:restaurantID" element={<RestaurantProfile />} />
            </Routes>
          </Main>
        </ThemeProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
