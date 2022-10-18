const deleteTodo = async (id: string, token: string) => {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const fullURL = `${BASE_URL}todos/${id}`;

  const resp = await fetch(fullURL, {
    method: 'DELETE',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });

  return resp;
};

export default deleteTodo;