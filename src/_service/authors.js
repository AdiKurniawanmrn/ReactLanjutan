import {API} from "../_api"
export const getAuthors= async() => {
  const{data} = await API.get('/authors')
  return data.data;
}

export const createAuthors = async (formData) => {
  try {
    const response = await API.post("/authors", formData,  {
      //bagian fungis untuk yang memerlukan login
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
      }
  })
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const showAuthors = async (id) => {
  try {
    const {data}= await API.get (`/authors/${id}`)
    return data.data
  } catch (error){
    console.log (error);
    throw error

  }
}

export const updateAuthors = async (id, data) => {
   try {
    const response = await API.post (`/authors/${id}`, data,  {
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

export const deleteAuthors= async (id) => {
  try {
    await API.delete (`/authors/${id}`,  {
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
