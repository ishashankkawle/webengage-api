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
            return Object.values(item).join(',').
        })
        return [headers,...rowData].join('\n')
    }
}
export default Util;