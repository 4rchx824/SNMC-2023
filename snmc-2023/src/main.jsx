import React from "react";
import ReactDOM from "react-dom/client";

import Layout from "./pages/Layout";
import { AdminLayout } from "./pages/Layout";

import Login from "./pages/Login";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Events from "./pages/Events";
import Scores from "./pages/Scores";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/auth";
import PersistLogin from "./components/PersistLogin";

const router = (
    <BrowserRouter>
        <AuthProvider>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="/login" element={<Login />} />
                </Route>

                <Route element={<PersistLogin allowedRoles={["ADMIN"]} />}>
                    <Route path="/admin" element={<AdminLayout />}>
                        <Route index element={<Dashboard />} />
                        <Route path="/admin/users" element={<Users />} />
                        <Route path="/admin/events" element={<Events />} />
                        <Route path="/admin/scores" element={<Scores />} />
                    </Route>
                </Route>

                <Route path="/*" element={<NotFound />} />
            </Routes>
        </AuthProvider>
    </BrowserRouter>
);

ReactDOM.createRoot(document.getElementById("root")).render(router);
