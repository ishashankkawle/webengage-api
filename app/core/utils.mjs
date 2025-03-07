import fs from 'fs'

class Util 
{
    mergeArray(array1 , array2 , commonKey)
    {
        let outputArray = array1.map((item) => {
            let obj2 = array2.find(x => x[commonKey] == item[commonKey]);
            return {...item , ...obj2}
        } )

        return outputArray
    }

    convertJsonToCsv(data , headers)
    {
        let rowData = data.map((item) => {
           return Object.values(item).map((arr) => {
                //return '"' + arr.toString().replaceAll("\n", "\\n") + '"'
                return arr.toString().replaceAll("\n", "\\n")
            })
        })
        return [headers,...rowData].join('\n')
    }

    removeKeyFromObjects(data , key)
    {
        return data.map((item) => {
            delete item[key]
            return item
        })
    }

    async writeFile(data , path)
    {
        return new Promise((resolve, reject) => {
        let writeStatus = false
        const writeStream = fs.createWriteStream(path)
        writeStream.write(data)
        writeStream.end()
        
        writeStream.on('finish', () => {
            writeStatus = true
            resolve(writeStatus)
        })
        
        writeStream.on('error', (err) => {
            console.log(err.message)
            writeStatus = false
            resolve(writeStatus)
        })

        })
    }
}
export default Util;