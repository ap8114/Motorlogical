import axios from "axios";

let headersList = {
 "Accept": "*/*",
 "User-Agent": "Thunder Client (https://www.thunderclient.com)" 
}

let reqOptions = {
  url: "https://ssknf82q-8000.inc1.devtunnels.ms/api/d1/inventory",
  method: "GET",
  headers: headersList,
}

let response = await axios.request(reqOptions);
console.log(response.data);
