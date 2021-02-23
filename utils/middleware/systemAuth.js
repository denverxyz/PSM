import axios from "axios";
import {AUTH} from "../../config/Config";
var Buffer = require('buffer/').Buffer;


export async function systemAuth(){
    
      try{
        var basicAuth = 'Basic ' + Buffer.from(`system@u-self.com:qwER_1234`).toString('base64');
        const conf= {
            headers: {
        
              "Content-Type": "application/json",
              "Authorization": basicAuth
        
            }
        };

        const res = await axios.post(AUTH, {}, conf);
        //  console.log("***********************************************************")
        // console.log(res.data.token)

       return {
        token:res.data.token
       }

      }catch(err){
        console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
        console.log(err)
        return err.response.data
      }


    
}
