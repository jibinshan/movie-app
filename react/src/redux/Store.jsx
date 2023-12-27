import { configureStore } from "@reduxjs/toolkit";
import Authredux from "./Authredux";
import Genreredux from "./Genreredux";
import Movieredux from "./Movieredux";
import Homeredux from "./Homeredux";

export const store = configureStore({
    reducer : {
        Auth:Authredux,
        Genres:Genreredux,
        Movie:Movieredux,
        Home:Homeredux,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});