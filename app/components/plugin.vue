

<template>
    <div class="plugin">
        <Header :active="3"></Header>
        <div class="main clearfix">
            <div class="plugin-card" v-for="(l, index) in list" :key="index">
                <div class="card-content">
                    <p class="plugin-name" :title="l.title">{{l.title}}</p>
                    <p class="plugin-level"><span class="label">漏洞等级</span><span :class="'level-'+l.level">{{getLevel(l.level)}}危</span></p>
                    <p class="plugin-count"><span class="label">出现次数</span><span class="count-text">{{l.count}}</span></p>
                    <p class="plugin-tag"><span class="name">{{l.author}}</span><span class="time">{{l.create_time}}</span></p>
                </div>
                <div class="detail">
                    <p class="title">插件细节</p>
                    {{l.detail}}
                </div>
            </div>
        </div>
        <div class="pagination clearfix">
            <span class="per-page" :class="{unuse: page == 1}" @click="changePage(page-1)">上一页</span>
            <span>{{page}}</span>
            <span class="next-page" :class="{unuse: page == totalPage}" @click="changePage(page+1)">下一页</span>
            <div class="go-page"><input type="text" class="go-page-area" v-model="goPage"><span class="go-page-btn" @click="changePage(goPage)">跳转</span></div>
            <span class="total-page">共&nbsp;{{totalPage}}&nbsp;页</span>
        </div>
    </div>
</template>

<script>
import Header from './layout/header.vue'
import { getPluginPage, getPluginSearch } from '../api'
export default {
    data() {
        return {
            list: [],
            page: 1,
            totalPage: 0,
            goPage: '',
            keyword: ''
        }
    },
    components: { Header },
    methods:{
        getPluginPage(p) {
            getPluginPage({
                params: {
                    p: p || 1
                },
                success: data => {
                    this.page = p;
                    this.list = data.info;
                    this.totalPage = data.total_page;
                },
                fail: e => {
                    console.log(e);
                }
            })
        },
        getPluginSearch(p) {
            getPluginSearch({
                params: {
                    keyword: this.keyword,
                    p: p || 1
                },
                success: data => {
                    this.page = p;
                    this.list = data.info;
                    this.totalPage = data.total_page;
                },
                fail: e => {
                    console.log(e);
                }
            })
        },
        getLevel(text){
            let t;
            switch(text) {
                case 'high': t = '高';break;
                case 'medium': t = '中';break;
                case 'low': t = '低';break;
            }
            return t;
        },
        changePage(p) {
            p = parseInt(p, 10);
            if(1 <= p && p <= this.totalPage) {
                this.getPlugin(p);
            }
        },
        watch(m){
            alert(m);
        },
        getKeyword() {
            let search = location.search.match(/q\=(.+)/);
            if(search){
                this.keyword = search[search.index]
            }
        },
        getPlugin(p) {
            if(this.keyword) {
                this.getPluginSearch(p)
            } else {
                this.getPluginPage(p);
            }
        }
    },
    created() {
        this.getKeyword();
        this.getPlugin(this.page);
    }
}
</script>

<style lang="less" scoped>
    @bg-color: #eff3f9;
    @font-color1: rgb(74, 74, 74);
    @font-color2: rgb(130, 130, 130);
    .plugin{
        background: @bg-color;
        padding-bottom: 70px;
    }
    .main{
        width: 1120px;
        margin: auto;
        margin-top: 60px;
        box-sizing: border-box;
        .plugin-card{
            position: relative;
            float: left;
            width: 260px;
            height: 200px;
            margin: 10px;
            .card-content{
                position: absolute;
                left: 0;
                top: 0;
                right: 0;
                bottom: 0;
                background: #fff;
                box-shadow: 0 2px 8px rgba(0,0,0,0.24);
                padding: 16px 16px 0 16px;
                box-sizing: border-box;
                border-radius: 3px;
                cursor: pointer;
                transition: all .2s ease-in-out;
                &>p{
                    margin-bottom: 16px;
                    line-height: 30px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    .label{
                        display: inline-block;
                        color: @font-color2;
                        font-size: 14px;
                        width: 60px;
                        margin-right: 40px;
                    }
                    .level-high, .level-medium, .level-low{
                        display: inline-block;
                        text-align: center;
                        width: 76px;
                        height: 30px;
                        border-radius: 3px;
                        color: #fff;
                        font-size: 14px;
                    }
                    .level-high{
                        background: rgb(251, 13, 29);
                    }
                    .level-medium{
                        background: rgb(249, 98, 29);
                    }
                    .level-low{
                        background: rgb(252, 185, 42);
                    }
                    .count-text{
                        font-size: 22px;
                        color: rgb(34, 145, 226);
                    }
                }
                &:hover{
                    box-shadow: 0 2px 16px rgba(0,0,0,0.4);
                    &+.detail{
                        opacity: 1;
                        top: 200px;
                        z-index: 1;
                    }
                }
            }
            .plugin-name{
                color: @font-color1;
                font-size: 22px;
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
            }
            .plugin-tag{
                line-height: 25px;
                span{
                    display: inline-block;
                    height: 25px;
                    padding: 0 8px;
                    border-radius: 3px;
                    background: #eee;;
                    color: #999;
                    margin-right: 8px;
                }
            }
            
            .detail{
                .title{
                    margin-bottom: 10px;
                    color: @font-color1;
                }
                position: absolute;
                left: 0;
                top: 210px;
                color: #666;
                background: #fff;
                box-sizing: border-box;
                padding: 16px;
                box-shadow: 0 2px 8px rgba(0,0,0,0.24);
                width: 100%;
                opacity: 0;
                transition: all .2s ease-in-out;
            }
        }
    }
    .pagination{
        width: 1120px;
        margin: auto;
        padding-top: 20px;
        padding-left: 10px;
        height: 40px;
        line-height: 40px;
        &>*{
            float: left;
        }
        .per-page, .next-page, .go-page-btn{
            display: inline-block;
            width: 60px;
            text-align: center;
            cursor: pointer;
            &:hover{
                color: #1d8eff;
            }
        }
        .go-page{
            margin-left: 20px;
        }
        .go-page-area{
            outline: none;
            border: 1px solid #ccc;
            width: 30px;
            height: 20px;
            text-indent: 5px;
        }
        .unuse{
            color: #ccc;
            cursor: default;
            &:hover{
                color: #ccc;
            }
        }
    }
</style>
