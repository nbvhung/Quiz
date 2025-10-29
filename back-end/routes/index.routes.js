import express from "express";
import { authRoutes } from "../routes/auth.routes.js";

const allRoutes = (app) => {
    
    app.use("/auth", authRoutes);

};

export default allRoutes;