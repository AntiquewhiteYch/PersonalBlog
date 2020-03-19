var dbutil = require("./DBUtil");


function queryTag(tag, success) {
    
    var insertSql = "select * from blog where tags = ? ";
    var params = [tag];
    // console.log(tag)
    var connection = dbutil.createConnection()
    connection.connect();

    connection.query(insertSql, params, function (error, result) {
        if (error == null) {
            success(result);
        } else {
            console.log(error);
        }
    });
    connection.end();
}

function queryAllTag(success) {
    var insertSql = "select distinct tags from blog";
    var params = [];

    var connection = dbutil.createConnection()
    connection.connect();

    connection.query(insertSql, params, function (error, result) {
        if (error == null) {
            success(result);
        } else {
            console.log(error);
        }
    });
    connection.end();

}

module.exports.queryTag = queryTag;
module.exports.queryAllTag = queryAllTag;