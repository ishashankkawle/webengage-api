import AppInstance from "../initializers/appInstanceInitializer.mjs";


class CsvController {
    constructor()
    {
        this.appInstance = new AppInstance();
    }

    async generateCSV()
    {
        let userData = await this.appInstance.http.httpGet("https://jsonplaceholder.typicode.com/users" , {} , false)
        let postData = await this.appInstance.http.httpGet("https://jsonplaceholder.typicode.com/posts" , {} , false)
        let commentData = await this.appInstance.http.httpGet("https://jsonplaceholder.typicode.com/comments" , {} , false)
        userData = userData.map((item) => {return {"id" :item.id , "name" :item.name}})
        postData = postData.map((item) => {return {"id" :item.id , "title" :item.title}})
        commentData = commentData.map((item) => {return {"id" :item.id , "body" :item.body}})
        let output = this.appInstance.util.mergeArray(userData , postData , "id")
        output = this.appInstance.util.mergeArray(output , commentData , "id")
        output = this.appInstance.util.removeKeyFromObjects(output , "id")
        output = this.appInstance.util.convertJsonToCsv(output , ["name" , "title" , "body"])
        
        let filename =  "drop-" + Date.now().toString() + ".csv"
        let path = "./drop/" + filename
        let status = await this.appInstance.util.writeFile(output , path)
        return {"file" : filename , "path" : path , "successful" : status} 
    }

}

export default CsvController