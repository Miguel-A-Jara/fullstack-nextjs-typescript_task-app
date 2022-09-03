import IFormFields from "../../components/form/IFormFields";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const fullURL = `${BASE_URL}todos/`;

const todoFormSendData = async (data: IFormFields) => {

  const resp = await fetch(fullURL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const respData = await resp.json();
  
  return respData;
};

export default todoFormSendData;