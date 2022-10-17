import { Dispatch, SetStateAction } from 'react';
import { NextRouter } from 'next/router';
import { UseFormSetError } from 'react-hook-form';

import UnregisteredFields from '../interfaces/Unregistered/UnregisteredFields';

type TRouter = NextRouter;
type TSetIsSubmitting = Dispatch<SetStateAction<boolean>>;
type TSetError = UseFormSetError<UnregisteredFields>;

const unregisteredSubmit = async (
  data            : UnregisteredFields,
  setIsSubmitting : TSetIsSubmitting,
  router          : TRouter,
  setError        : TSetError 
) => {


  console.log(data);

  setIsSubmitting(true);

};

export default unregisteredSubmit;
