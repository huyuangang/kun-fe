
<template>
    <div class="index">
        <Header :active="0"></Header>
        <div class="main">
            <div class="jumbotron">
                <h1>漏洞扫描平台</h1>
                <p class="des">插件数：<span class="script-number">{{scriptNum}}</span>
                    已发现漏洞数：<span class="vuln-number">{{vulnNum}}</span></p>
                <div class="new-scan" @click="newScanShow=true">新建扫描</div>
            </div>
            <h2 class="section-title">任务状态</h2>
            <ul class="task-wrap">
                <li class="task-item task-running">
                    <p class="task-number">{{taskRunning}}</p>
                    <p class="task-text">正在进行</p>
                </li>
                <li class="task-item task-waiting">
                    <p class="task-number">{{taskWaiting}}</p>
                    <p class="task-text">等待中</p>
                </li>
                <li class="task-item task-fail">
                    <p class="task-number">{{taskFail}}</p>
                    <p class="task-text">扫描失败</p>
                </li>
                <li class="task-item task-success">
                    <p class="task-number">{{taskSuccess}}</p>
                    <p class="task-text">已完成</p>
                </li>
            </ul>
            <h2 class="section-title">任务列表<a class="find-more" href="/task">查看更多</a></h2>
            <table class="list" cellspacing="0">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>名称</th>
                        <th>创建时间</th>
                        <th>状态</th>
                        <th>进度</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(t, index) in taskList" :key="index">
                        <td>{{t.task_id}}</td>
                        <td>{{t.task_name}}</td>
                        <td>{{t.create_time}}</td>
                        <td>{{t.status}}</td>
                        <td>{{t.progress}}%</td>
                        <td v-if="delStatus.indexOf(t.status) > -1"><span class="task-del-btn" @click="taskStatusHandle(t.task_id, 0)">删除</span></td>
                        <td v-else><span class="task-stop-btn" @click="taskStatusHandle(t.task_id, 1)">停止</span></td>
                    </tr>
                </tbody>
            </table>
            <h2 class="section-title">漏洞排名</h2>
            <table class="list" cellspacing="0">
                <thead>
                    <tr>
                        <th>序号</th>
                        <th>漏洞名称</th>
                        <th>出现次数</th>
                        <th>百分比</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(v, index) in vulnRank" :key="index">
                        <td>{{index+1}}</td>
                        <td>{{v.script}}</td>
                        <td>{{v.count}}</td>
                        <td>{{v.percent}}</td>
                    </tr>
                </tbody>
            </table>
            <h2 class="section-title">活跃脚本列表</h2>
            <table class="list" cellspacing="0">
                <thead>
                    <tr>
                        <th>漏洞名称</th>
                        <th>脚本名称</th>
                        <th>漏洞等级</th>
                        <th>脚本作者</th>
                        <th>创建时间</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(s, index) in scriptRank" :key="index">
                        <td>{{s.title}}</td>
                        <td>{{s.name}}</td>
                        <td>{{getLeveText(s.level)}}</td>
                        <td>{{s.author}}</td>
                        <td>{{s.create_time}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <new-scan v-show="newScanShow" @close="newScanShow=false"></new-scan>
    </div>
</template>

<script>
import Header from './layout/header.vue'
import newScan from './newScan.vue'
import { getTaskStatus, getTaskList, getVulnRank, getScriptRank, taskStatusHandle, getScannerData } from '../api';
export default {
    data() {
        return {
            taskRunning: 0,
            taskWaiting: 0,
            taskSuccess: 0,
            taskFail: 0,
            taskList: [],
            vulnRank: [],
            scriptRank: [],
            newScanShow: false,
            delStatus: ['Finish', 'Close', 'Failed'],
            scriptNum: 0,
            vulnNum: 0
        }
    },
    components: { Header, newScan },
    methods: {
        getScannerData() {
            getScannerData({
                success: data => {
                    this.scriptNum = data.script_count;
                    this.vulnNum = data.vuln_count;
                },
                fail: e => {
                    console.log(e)
                }
            })
        },
        getTaskStatus() {
            let me = this;
            getTaskStatus({
                success(data) {
                    me.taskRunning = data.running;
                    me.taskWaiting = data.waiting;
                    me.taskSuccess = data.finish;
                    me.taskFail = data.fail;
                },
                fail(e) {
                    console.log(e)
                }
            })
        },
        getLeveText(l) {
            let t;
            switch(l) {
                case 'high': t = '高';break;
                case 'medium': t = '中';break;
                case 'low': t = '低';break;
            }
            return t;
        },
        getTaskList() {
            let me = this;
            getTaskList({
                success(data) {
                    me.taskList = data;
                },
                fail(e) {
                    console.log(e)
                }
            })
        },
        getVulnRank() {
            let me = this;
            getVulnRank({
                success(data) {
                    me.vulnRank = data;
                },
                fail(e) {
                    console.log(e)
                }
            })
        },
        getScriptRank() {
            let me = this;
            getScriptRank({
                success(data) {
                    me.scriptRank = data;
                },
                fail(e) {
                    console.log(e)
                }
            })
        },
        taskStatusHandle(id, type) {
            taskStatusHandle({
                params: {
                    taskid: id
                },
                success: data => {
                    if(data.success) {
                        location.reload()
                    } else {
                        alert('任务更新失败')
                    }
                },
                fail: e => {
                    console.log(e);
                }
            })
        }
    },
    created() {
        this.getScannerData();
        this.getTaskStatus();
        this.getTaskList();
        this.getVulnRank();
        this.getScriptRank();
    }
}
</script>

<style lang="less" scoped>
    @bg-color: #eff3f9;
    .index{
        background: @bg-color;
    }
    .main{
        width: 1120px;
        margin: auto;
        padding-bottom: 70px;
        .jumbotron{
            position: relative;
            padding: 30px 60px;
            margin-top: 60px;
            height: 300px;
            background: #fff;
            box-sizing: border-box;
            h1{
                margin-top: 10px;
                font-size: 48px;
                color: #333;
            }
            .des{
                margin-top: 114px;
                font-size: 16px;
                color: #666;
                .script-number, .vuln-number{
                    font-size: 30px;
                    color: #07aefc;
                }
            }
            .new-scan{
                position: absolute;
                right: 60px;
                bottom: 30px;
                width: 200px;
                height: 60px;
                border-radius: 30px;
                line-height: 60px;
                text-align: center;
                color: #fff;
                background: rgb(126,200,86);
                font-size: 24px;
                cursor: pointer;
            }
        }
        .section-title{
            height: 60px;
            line-height: 60px;
            font-size: 14px;
            color: #333;
            .find-more{
                float: right;
                color: #666;
                cursor: pointer;
                text-decoration: none;
            }
        }
        .task-wrap{
            padding: 10px 0;
            height: 225px;
            box-sizing: border-box;
            background: #fff;
            .task-item{
                float: left;
                width: 280px;
                height: 100%;
                text-align: center;
                box-sizing: border-box;
                border-right: 1px solid rgb(204, 204, 204);
                .task-number{
                    font-size: 60px;
                    margin-top: 50px;
                }
                .task-text{
                    margin-top: 15px;
                    font-size: 24px;
                }
                &:last-child{
                    border: none;
                }
            }
            .task-running{
                color: rgb(0, 170, 255);
            }
            .task-waiting{
                color: rgb(102, 102, 102);
            }
            .task-fail{
                color: rgb(229, 1, 1);
            }
            .task-success{
                color: rgb(51, 173, 0);
            }
        }
        .list{
            width: 100%;
            background: #fff;
            padding: 0 10px;
            th, td{
                line-height: 40px;
                text-align: center;
            }
            td{
                color: #666;
                border-top: 1px solid #eee;
            }
            .task-del-btn, .task-stop-btn{
                display: block;
                background: red;
                color: #fff;
                line-height: 25px;
                width: 60px;
                margin: auto;
                cursor: pointer;
                border-radius: 3px;
                &:hover{
                    box-shadow: 0 0 4px rgba(0, 0, 0, .6);
                }
            }
            .task-stop-btn{
                background: #666;
            }
        }
    }
</style>


