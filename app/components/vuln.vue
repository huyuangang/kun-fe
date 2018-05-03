
<template>
    <div class="vuln">
        <Header :active="1"></Header>
        <div class="main clearfix">
            <div class="vuln-card" v-for="(l, index) in list" :key="index">
                <div class="card-content">
                    <p class="vuln-name" :title="l.target">{{l.target}}</p>
                    <p class="vuln-target" :title="l.task_name"><span class="label">任务名称</span><span>{{l.task_name}}</span></p>
                    <p class="vuln-script-name"><span class="label">脚本名称</span><span>{{l.script_name}}</span></p>
                    <p class="vuln-script-type"><span class="label">脚本类型</span><span>{{l.script_type}}</span></p>
                    <p class="vuln-tag"><span :class="'level-'+l.level">{{getLevel(l.level)}}危</span><span class="create-time">{{l.time}}</span></p>
                </div>
                <div class="detail" v-if="l.message">
                    <p class="title">返回信息</p>
                    {{l.message}}
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
import { getVulnPage, getVulnSearch } from '../api'
export default {
    data() {
        return {
            list: [],
            page: 1,
            totalPage: 0,
            goPage: '',
            watchList: [],
            keyword: ''
        }
    },
    components: { Header },
    methods:{
        getVulnPage(p) {
            getVulnPage({
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
        getVulnSearch(p) {
            getVulnSearch({
                params: {
                    keyword: this.keyword,
                    p
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
        changePage(p) {
            p = parseInt(p, 10);
            if(1 <= p && p <= this.totalPage) {
                if(this.keyword) {
                    this.getVulnSearch(p)
                } else {
                    this.getVulnPage(p);
                }
            }
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
        watch(m) {
            alert(m);
        },
        getKeyword() {
            let search = location.search.match(/q\=(.+)/);
            if(search){
                this.keyword = search[search.index]
            }
        }
    },
    created() {
        this.getKeyword();
        if(this.keyword) {
            this.getVulnSearch(this.page);
        } else {
            this.getVulnPage(this.page);
        }
    }
}
</script>

<style lang="less" scoped>
    @bg-color: #eff3f9;
    @font-color1: rgb(74, 74, 74);
    @font-color2: rgb(130, 130, 130);
    .vuln{
        background: @bg-color;
        padding-bottom: 70px;
    }
    .main{
        width: 1120px;
        margin: auto;
        margin-top: 60px;
        padding-bottom: 70px;
    }
    .vuln-card{
        position: relative;
        float: left;
        width: 260px;
        height: 240px;
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
            &:hover{
                box-shadow: 0 2px 16px rgba(0,0,0,0.4);
                &+.detail{
                    opacity: 1;
                    top: 240px;
                    z-index: 1;
                }
            }
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
            }
        }
        .vuln-name{
            color: @font-color1;
            font-size: 22px;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
        }
        .vuln-tag{
            line-height: 25px;
            span{
                display: inline-block;
                height: 25px;
                line-height: 25px;
                padding: 0 8px;
                border-radius: 3px;
                background: #eee;;
                color: #999;
                margin-right: 8px;
            }
            .level-high{
                background: rgb(251, 13, 29);
                color: #fff;
            }
            .level-medium{
                background: rgb(249, 98, 29);
                color: #fff;
            }
            .level-low{
                background: rgb(252, 185, 42);
                color: #fff;
            }
        }
        
        .detail{
            .title{
                margin-bottom: 10px;
                color: @font-color1;
            }
            position: absolute;
            left: 0;
            top: 250px;
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
