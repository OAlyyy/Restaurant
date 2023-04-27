import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import thunk from "redux-thunk";

const store = configureStore({
     reducer: rootReducer },
      applyMiddleware(thunk),
      );

export default store;



// import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
// import { reducer as oidcReducer } from 'redux-oidc'
// import rootReducer from "./rootReducer";
// import thunk from 'redux-thunk';

// const otherMiddlewares = [];


// const store = configureStore({
//   reducer: {
//     rootReducer,
//     oidc: oidcReducer
//   },
//   middleware: [
//     ...getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: ['redux-oidc/USER_FOUND'],
//         ignoredPaths: ['oidc.user']
//       }
//     }),
//     ...otherMiddlewares,
//     thunk
//   ],
 
// });

// export default store;




// const store = configureStore({
//       reducer: rootReducer },
//        applyMiddleware(thunk),
//        );
 