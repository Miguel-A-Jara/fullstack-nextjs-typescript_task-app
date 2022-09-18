import { AnyAction, Dispatch, ThunkDispatch } from '@reduxjs/toolkit';

import { InitStateType } from '../../redux/slices/todoSlice';

type TDispatch = 
  ThunkDispatch<{todos: InitStateType }, undefined, AnyAction> 
  & Dispatch<AnyAction>;

export default TDispatch;