import {API} from "../_api";

export const getGenres = async () => {
  const { data } = await API.get("/genres");
  return data.data;
};

export const createGenres = async (data) => {
  try {
    const response = await API.post("/genres", data,  {
      //bagian fungis untuk yang memerlukan login
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
      }
  });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const showGenres = async (id) => {
  try {
    const {data}= await API.get (`/genres/${id}`)
    return data.data
  } catch (error){
    console.log (error);
    throw error

  }
}

export const updateGenres = async (id, data) => {
   try {
    const response = await API.post (`/genres/${id}`, data,  {
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

export const deleteGenres= async (id) => {
  try {
    await API.delete (`/genres/${id}`, {
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
