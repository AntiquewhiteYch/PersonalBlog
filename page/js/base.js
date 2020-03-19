const randomTags = new Vue({
    el: "#right_tags",
    data:{
        tags: ["错误!"],

    },
    computed: {
        
    },
    methods: {
        randomColor: function(){
            var red  =  Math.random() * 255 + 50;
            var green = Math.random() * 255 + 50;
            var blue = Math.random() * 255 + 50;
            return "rgb(" + red + "," + green + "," + blue + ")"
        },
        randomSize: function(){
            var size = Math.random() * 20 + 12;
            return size + "px"; 
        }
    },
    created: function(){
        axios({
            method: "get",
            url: "/queryRandomTags"
        }).then(function(resp){
            console.log(resp.data.data)
            result = []
            
            for(var i = 0; i < resp.data.data.length; i++){
                    result.push(resp.data.data[i].tags)
            }
            // console.log(result)
            // for(var i = 0; i < resp.data.data.length; i ++){
            //     result.push(resp.data.data[i].tag);
            // }
            randomTags.tags = result
        })
    }
})

const newHot = new Vue({
    el: "#new_hot",
    data: {
        titleList: [
            
        ]
    },
    created: function(){
        axios({
            method: "get",
            url: "/queryHotBlog"
        }).then(function(resp){
            // console.log(resp)
            var result = [];
            for(var i = 0; i < resp.data.data.length; i++){
                var temp = []
                temp.title = resp.data.data[i].title
                temp.link = "/blog_detail.html?bid=" + resp.data.data[i].id
                result.push(temp);
            }
            newHot.titleList = result;
        })
    }
})

const newComments = new Vue({
    el: "#new_comments",
    data: {
        commentList: [
            {name: "这是用户名", date: "2018-10-10", comment: "这里是一堆评论"},

        ]
    },
    created: function(){
        axios({
            method: "get",
            url: "/queryNewComments"
        }).then(function(resp){
            var result = [];
            for(var i = 0; i < resp.data.data.length; i++){
                var temp = {};
                temp.name = resp.data.data[i].user_name;
                temp.date = resp.data.data[i].ctime;
                temp.comment = resp.data.data[i].comments;
                
                result.push(temp)
            }
            newComments.commentList = result;
        })
    }
})

var latiao = document.getElementsByClassName("latiao")[0];
var body = document.getElementsByTagName("body")[0];
window.onscroll = function(){
    if(document.documentElement.scrollTop > 1000){
        latiao.className = "latiao dong";
    }
    // console.log(document.documentElement.scrollTop)
    // if(document.documentElement.scrollTop < 5){
    //     body.style.backgroundPositionY =  "0px"
    // }else {
    //     body.style.backgroundPositionY = document.documentElement.scrollTop + "px"
    // }
    // console.log(body.style.backgroundPositionY)
}
latiao.onclick = function(){
    latiao.className = "latiao";
    document.documentElement.scrollTop = 0;
}