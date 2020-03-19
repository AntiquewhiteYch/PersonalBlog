var blogDao = require("../dao/BlogDao")

var respUtil = require("../util/RespUtil")

var url = require("url")
var path = new Map();

function queryHotBlog(request, response){
    blogDao.queryHotBlog(5, function(result){
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "查询成功", result));
        response.end()
    })
}
path.set("/queryHotBlog", queryHotBlog)

function queryAllBlog(request, response){
    blogDao.queryAllBlog(function(result){
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "查询成功", result));
        response.end()
    })
}
path.set("/queryAllBlog", queryAllBlog)

function queryBlogById(request, response){
    var params = url.parse(request.url, true).query;
    blogDao.queryBlogById(parseInt(params.bid), function(result){
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "查询成功", result));
        response.end()
        blogDao.addViews(parseInt(params.bid), function(result){})
    });
}
path.set("/queryBlogById", queryBlogById)


function queryBlogCount(request, response){
    blogDao.queryBlogCount(function (result){
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "查询成功", result));
        response.end()
    })

} 
path.set("/queryBlogCount", queryBlogCount)

function queryBlogByPage(request, response){
    var params = url.parse(request.url, true).query;
    blogDao.queryBlogByPage(parseInt(params.page), parseInt(params.pageSize), function(result){

        response.writeHead(200);
        response.write(respUtil.writeResult("success", "查询成功", result));
        response.end()
    })
}
path.set("/queryBlogByPage", queryBlogByPage)

function editBlog(request, response){
    var params = url.parse(request.url, true).query;
    var tags = params.tags.replace(/ /g,"").replace("，",",")
    var day = new Date();
    var s = day.getFullYear()+"-" + (day.getMonth()+1) + "-" + day.getDate();
    request.on("data", function(data){
        blogDao.insertBlog(params.title, data.toString(), tags, 0, s, s, function(result){
            response.writeHead(200);
            response.write(respUtil.writeResult("success","添加成功",null));
            response.end();
            // var blogId = result.insertId;
            // var tagList = tags.split(",");
            // for(var i = 0; i < tagList.length; i++){
            //     if(tagList[i] == ""){
            //         continue;
            //     }
            // }
        })
    })
} 

path.set("/editBlog", editBlog);



module.exports.path = path;