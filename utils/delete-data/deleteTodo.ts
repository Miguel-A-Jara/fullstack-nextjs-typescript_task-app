const deleteTodo = async (id: string) => {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const fullURL = `${BASE_URL}todos/${id}`;

  const resp = await fetch(fullURL, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });

  return resp;
};

export default deleteTodo;