const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function getOrders() {
  try {
    const response = await fetch(`${BASE_URL}/api/orders`);
    return response.json();
  } catch (error) {
    return new Error(error);
  }
}

export async function getOrder(_id) {
  try {
    const response = await fetch(`${BASE_URL}/api/orders/${_id}`);
    return response.json();
  } catch (error) {
    return new Error(error);
  }
}

export async function getClientOrders(clientId) {
  const token = localStorage.getItem('token');
  try {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(`${BASE_URL}/api/orders/byClientId/${clientId}`, options);
    return response.json();
  } catch (error) {
    return new Error(error);
  }
}

export async function createOrder(orderRegister) {
  const token = localStorage.getItem('token');
  try {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(orderRegister),
    };
    const response = await fetch(`${BASE_URL}/api/orders/`, options);
    return response.json();
  } catch (error) {
    return new Error(error);
  }
}

export async function deleteOrder(_id) {
  const token = localStorage.getItem('token');
  try {
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(`${BASE_URL}/api/orders/${_id}`, options);
    return response.json({ response, message: 'Product deleted' });
  } catch (error) {
    return new Error(error);
  }
}
