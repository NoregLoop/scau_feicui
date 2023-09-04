<template>
    <head>
        <meta charset="utf-8">
        <title>翡翠ERP系统大数据可视化集成界面</title>
        <meta http-equiv="refresh" content="50;">
        <!-- <div type="text/javascript" src="/js/jquery.js" v-is="script"></div>
        <link rel="stylesheet" href="/css/comon0.css"> -->
    </head>

    <!-- <div class="loading">
        <div class="loadbox"> <el-image src="../../views/home/images/loading.gif" />页面加载中... </div>
    </div> -->
    <div class="head">
        <h1>翡翠ERP系统大数据可视化集成界面</h1>
        <div class="time" id="showTime"></div>
    </div>
    <div class="mainbox">
        <ul class="container">
            <li>
                <div class="boxall" style="height: 15%">
                    <ul class="row h100 row1">
                        <li class="col-4">
                            <div class="bar1"><el-image src="../views/home/images/icon1.png" />
                                <h3><span>供应商</span>200个</h3>
                            </div>
                        </li>
                        <li class="col-4">
                            <div class="bar1"><img src="images/icon4.png" />
                                <h3><span>客户</span>1200个</h3>
                            </div>
                        </li>
                        <li class="col-4">
                            <div class="bar1"><img src="images/icon5.png" />
                                <h3><span>卖手
                                    </span>150个</h3>
                            </div>
                        </li>
                    </ul>
                </div>

                <div class="boxall" style="height: 43%">

                    <ul class="sec h100">
                        <li>
                            <div>
                                <p><img src="images/icon4.png">字段名称</p>
                                <div class="barnav">
                                    <div class="bar2"><span style="width:50%;"></span></div> <span>24356件</span>
                                </div>


                            </div>

                            <div>
                                <div class="zaf">
                                    <p>同比</p>
                                    <p><span>34<i>%</i></span><img src="images/up.png"></p>
                                </div>
                            </div>
                        </li>

                        <li>
                            <div>
                                <p><img src="images/icon5.png">字段名称</p>

                                <div class="barnav">
                                    <div class="bar2"><span style="width:50%;"></span></div> <span>243567封</span>
                                </div>
                            </div>

                            <div>
                                <div class="zaf">
                                    <p>同比</p>
                                    <p><span>34<i>%</i></span><img src="images/up.png"></p>
                                </div>
                            </div>
                        </li>

                        <li>
                            <div>
                                <p><img src="images/icon6.png">字段名称</p>
                                <div class="barnav">
                                    <div class="bar2"><span style="width:50%;"></span></div> <span>24356笔</span>
                                </div>
                            </div>

                            <div>
                                <div class="zaf">
                                    <p>同比</p>
                                    <p><span>50<i>%</i></span><img src="images/down.png"></p>
                                </div>
                            </div>
                        </li>

                    </ul>

                </div>
                <div class="boxall" style="height: calc(42% - .15rem)">
                    <div class="alltitle">模块标题</div>
                    <div class="boxnav" id="echarts3"></div>
                </div>
            </li>
            <li>
                <div class="boxall" style="height: calc(20% - .15rem)">
                    <ul class="row h100 container">
                        <li class="col-6">
                            <div class="sqzs h100">
                                <p>业绩总览</p>
                                <h1>1938272</h1>
                            </div>
                        </li>
                        <li class="col-6">
                            <ul class="row h100 container">
                                <li class="col-4">
                                    <div class="tit01">字段名称</div>
                                    <div class="piebox" id="pe01"></div>
                                </li>
                                <li class="col-4">
                                    <div class="tit01">“字段名称</div>
                                    <div class="piebox" id="pe02"></div>
                                </li>
                                <li class="col-4">
                                    <div class="tit01">字段名称</div>
                                    <div class="piebox" id="pe03"></div>
                                </li>
                            </ul>

                        </li>
                    </ul>
                </div>
                <div class="boxall" style="height: calc(38% - .15rem)">
                    <div class="boxnav h100" id="echarts1"></div>
                </div>
                <div class="boxall" style="height: calc(42% - .15rem)">
                    <div class="alltitle">模块标题 </div>
                    <div class="boxnav" id="echarts2"></div>
                </div>

            </li>
            <li>

                <div class="boxall" style="height: calc(15% - .15rem)">

                    <ul class="row h100 row1">
                        <li class="col-4">
                            <div class="bar1 bar2"><img src="images/icon7.png">
                                <h3><span>字段名称
                                    </span>251项</h3>
                            </div>
                        </li>
                        <li class="col-4">
                            <div class="bar1 bar2"><img src="images/icon8.png">
                                <h3><span>字段名称
                                    </span>34家</h3>
                            </div>
                        </li>
                        <li class="col-4">
                            <div class="bar1 bar2"><img src="images/icon9.png">
                                <h3><span>字段名称
                                    </span>150项</h3>
                            </div>
                        </li>
                    </ul>


                </div>
                <div class="boxall" style="height: calc(43% - .15rem)">
                    <div class="alltitle">模块标题</div>
                    <div class=" boxnav" id="lastecharts">
                    </div>

                </div>
                <div class="boxall" style="height: calc(42% - .15rem)">
                    <div class="alltitle">排行榜</div>
                    <div class=" boxnav paim">
                        <ul class="h100">
                            <li>
                                <span>1</span>
                                <div class="pmnav">
                                    <p>标题名称标题名称标题名称标题名称</p>
                                    <div class="pmbar"><span style="width:100%"></span><i>500</i></div>
                                </div>
                            </li>
                            <li>
                                <span>2</span>
                                <div class="pmnav">
                                    <p>标题名称</p>
                                    <div class="pmbar"><span style="width:92%"></span><i>400</i></div>
                                </div>
                            </li>
                            <li>
                                <span>3</span>
                                <div class="pmnav">
                                    <p>标题名称</p>
                                    <div class="pmbar"><span style="width:90%"></span><i>180</i></div>
                                </div>
                            </li>
                            <li>
                                <span>4</span>
                                <div class="pmnav">
                                    <p>标题名称</p>
                                    <div class="pmbar"><span style="width:88%"></span><i>160</i></div>
                                </div>
                            </li>
                            <li>
                                <span>5</span>
                                <div class="pmnav">
                                    <p>标题名称</p>
                                    <div class="pmbar"><span style="width:86%"></span><i>140</i></div>
                                </div>
                            </li>
                        </ul>

                    </div>

                </div>

            </li>
        </ul>
    </div>
</template>
<script>

</script>
<style rel="stylesheet/scss" lang="scss">
* {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box
}

.head {
    height: 10%;
    background: no-repeat url(../../views/home/images/head_bg.png) center center;
    background-size: 100% 100%;
    position: relative;

    h1 {
        color: #fff;
        text-align: center;

        img {
            width: 1.5rem;
            display: inline-block;
            vertical-align: middle;
        }
    }
}
.mainbox {
    margin: 0px;
    font-family: "微软雅黑";
    background: #000d4a url(../../views/home/images/bg.jpg) center center;
    background-size: cover;
    color: #fff;
    padding: 5px;
    height:900px;
    width: auto;
    >ul {

        height: 100%;

        >li {
            float: left;
            padding: 0 .1rem;
            height: 100%;
            width: 30%;
        }
    }
}


li {
    list-style-type: none;
}

@font-face {
    font-family: electronicFont;
    // src: url(../font/DS-DIGIT.TTF)
}

i {
    margin: 0px;
    padding: 0px;
    text-indent: 0px;
}

el-img {
    border: none;
    max-width: 100%;
}

a {
    text-decoration: none;
    color: #399bff;
}

a.active,
a:focus {
    outline: none !important;
    text-decoration: none;
}

ol,
ul,
p,
h1,
h2,
h3,
h4,
h5,
h6 {
    padding: 0;
    margin: 0
}

a:hover {
    color: #06c;
    text-decoration: none !important
}


.container:after,
.container:before {
    display: table;
    content: " "
}

.container:after {
    clear: both
}

.pulll_left {
    float: left;
}

.pulll_right {
    float: right;
}

/*谷哥滚动条样式*/
::-webkit-scrollbar {
    width: 5px;
    height: 5px;
    position: absolute
}

::-webkit-scrollbar-thumb {
    background-color: #5bc0de
}

::-webkit-scrollbar-track {
    background-color: #ddd
}

/***/

.loading {
    position: fixed;
    left: 0;
    top: 0;
    font-size: 18px;
    z-index: 100000000;
    width: 100%;
    height: 100%;
    background: #1a1a1c;
    text-align: center;
}

.loadbox {
    position: absolute;
    width: 160px;
    height: 150px;
    color: #324e93;
    left: 50%;
    top: 50%;
    margin-top: -100px;
    margin-left: -75px;
}

.loadbox img {
    margin: 10px auto;
    display: block;
    width: 40px;
}



.time {
    position: absolute;
    right: .15rem;
    top: 0;
    line-height: .75rem;
    color: rgba(255, 255, 255, .7);
    font-size: .26rem;
    padding-right: .1rem;
}



.boxall {
    padding: 2px;
    margin: 4px;
    background: rgba(6, 48, 109, .5);
    position: relative;
    z-index: 10;
}

.alltitle {
    font-size: .2rem;
    color: #fff;
    line-height: .5rem;
    position: relative;
    padding-left: .15rem
}

.alltitle:before {
    position: absolute;
    height: .2rem;
    width: 4px;
    background: #49bcf7;
    border-radius: 5px;
    content: "";
    left: 0;
    top: 50%;
    margin-top: -.1rem;
}

.boxnav {
    height: calc(100% - .5rem);
}

.row>li {
    float: left;
    height: 100%;
}

.col-6 {
    width: 50%;
}

.col-3 {
    width: 25%;
}

.col-4 {
    width: 33.33333%;
}

.h100 {
    height: 100%;
}

.tit01 {
    text-align: center;
    color: white;
    font-size: .16rem;
    padding: .3rem 0 .05rem 0;
}

.piebox {
    height: calc(100% - .5rem);
    position: relative;
}


.row1 .bar1 {
    height: 100%;
    background: url(../../views/home/images/bg01.png) no-repeat;
    background-size: 100% 100%;
    position: relative;
}

.bar1 img {
    width: .4rem;
    margin-right: .15rem;
    ;
}

.bar1 {
    display: flex;
    justify-content: center;
    align-items: center;
}

.bar1 span {
    color: #fff;
    font-size: .16rem;
    display: block;
    font-weight: normal;
}

.bar1 h3 {
    color: #fef000;
    font-size: .22rem;
    ;
}

.row1 li {
    padding: .2rem .1rem 0 .1rem;
}

.row1 {
    margin-left: -.1rem;
    margin-right: -.1rem;
}

.row1 .bar2 {
    background: url(../../views/home/images/bg02.png) no-repeat;
    background-size: 100% 100%;
}

.row1 .bar2 h3 {
    text-align: right;
}

.paim li>span {
    width: .3rem;
    height: .3rem;
    text-align: center;
    line-height: .3rem;
    background: #878787;
    border-radius: .05rem;
    margin-right: .1rem;
    font-size: .16rem;
}

.paim li:nth-child(1)>span {
    background: #ed405d
}

.paim li:nth-child(2)>span {
    background: #f78c44
}

.paim li:nth-child(3)>span {
    background: #49bcf7
}

.paim li {
    display: flex;
    align-items: center;
    height: 20%;
}

.pmbar {
    position: relative;
    display: flex;
}

.pmbar span {
    background: linear-gradient(to right, #14b6ff, #9cefff);
    display: inline-block;
    vertical-align: middle;
    height: .15rem;
    border-radius: .5rem;
}

.pmbar i {
    line-height: .2rem;
    font-style: normal;
    padding-left: .1rem;
    color: #49bcf7
}

.pmnav {
    width: calc(100% - .5rem)
}

.pmnav p {
    color: #fff;
    opacity: .6;
    font-size: .15rem;
    padding-bottom: .05rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.sqzs {
    margin-right: .2rem;
}

.sqzs p {
    padding: .2rem 0;
    font-size: .22rem;
}

.sqzs h1 {
    height: calc(100% - .65rem);
    border-bottom: 1px solid rgba(255, 255, 255, .1);
    border-top: 1px solid rgba(255, 255, 255, .1);
    display: flex;
    align-items: center;
    color: #fef000;
    font-family: Gotham, "Helvetica Neue", Helvetica, Arial, "sans-serif";
    font-weight: normal;
    letter-spacing: 2px;
    font-size: .85rem;
    justify-content: center;
    padding-bottom: .05rem;
}



.sec li {
    height: 33.3333%;
    display: flex;
    align-items: center;
    justify-content: space-between
}

.sec li>div:nth-child(1) {
    width: 85%
}

.sec li>div:nth-child(2) {}

.sec .bar2 {
    width: 70%;
    margin: .1rem 0;
    display: inline-block;
    vertical-align: middle;
    border: 1px solid #00deff;
    height: .3rem;
    padding: .07rem;
    border-radius: 1rem;
}

.sec .bar2 span {
    display: block;
    height: 100%;
    background: linear-gradient(to right, #14b6ff, #9cefff);
    border-radius: 1rem;
}

.sec p {
    display: flex;
    align-items: center;
    font-size: .26rem;
}

.sec p img {
    width: .35rem;
    margin-right: .15rem;
}

.barnav span {
    text-align: center;
    color: #f7e80d;
    font-size: .24rem;
    padding-left: .1rem;
    line-height: .3rem;
}

.zaf {
    text-align: center;
}

.zaf p {
    justify-content: center
}

.zaf p img {
    width: .18rem;
    margin-right: 0;
    ;
}

.zaf span {
    color: #00d3ff;
    font-family: Impact;
    font-size: .35rem;
}

.zaf span i {
    font-style: normal;
    font-size: .18rem;
}</style>