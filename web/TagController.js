var respUtil = require("../util/RespUtil")
var tagsDao = require("../dao/TagsDao")
var url = require("url")
var path = new Map();

function queryRandomTags(request, response){
    tagsDao.queryAllTag(function(result){
        // console.log(result)
        // result.sort(function (){
        //     return Math.random() > 0.5 ? true : false
        //     console.log(result);
        // })
        // console.log(result.tags)
            response.writeHead(200);
            response.write(respUtil.writeResult("success", "查询成功", result));
            response.end()
    })
}

path.set("/queryRandomTags", queryRandomTags)


function queryByTag(request, response){
    var params = url.parse(request.url, true).query
    
    tagsDao.queryTag( params.tag, function(result){
        // console.log(result);
        // console.log(1)
        // if(result == null || result.length == 0){
            response.writeHead(200);
            response.write(respUtil.writeResult("success", "查询成功", result));
            response.end()
    });
    
}
path.set("/queryByTag", queryByTag)


// function getResult(blogList, len, response){
//     if(blogList.length < len){
//         setTimeout(function(){
//             getResult(blogList, len, response)
//         },10) 
//     }else{
//         response.writeHead(200);
//         response.write(respUtil.writeResult("success", "查询成功", blogList));
//         response.end()
//     }
// }

module.exports.path = path