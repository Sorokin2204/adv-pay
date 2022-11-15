import { configureStore } from '@reduxjs/toolkit';
import { packageReducer } from './slices/package.slice';
import { creditCardReducer } from './slices/creditCard.slice';

import { userReducer } from './slices/user.slice';
import { transactionReducer } from './slices/transaction.slice';
import { paymentReducer } from './slices/payment.slice';
import { vkReviewsReducer } from './slices/app.slice';
import { typeGameReducer } from './slices/typeGame.slice';

export const store = configureStore({
  reducer: {
    payment: paymentReducer,
    user: userReducer,
    package: packageReducer,
    creditCard: creditCardReducer,
    transaction: transactionReducer,
    app: vkReviewsReducer,
    typeGame: typeGameReducer,
  },
});
