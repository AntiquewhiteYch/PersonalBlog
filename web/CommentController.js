
var commentDao = require("../dao/CommentDao")
var respUtil = require("../util/RespUtil")
var captcha = require("svg-captcha")
var url = require("url")
var path = new Map()

function queryNewComments(request, response){
    commentDao.queryNewComments(function(result){
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "评论成功", result));
        response.end()
    })
}
path.set("/queryNewComments", queryNewComments)

function addComment(request, response){
    var params = url.parse(request.url, true).query;
    var day = new Date();
    var s = day.getFullYear()+"-" + (day.getMonth()+1) + "-" + day.getDate();
    request.on("data", function(data){
        commentDao.insertComment(parseInt(params.bid), parseInt(params.parent), params.parentName, params.userName, params.email, data.toString(), s, s, function(result){
            response.writeHead(200);
            response.write(respUtil.writeResult("success", "评论成功", result));
            response.end()
        })
    })
}

path.set("/addComment", addComment);

function queryRandomCode(request, response){
    var img = captcha.create({fontSize: 50, width: 100, height: 44})
    // console.log(img);
    response.writeHead(200);
    response.write(respUtil.writeResult("success", "评论成功", img));
    response.end()
}

path.set("/queryRandomCode", queryRandomCode)

function queryCommentsByBlogId(request, response){
    var params = url.parse(request.url, true).query;
    commentDao.queryCommentsByBlogId(parseInt(params.bid), function(result){
        // console.log(result);
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "评论成功", result));
        response.end()
    })
}
path.set("/queryCommentsByBlogId", queryCommentsByBlogId)

function queryCommentsCountByBlogId(request, response){
    var params = url.parse(request.url, true).query;
    commentDao.queryCommentsCountByBlogId(parseInt(params.bid), function(result){
        response.writeHead(200);
        response.write(respUtil.writeResult("success", "评论成功", result));
        response.end()
    })
}
path.set("/queryCommentsCountByBlogId", queryCommentsCountByBlogId)

module.exports.path = path;
