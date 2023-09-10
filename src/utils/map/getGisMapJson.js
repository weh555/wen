import axios from 'axios'



export function getLegned(url) {
  return axios({
    method: 'get',
    url: url,
    baseURL: 'http://localhost:6080/arcgis/rest/services/',
  })
};