const fetchTodos = async <T>( url: string, token: string ) => {

  const FULL_URL: string = `${process.env.NEXT_PUBLIC_BASE_URL}${url}`;

  const resp = await fetch(FULL_URL, {
    method: 'GET',
    headers: {'Authorization': `Bearer ${token}`},
  });
  
  const data: T = await resp.json();

  return data;
}

export default fetchTodos;