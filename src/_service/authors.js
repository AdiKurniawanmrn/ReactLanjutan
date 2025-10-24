import API from "../_api"
export const getAuthors= async() => {
  const{data} = await API.get('/authors')
  return data.data;
}

export const createAuthors = async (formData) => {
  try {
    const response = await API.post("/authors", formData)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}
