/* ----

# Sweet
# By: Dreamer-Paul
# Last Update: 2017.12.19

一个简洁的个人首页，可以调用博客最新文章。

欢迎你加入缤奇，和我们一起改变世界。
本项目为奇趣保罗原创，并遵守 MIT 开源协议。欢迎访问我的博客：https://paugram.com

---- */

function loader() {
    var loader = document.getElementById("loader");
    setTimeout(function () {
        loader.classList.add("hidden");
    }, 2000);
}

loader();

function actions() {
    var sections = document.getElementsByClassName("content")[0].getElementsByTagName("section");
    var btns = document.getElementsByClassName("actions")[0].getElementsByClassName("item");

    function act(num) {
        for (var i = 0; i < 4; i++) {
            btns[i].classList.remove("active");
            sections[i].classList.remove("active");
        }
        btns[num].classList.add("active");
        sections[num].classList.add("active");
    }

    btns[0].addEventListener("click", function () {
        act(0)
    });
    btns[1].addEventListener("click", function () {
        act(1)
    });
    btns[2].addEventListener("click", function () {
        act(2)
    });
    btns[3].addEventListener("click", function () {
        act(3)
    });
}

actions();

function getAchives() {
    let t = ``;
    fetch('https://www.moedog.tk/wp-json/wp/v2/posts?per_page=6&page=1', {
        method: 'GET',
        headers: {
            'content-type': 'application/json'
        }
    }).then(function (response) {
        response.json().then(json => {
            for (let i = 0; i < json.length; i++) {
                let title = json[i].title.rendered;
                if (title.length > 15) {
                    title = title.substring(0, 15) + "..."
                }
                const link = json[i].link;
                const time = new Date(json[i].date).Format("yy-MM-dd");
                t += `<a href="${link}" target="_blank">${title} <span class="meta">${time}</span></a>`;
                document.getElementById("articles").innerHTML = t;
            }
        })

    })
}

getAchives();

//日期格式化
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

if (window.console && window.console.log) {
    console.log("\n %c Sweet %c https://paugram.com \n\n", "color: #fff; background: #1979ca; padding:5px 0;", "background: #efefef; padding:5px 0;");
}
