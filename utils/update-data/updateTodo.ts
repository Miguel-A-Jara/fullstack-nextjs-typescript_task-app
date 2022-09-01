import IUpdateTodo from "../../interfaces/Todos/IUpdateTodo";

const updateTodo = async (id: string, body: IUpdateTodo) => {
  
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const fullURL = `${BASE_URL}todos/${id}`;

  const resp = await fetch(fullURL, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const respData = await resp.json();

  return respData;
};

export default updateTodo;