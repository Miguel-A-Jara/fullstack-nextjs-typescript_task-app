import IFormFields from "../../components/form/IFormFields";

const BASE_URL   = process.env.NEXT_PUBLIC_BASE_URL;
const fullTxtURL = `${BASE_URL}todos/`;
const fullImgURL = `${BASE_URL}todos/image/`;

const todoFormSendData = async (data: IFormFields) => {

  //We get the image form the form Data
  const imageData: File = data.image[0];
  let imageBody = new FormData();

  //We remove the image from the 'text' fields
  let dataNoImage: Partial<IFormFields> = data;
  delete dataNoImage.image;

  //Text fields
  const txtResp = await fetch(fullTxtURL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dataNoImage),
  });

  const respData = await txtResp.json();

  //Image field
  imageBody.append('id', respData._id);
  imageBody.append('file', imageData);
  const imgResp = await fetch(fullImgURL, {
    method: 'POST',
    body: imageBody
  });
  
  const respImag = await imgResp.json();

  return { respData, respImag };
};

export default todoFormSendData;