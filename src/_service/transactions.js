import {API} from "../_api"

export const getTransactions = async () => {
  const { data } = await API.get("/transactions", {
      //bagian fungis untuk yang memerlukan login
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
      }
  })
  return data.data
}

export const createTransactions = async (data) => {
  try {
    const response = await API.post ("/transactions", data, {
      //bagian fungis untuk yang memerlukan login
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
      }
  })
    return response.data
  } catch (error) {
    console.log(error);
    throw error
  }
  
}