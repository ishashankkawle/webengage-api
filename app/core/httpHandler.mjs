import axios from "axios";

class HttpHandler 
{

    getDefaultHeaders() {
        return { "Content-Type": "application/json" }
    }
    getDefaultMultipartHeaders() {
        return { 'Content-Type': undefined }
    }

    async httpGet(url, customHeaders = this.getDefaultHeaders() , isResponseHeadersRequired = false) {
        let data = axios.get(url, { headers: customHeaders }).then(function (response) {
            if(isResponseHeadersRequired)
            {
                return {"headers" : response.headers , "data" : response.data} 
            }
            else
            {
                return response.data;
            }
        });
        return data;
    }


    async httpPost(url, reqBody, customHeaders = this.getDefaultHeaders()) {
        let data = await axios.post(url, reqBody, { headers: customHeaders }).then(function (response) {
            return response.data;
        });
        return data;
    }

    async httpPut(url, reqBody, customHeaders = this.getDefaultHeaders()) {
        let data = await axios.put(url, reqBody, { headers: customHeaders }).then(function (response) {
            return response.data;
        });
        return data;
    }
    
    async httpDelete(url, reqBody, customHeaders = this.getDefaultHeaders()) {
        let data = await axios.delete(url, {data: reqBody ,  headers: customHeaders }).then(function (response) {
            return response.data;
        });
        return data;
    }

}
export default HttpHandler;