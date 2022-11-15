import { configureStore } from "@reduxjs/toolkit";
import { messegeReducer } from "./slices/messege/messegeSlice";
import { postsReducer } from "./slices/posts/postsSlice";
import { searchReducer } from "./slices/search/searchSlice";
import { usersReducer } from "./slices/users/usersSlice";


const store = configureStore({
    reducer: {
        posts: postsReducer,
        search: searchReducer,
        users: usersReducer,
        messege: messegeReducer
    }
})

export default store