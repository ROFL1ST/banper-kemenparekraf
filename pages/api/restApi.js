import * as axios from "axios";
const BASE_URL = "http://128.199.242.242/api/";
function getApi(path_url) {
  return new Promise((resolve, reject) => {
    var config = {
      method: "get",
      url: BASE_URL + path_url,
      headers: {
        //'Authorization': 'Bearer ' + token
      },
    };
    axios(config)
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error);
      });
  });
}
export function getFeed(path_url) {
  // console.log("BASE_URL + path_url", BASE_URL + path_url);
  return new Promise((resolve, reject) => {
    var config = {
      method: "get",
      url: BASE_URL + path_url,
      headers: {
        //'Authorization': 'Bearer ' + token
      },
    };
    axios(config) 
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error);
      });
  });
}

function getGaleri(path_url) {
  // console.log("BASE_URL + path_url", BASE_URL + path_url);
  return new Promise((resolve, reject) => {
    var config = {
      method: "get",
      url: BASE_URL + path_url,
      headers: {
        //'Authorization': 'Bearer ' + token
      },
    };
    axios(config)
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error);
      });
  });
}

function getDelete(path_url, token) {
  return new Promise((resolve, reject) => {
    console.log("path_url", BASE_URL + path_url);
    var config = {
      method: "delete",
      url: BASE_URL + path_url,
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    axios(config)
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error);
      });
  });
}
function postFeed(path_url, token, data, method) {
  return new Promise((resolve, reject) => {
    var config = {
      method: method,
      url: BASE_URL + path_url,
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error);
      });
  });
}

function putViews(path_url) {
  return new Promise((resolve, reject) => {
    var config = {
      method: "put",
      url: BASE_URL + path_url,
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios(config)
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error);
      });
  });
}
export { postFeed as PostFeed, getDelete, putViews as PutViews, getGaleri ,getApi};
