import { useContext } from "react";
import { LikeContext } from "../context/LikeContext";

export const useLike = () => useContext(LikeContext);