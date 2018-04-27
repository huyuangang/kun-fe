<template>
    <div class="header clearfix">
        <div class="logo">kun</div>
        <ul class="nav">
            <li class="nav-item" :class="{'active-nav': active===index}" v-for="(l, index) in list" :key="index"><a :href="l.url">{{l.text}}</a></li>
        </ul>
        <div class="user-option">
            <span class="user-name">{{name}}</span>
            <ul class="option-list">
                <li class="option-item">添加用户</li>
                <li class="option-item" @click="logout">注销</li>
            </ul>
        </div>
        <div class="search">
            <input type="text" class="search-input" placeholder="Search">
        </div>
    </div>
</template>

<script>
import { getUserName, logout } from '../../api'
export default {
    props: [ 'active' ],
    data() {
        return {
            name: '未命名',
            list: [
                { text: '首页', url: '/'},
                { text: '漏洞列表', url: '/vuln'},
                { text: '任务列表', url: '/task'},
                { text: '插件列表', url: '/script'},
                { text: '统计分析', url: '/'}
            ]
        }
    },
    methods: {
        logout() {
            logout({});
        }
    },
    created() {
        getUserName({
            success: data => {
                this.name = data.username
            },
            fail: e => {
                console.log('err', e);
            }
        })
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
        position: relative;
        &:hover{
            .user-name{
                background: #eff3f9;
            }
            .option-list{
                height: 80px;
            }
        }
        .user-name{
            display: inline-block;
            padding: 0 20px;
            height: 60px;
            line-height: 60px;
            cursor: pointer;
        }
        .option-list{
            position: absolute;
            background: #fff;
            width: 100px;
            min-width: 80px;
            top: 100%;
            right: 0;
            box-shadow: 0px 2px 2px rgb(114, 114, 114);
            height: 0;
            overflow: hidden;
            transition: all .2s ease-in-out;
            .option-item{
                line-height: 40px;
                padding: 0 10px;
                box-sizing: border-box;
                cursor: pointer;
                &:hover{
                    color: @color;
                }
            }
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


