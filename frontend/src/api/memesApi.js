import { API } from "../backend";

export const getMemes = () => {
  console.log("hello"+API)
  return fetch(`${API}`, { method: "GET" })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const getMemesData = () => {
  console.log("hello"+API)
  return fetch(`${API}/data/all`, { method: "GET" })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const getMemeById = (memeId) => {
  return fetch(`${API}/${memeId}`, {method: "GET"})
    .then(reponse => {
      return reponse.json();
    })
    .catch(err => console.log(err));
};

export const createMeme = (memeElement) => {
  return fetch(`${API}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(memeElement)
  })
    .then(reponse => {
      return reponse.json();
    })
    .catch(err => console.log(err));
};

export const updateMeme = (memeId,memeData) => {
  const updatedMemeData = {
    caption : memeData.stateCaption,
    url : memeData.stateUrl
  }
  return fetch(`${API}/${memeId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedMemeData)
  }).then(response => {
      return response.json();
    })
    .catch(error => {
      console.log(error);
    });
};

export const deleteMeme = (memeId) => {
  return fetch(`${API}/${memeId}`, {method: "DELETE"})
    .then(reponse => {
      return reponse.json();
    })
    .catch(err => console.log(err));
};

export const incrLikes = (memeId) => {
  return fetch(`${API}/${memeId}/likes`, {method: "PATCH"})
    .then(reponse => {
      return reponse.json();
    })
    .catch(err => {
      console.log(err)
    });
}