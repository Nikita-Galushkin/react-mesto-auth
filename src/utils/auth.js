export const BASE_URL = 'https://auth.nomoreparties.co';

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
  .then((res) => res.ok 
  ? res.json() 
  : res.status(400).send({ message: 'некорректно заполнено одно из полей' }));
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
  .then((res) => {
    if (res.status === 400) {
      res.status(400).res.send({ message: 'Не передано одно из полей' });
    }
    else if (res.status === 401) {
      res.status(401).res.send({ message: 'Пользователь с таким email не найден' });
    }
    return res.json();
  });
};

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then((res) => {
    if (!res.ok) {
      return res.json()
        .then((err) => {
          res.status(401).res.send(err.message);
        });
    }
    return res.json()
  })
};