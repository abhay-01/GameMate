import { Routes, Route } from "react-router-dom";
import AllGames from "../src/pages/AllGames";
import Addgames from "../src/pages/Addgames";
import Home from "../src/pages/Home";
import Friends from "../src/pages/Friends";
import Settings from "../src/pages/Settings";
import Install from "../src/pages/Install";
import Faqs from "../src/pages/Faqs";
import { Login } from "./pages/Login";
import { SignUP } from "./pages/SignUp";
import { Otp } from "./pages/Otp";
import { Password } from "./pages/Password";
import AddFriends from "../src/pages/AddFriends";
import MatchMaking from "../src/pages/MatchMaking";
import InvitePage from "../src/pages/InvitePage";
import NotificationProvider from "./components/NotificationProvider";

const AppRoutes = () => {
  return (
    <NotificationProvider>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="home" element={<Home />} />
      <Route path="allgames" element={<AllGames />} />
      <Route path="addgames" element={<Addgames />} />
      <Route path="friends" element={<Friends />} />
      <Route path="addfriends" element={<AddFriends />} />
      <Route path="install" element={<Install />} />
      <Route path="settings" element={<Settings />} />
      <Route path="faqs" element={<Faqs />} />

      <Route path="login" element={<Login />} />
      <Route path="signup" element={<SignUP />} />
      <Route path="otp" element={<Otp />} />
      <Route path="password" element={<Password />} />

      <Route path="matchmaking" element={<MatchMaking />} />
    </Routes>
    </NotificationProvider>
  );
};

export default AppRoutes;
