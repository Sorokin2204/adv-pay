import { configureStore } from '@reduxjs/toolkit';
import { packageReducer } from './slices/package.slice';
import { creditCardReducer } from './slices/creditCard.slice';

import { userReducer } from './slices/user.slice';
import { transactionReducer } from './slices/transaction.slice';
import { paymentReducer } from './slices/payment.slice';

export const store = configureStore({
  reducer: {
    payment: paymentReducer,
    user: userReducer,
    package: packageReducer,
    creditCard: creditCardReducer,
    transaction: transactionReducer,
  },
});
