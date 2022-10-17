import { useEffect, useState } from 'react';
import { UseFormSetError } from 'react-hook-form';
import UnregisteredFields from '../../interfaces/Unregistered/UnregisteredFields';

const BASE_URL   = process.env.NEXT_PUBLIC_BASE_URL;
const fullTxtURL = `${BASE_URL}users/login`;

type SetErrorTypes= UseFormSetError<UnregisteredFields>;

const useRegister = (setError: SetErrorTypes) => {

  const [loginData, setLoginData] = useState<UnregisteredFields | null>(null);
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {

    if ( !loginData ) return;

    const fetchData = async () => {

      setIsLoading(true);

      try {

        const resp = await fetch(fullTxtURL, {
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
          console.log(json)
        }

      } catch (error) {
        setIsLoading(false);
      }

    };

    fetchData();

  }, [loginData, setError]);

  return { setLoginData, isLoading };

};

export default useRegister;