const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function getProducts() {
  try {
    const response = await fetch(`${BASE_URL}/api/products`);
    return response.json();
  } catch (error) {
    return new Error(error);
  }
}

export async function getProduct(_id) {
  try {
    const response = await fetch(`${BASE_URL}/api/products/${_id}`);
    return response.json();
  } catch (error) {
    return new Error(error);
  }
}

export async function createProduct(ProductRegister) {
  const token = localStorage.getItem('token');
  try {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(ProductRegister),
    };
    const response = await fetch(`${BASE_URL}/api/products/`, options);
    return response.json();
  } catch (error) {
    return new Error(error);
  }
}

export async function updateProduct(productUpdate) {
  try {
    const token = localStorage.getItem('token');
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(productUpdate),
    };
    const response = await fetch(`${BASE_URL}/api/products/${productUpdate._id}`, options);
    return response.json();
  } catch (error) {
    return new Error(error);
  }
}


export async function deleteProduct(_id) {
  const token = localStorage.getItem('token');
  try {
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(`${BASE_URL}/api/products/${_id}`, options);
    return response.json({ response, message: 'Product deleted' });
  } catch (error) {
    return new Error(error);
  }
}
