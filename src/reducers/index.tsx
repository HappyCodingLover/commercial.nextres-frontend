import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'

import { application } from './application.reducer'
import { auth } from './auth.reducer'
import { borrower } from './borrower.reducer'
import { loan } from './loan.reducer'
import { loanDetail } from './loanDetail.reducer'
import { step } from './step.reducer'

const reducer = combineReducers({
  auth,
  loan,
  step,
  loanDetail,
  application,
  borrower,
})

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}

const persistedReducer = persistReducer(persistConfig, reducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(thunk),
})

export const persistor = persistStore(store)
