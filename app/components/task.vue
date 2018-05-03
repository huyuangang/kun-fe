
<template>
    <div class="task">
        <Header :active="2"></Header>
        <div class="main clearfix">
            <div class="task-card" v-for="(l, index) in list" :key="index" @click="goTaskDetail(l.task_id)">
                <p class="task-name" :title="l.task_name">{{l.task_name}}</p>
                <p class="task-status"><span class="label">状态</span><span class="status-text" :class="'status-'+l.status">{{getStatus(l.status)}}</span></p>
                <p class="task-progress"><span class="label">进度</span><span class="progress" :title="getProgressNumber(l.progress)"><span class="progress-block" :style="getProgressStyle(l.progress)"></span></span></p>
                <p class="task-time"><span class="label">创建时间</span>{{l.create_time}}</p>
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
import { getTaskPage, getTaskSearch } from '../api'
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
        getTaskPage(p) {
            getTaskPage({
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
        getTaskSearch(p) {
            getTaskSearch({
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
        changePage(p) {
            p = parseInt(p, 10);
            if(1 <= p && p <= this.totalPage) {
                this.getTask(p);
            }
        },
        getStatus(s){
            let t;
            switch(s) {
                case 'Finish': t = '已完成'; break; 
                case 'Waiting': t = '等待中'; break; 
                case 'Failed': t = '已失败'; break; 
                case 'Running': t = '进行中'; break; 
            }
            return t;
        },
        getProgressStyle(p){
            let w = parseInt(p) / 100 * 80;
            return {
                width: w + 'px'
            }
        },
        getProgressNumber(p) {
            return p.replace('%', '') + '%'
        },
        getKeyword() {
            let search = location.search.match(/q\=(.+)/);
            if(search){
                this.keyword = search[search.index]
            }
        },
        getTask(p) {
            if(this.keyword) {
                this.getTaskSearch(p);
            } else {
                this.getTaskPage(p);
            }
        },
        goTaskDetail(id) {
            let a = document.createElement('a')
            a.href = '/task_detail?taskid='+id;
            a.click();
        }
    },
    created() {
        this.getKeyword();
        this.getTask(this.page);
    }
}
</script>

<style lang="less" scoped>
    @bg-color: #eff3f9;
    @font-color1: rgb(74, 74, 74);
    @font-color2: rgb(130, 130, 130);
    @running-color: rgb(0, 170, 255);
    @waiting-color: rgb(102, 102, 102);
    @fail-color: rgb(229, 1, 1);
    @success-color: rgb(51, 173, 0);
    .task{
        background: @bg-color;
        padding-bottom: 70px;
    }
    .main{
        width: 1120px;
        margin: auto;
        margin-top: 60px;
        box-sizing: border-box;
    }
    .task-card{
        position: relative;
        background: #fff;
        float: left;
        width: 260px;
        margin: 10px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.24);
        padding: 16px 16px 0 16px;
        box-sizing: border-box;
        border-radius: 3px;
        cursor: pointer;
        transition: all .2s ease-in-out;
        .task-name{
            color: @font-color1;
            font-size: 22px;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
        }
        .task-tag{
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
            .status-text{
                display: inline-block;
                text-align: center;
                width: 76px;
                height: 30px;
                border-radius: 3px;
                color: #fff;
                font-size: 14px;
            }
            .status-Finish{
                background: @success-color;
            }
            .status-Waiting{
                background: @waiting-color;
            }
            .status-Failed{
                background: @fail-color;
            }
            .status-Running{
                background: @running-color;
            }
            .progress{
                position: relative;
                display: inline-block;
                border: 1px solid rgba(0,0,0,0.24);
                width: 80px;
                height: 10px;
                border-radius: 3px;
                &::after{
                    position: absolute;
                    content: attr(title);
                    left: 85px;
                    top: 0;
                    line-height: 1;
                }
            }
            .progress-block{
                position: absolute;
                top: 0;
                left: 0;
                height: 100%;
                background: rgba(0,0,0,0.24);
                border-radius: 3px;
            }
        }
        &:hover{
            box-shadow: 0 2px 16px rgba(0,0,0,0.4);
            .detail{
                opacity: 1;
                top: 198px;
                z-index: 1;
            }
        }
        .detail{
            .title{
                margin-bottom: 10px;
                color: @font-color1;
            }
            position: absolute;
            left: 0;
            top: 208px;
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


