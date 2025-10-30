import {API} from "../_api"

export const getBooks = async () => {
  const { data } = await API.get('/books');
  return data.data;
};

export const createBooks = async (data) => {
  try {
    const response = await API.post ("/books", data,  {
      //bagian fungis untuk yang memerlukan login
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
      }
  })
    return response.data
  } catch (error){
    console.log (error);
    throw error

  }
}
export const showBooks = async (id) => {
  try {
    const {data}= await API.get (`/books/${id}`)
    return data.data
  } catch (error){
    console.log (error);
    throw error

  }
}

export const updateBooks = async (id, data) => {
   try {
    const response = await API.post (`/books/${id}`, data,  {
      //bagian fungis untuk yang memerlukan login
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
      }
  })
    return response.data
  } catch (error){
    console.log (error);
    throw error

  }
}

export const deleteBooks = async (id) => {
  try {
    await API.delete (`/books/${id}`,  {
      //bagian fungis untuk yang memerlukan login
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
      }
  })
  } catch (error){
    console.log (error);
    throw error

  }
}