import { useContext } from "react";
import { CommentContext } from "../context/CommentContext";

export const useComment = () => useContext(CommentContext);