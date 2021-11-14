import { BASE_URL } from "../utils/constants";
import axios from "axios";

export default function validate(role){
    const offersurl = BASE_URL + "/authority?role="+role;
    const jwt = JSON.parse(localStorage.getItem("profile")).token;
    const options = {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      };
    axios
      .get(offersurl,options)
      .then((response) => {
        
          
    return response.data;
      })
      .catch((err) => {
        console.error(err);
      })
}