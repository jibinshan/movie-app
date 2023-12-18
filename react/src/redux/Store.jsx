import { configureStore } from "@reduxjs/toolkit";
import Authredux from "./Authredux";
import Genreredux from "./Genreredux";
import Movieredux from "./Movieredux";

export const store = configureStore({
    reducer : {
        Auth:Authredux,
        Genres:Genreredux,
        Movie:Movieredux,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});