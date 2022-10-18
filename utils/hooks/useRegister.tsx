import { useEffect, useState } from 'react';
import { useRouter }           from 'next/router';
import { UseFormSetError }     from 'react-hook-form';

import { useAppDispatch }   from './reduxHooks';
import { authenticateUser } from '../../redux/slices/authSlice';
import UnregisteredFields   from '../../interfaces/Unregistered/UnregisteredFields';

const BASE_URL   = process.env.NEXT_PUBLIC_BASE_URL;

type SetErrorTypes= UseFormSetError<UnregisteredFields>;

const useRegister = (setError: SetErrorTypes, link: string) => {

  const dispatch = useAppDispatch();

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [loginData, setLoginData] = useState<UnregisteredFields | null>(null);

  useEffect(() => {

    if ( !loginData ) return;

    const fetchData = async () => {

      setIsLoading(true);

      try {

        const resp = await fetch(`${BASE_URL}users${link}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(loginData),
        });

        const json = await resp.json();

        if (!resp.ok) {
          setIsLoading(false);
          console.log(json.message);
          setError('email', { type: 'Custom', message: json.message });
        }

        if (resp.ok) {
          setIsLoading(false);
          console.log(json);
          dispatch(authenticateUser(json));
          router.push('/');
        }

      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }

    };

    fetchData();

  }, [loginData]);

  return { setLoginData, isLoading };

};

export default useRegister;