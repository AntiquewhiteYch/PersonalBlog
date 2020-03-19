const everyDay = new Vue({
    el: "#every_day",
    data: {
        content: "出问题了！  "
    },
    computed: {
        getContent: function () {
            return this.content;
        }
    },
    created: function () {

        axios({
            method: "get",
            url: "/queryEveryDay"
        }).then(function (resp) {
            everyDay.content = resp.data.data[0].content
            // console.log(everyDay.content);
        }).catch(function (resp) {
            console.log("请求失败");
        })
    }

})

const articleList = new Vue({
    el: "#article_list",
    data: {
        page: 1,
        pageSize: 5,
        count: 100,
        pageNumList: [],
        articleList: [
            {
                title: "标题就比较帅了",
                content: `简而言之，页面出问题了`,
                date: "发布于2020年",
                views: "101",
                tags: "no!",
                id: "",
                link: ""
            }
           
        ]
    },
    computed: {
        jumpTo: function () {
            return function (page) {
                // console.log(page)
                articleList.page = page
                this.getPage(page, this.pageSize);
            }
        },
        getPage: function () {
            return function (page, pageSize) {
                var searcheUrlParams = location.search.indexOf("?") > -1 ? location.search.split("?")[1].split("&") : ""; 
                var tag = "";
                for (var i = 0; i < searcheUrlParams.length; i++) {
                    if (searcheUrlParams[i].split("=")[0] == "tag") {
                        try {
                            tag = searcheUrlParams[i].split("=")[1];
                        } catch (e) {
                            console.log(e);
                        }
                    }
                }
                
                var search = "";
                for (var i = 0; i < searcheUrlParams.length; i++) {
                    if (searcheUrlParams[i].split("=")[0] == "search") {
                        try {
                            search = searcheUrlParams[i].split("=")[1];
                        } catch (e) {
                            console.log(e);
                        }
                    }
                }
                // console.log(search)
                search = decodeURI(search)
                // console.log(search)
                if (tag == "" && search == "") {//不是查询情况
                    axios({
                        method: "get",
                        url: "/queryBlogByPage?page=" + (page - 1) + "&pageSize=" + pageSize
                    }).then(function (resp) {
                        // console.log(resp);
                        var result = resp.data.data;
                        var list = [];
                        for (var i = 0; i < result.length; i++) {
                            var temp = {};
                            temp.title = result[i].title;
                            temp.content = result[i].content;
                            temp.date = result[i].ctime;
                            temp.views = result[i].views;
                            temp.tags = result[i].tags;
                            temp.id = result[i].id;
                            temp.link = "/blog_detail.html?bid=" + result[i].id;
                            list.push(temp);
                        }
                        articleList.articleList = list;
                        articleList.page = page;
                    }).catch(function (resp) {
                        console.log("请求错误");
                    });
                    axios({
                        method: "get",
                        url: "/queryBlogCount"
                    }).then(function (resp) {
                        // console.log(resp)
                        articleList.count = resp.data.data[0].count;
                        articleList.generatePageTool;
                    });
                } else if(tag != "") {
                    axios({
                        method: "get",
                        url: "/queryByTag?tag=" + tag
                    }).then(function(resp) {
                        var result = resp.data.data.slice((articleList.page - 1) * articleList.pageSize, articleList.page * articleList.pageSize)
                        console.log(result)
                        var list = [];
                        for (var i = 0 ; i < result.length ; i ++) {
                            var temp = {};
                            temp.title = result[i].title;
                            temp.content = result[i].content;
                            temp.date = result[i].ctime;
                            temp.views = result[i].views;
                            temp.tags = result[i].tags;
                            temp.id = result[i].id;
                            temp.link = "/blog_detail.html?bid=" + result[i].id;
                            list.push(temp);
                        }
                        articleList.articleList = list;
                        articleList.page = page;
                    }).catch(function (resp) {
                        console.log("请求错误");
                    });

                    axios({
                        method: "get",
                        url: "/queryByTag?tag=" + tag
                    }).then(function(resp) {
                        // console.log(resp.data.data.length)
                        articleList.count = resp.data.data.length;
                        articleList.generatePageTool;
                    });
                } else if(search != ""){
                    axios({
                        method: "get",
                        url: "/queryAllBlog"
                    }).then(function(resp) {
                        // console.log(resp)
                        var reg = new RegExp(search, "i")
                        var result = resp.data.data
                        console.log(result)
                        var list = [];
                        for (var i = 0 ; i < result.length ; i ++) {
                            // console.log(result[i].title)
                            
                            if(reg.test(result[i].title)){
                                var temp = {};
                                temp.title = result[i].title;
                                temp.content = result[i].content;
                                temp.date = result[i].ctime;
                                temp.views = result[i].views;
                                temp.tags = result[i].tags;
                                temp.id = result[i].id;
                                temp.link = "/blog_detail.html?bid=" + result[i].id;
                                list.push(temp);
                            }   
                        }
                        // console.log(list)
                        articleList.articleList = list.slice((articleList.page - 1) * articleList.pageSize, articleList.page * articleList.pageSize);
                        articleList.page = page;
                        // articleList.count = articleList.articleList.length
                        // articleList.generatePageTool;
                    }).catch(function (resp) {
                        console.log("请求错误");
                    });

                    axios({
                        method: "get",
                        url: "/queryAllBlog"
                    }).then(function(resp) {
                        // console.log(resp)
                        var reg = new RegExp(search, "i")
                        var result = resp.data.data
                        articleList.count = 0
                        for (var i = 0 ; i < result.length ; i ++) {
                            if(reg.test(result[i].title)){
                                articleList.count += 1
                            }
                            
                        }
                        
                        articleList.generatePageTool;
                    });
                }else{
                    console.log("错误")
                }

            }
        },
        generatePageTool: function () {
            var nowPage = this.page;
            var pageSize = this.pageSize;
            var totalCount = this.count;
            var result = [];
            // console.log(nowPage, pageSize, totalCount)
            result.push({ text: "<<", page: 1 });
            if (nowPage > 2) {
                result.push({ text: nowPage - 2, page: nowPage - 2 });
            }
            if (nowPage > 1) {
                result.push({ text: nowPage - 1, page: nowPage - 1 });
            }
            result.push({ text: nowPage, page: nowPage });
            if (nowPage + 1 <= (totalCount + pageSize - 1) / pageSize) {
                result.push({ text: nowPage + 1, page: nowPage + 1 });
            }
            if (nowPage + 2 <= (totalCount + pageSize - 1) / pageSize) {
                result.push({ text: nowPage + 2, page: nowPage + 2 });
            }
            result.push({ text: ">>", page: parseInt((totalCount + pageSize - 1) / pageSize) });
            this.pageNumList = result;
            // console.log("执行了")
            return result;

        }
    },
    created: function () {
        this.getPage(this.page, this.pageSize);
    }

})
// var search = ""
function find(){
    var input = document.getElementsByClassName("search")[0];
    window.location.href="/?search=" + input.value;
    // search = input.value
    console.log("1");
}
