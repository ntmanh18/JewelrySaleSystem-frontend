import axios from 'axios'

const api = 'https://localhost:7093/api'
export const getAllProducts = async (productId, productName, Category, Material) => {
  try {
    // const query = `?ProductId=${productId}&ProductName=${productName}&Category=${Category}&Material=${Material}`
    // const data = await axios.get(api + '/products/view-product' + query)
    const data = await axios.get(api + '/products')
    return data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error massage: ', error.message)
      return error.message
    } else {
      console.log('Unexpected error: ', error)
      return 'An unexpected error has occured'
    }
  }
}

export const getAllGem = async () => {
  try {
    const data = await axios.get(api + '/gem')
    console.log(data.data)
    return data.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error massage: ', error.message)
      return error.message
    } else {
      console.log('Unexpected error: ', error)
      return 'An unexpected error has occired'
    }
  }
}
export const addProduct = async (formData) => {
  try {
    const data = await axios.post(api + '/products/create-product', formData)
    console.log(data)
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error massage: ', error.message)
      return error.message
    } else {
      console.log('Unexpected error: ', error)
      return 'An unexpected error has occired'
    }
  }
}
export const searchProduct = async (searchValue) => {
  try {
    const data = await axios.get(
      api + `/products/productid?productId=${searchValue}`
    )
    console.log(data)
    return data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message)
      return error.message
    } else {
      console.log('Unxpected error:', error)
      return 'An unexpected error has occured'
    }
  }
}
export const editProduct = async (formData) => {
  try {
    const data = await axios.put(api + '/products/productidupdate', formData)
    console.log(data)
    return data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message)
      return error.message
    } else {
      console.log('Unxpected error:', error)
      return 'An unexpected error has occured'
    }
  }
}
export const getAllUsers = async () => {
  try {
    const data = await axios.get(api + '/user/view-list-users')
    return data
  }
  catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error massage: ', error.message)
      return error.message
    } else {
      console.log('Unexpected error: ', error)
      return 'An unexpected error has occured'
    }
  }
}
export const addUser = async (formData) => {
  try {
    const data = await axios.post(api + '/user/create-user', formData)
    console.log(data)
    return data
  }
  catch (error) {
    if (axios.isAxiosError(error)) {
      const errorData = error.response?.data || error.message;
      console.log('error message: ', errorData.message)
      return errorData
    } else {
      console.log('Unexpected error: ', error)
      return 'An unexpected error has occurred'
    }
  }
}
