<template>
    <div class="header clearfix">
        <div class="logo">kun</div>
        <ul class="nav">
            <li class="nav-item" :class="{'active-nav': active===index}" v-for="(l, index) in list" :key="index"><a :href="l.url">{{l.text}}</a></li>
        </ul>
        <div class="user-option">
            <span class="login">登录</span>|<span class="regist">注册</span>
        </div>
        <div class="search">
            <input type="text" class="search-input" placeholder="Search">
        </div>
    </div>
</template>

<script>
export default {
    props: [ 'active' ],
    data() {
        return {
            list: [
                { text: '首页', url: '/'},
                { text: '漏洞列表', url: '/vuln'},
                { text: '任务列表', url: '/task'},
                { text: '插件列表', url: '/script'},
                { text: '统计分析', url: '/'}
            ]
        }
    }
}
</script>

<style lang="less" scoped>
    @color: #1d8eff;
    .header {
        height: 60px;
        background: #fff;
        .logo{
            float: left;
            margin: 15px 10px 0 50px;
            width: 70px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            color: #fff;
            border-radius: 3px;
            background: @color;
            font-size: 20px;
        }
    }
    .nav {
        list-style: none;
        .nav-item {
            float: left;
            a {
                color: #666;
                display: block;
                height: 60px;
                line-height: 60px;
                width: 90px;
                text-align: center;
                text-decoration: none;
                transition: all .3s;
                &:hover {
                    color: @color;
                }
            }
        }
        .active-nav{
            a{
                color: @color;
            }
        }
    }
    .user-option{
        float: right;
        margin-right: 10px;
        .login, .regist{
            display: inline-block;
            padding: 0 20px;
            height: 60px;
            line-height: 60px;
            cursor: pointer;
        }
    }
    .search{
        float: right;
        position: relative;
        height: 60px;
        margin-right: 20px;
        .search-input{
            margin-top: 12.5px;
            width: 220px;
            height: 35px;
            outline: none;
            text-indent: 10px;
            border: 1px solid rgb(229, 232, 238);
            border-radius: 3px;
        }
    }
</style>


