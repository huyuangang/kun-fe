
<template>
    <div class="detail">
        <Header></Header>
        <div class="main">
            <div class="detail-header clearfix">
                <div class="dh-left">
                    <h1>{{name}}</h1>
                    <ul class="dh-detail">
                        <li class="dh-detail-row">
                            <span class="dhdr-title">输入目标</span>
                            <span class="dhdr-content">{{target}}</span>
                        </li>
                        <li class="dh-detail-row">
                            <span class="dhdr-title">目标类型</span>
                            <span class="dhdr-content">{{type}}</span>
                        </li>
                        <li class="dh-detail-row">
                            <span class="dhdr-title">扫描方式</span>
                            <span class="dhdr-content dhdrc-mode-tag">{{mode}}</span>
                        </li>
                    </ul>
                </div>
                <div class="dh-right">
                    <p class="dh-right-row">
                        <span>高危</span>
                        <span>中危</span>
                        <span>低危</span>
                    </p>
                    <p class="dh-right-row">
                        <span class="high-count">{{highCount}}</span>
                        <span class="medium-count">{{mediumCount}}</span>
                        <span class="low-count">{{lowCount}}</span>
                    </p>
                </div>
            </div>
            <div class="detail-content">
                <ul class="dc-tab clearfix">
                    <li class="dc-tab-item" :class="{'dc-tab-item-active': tabActive===0}" @click="tabActive=0">扫描信息</li>
                    <li class="dc-tab-item" :class="{'dc-tab-item-active': tabActive===1}" @click="tabActive=1">扫描结果</li>
                </ul>
                <div class="dc-block">
                    <div class="dc-scan-info" v-show="tabActive===0">
                        <div class="dc-section-title">开始时间</div>
                        <p class="dc-start-time">{{formatTime(startTime)}}</p>
                        <div class="dc-section-title">结束时间</div>
                        <p class="dc-start-time">{{formatTime(finishTime)}}</p>
                        <div class="dc-section-title">使用脚本（<span>{{scriptNumber}}</span>）</div>
                        <div class="dc-scripts clearfix">
                            <span class="dc-scripts-item" v-for="(s, index) in scriptInfo" :key="index">{{s.script_title}}</span>
                        </div>
                        <div class="dc-section-title">扫描目标列表（<span>{{targetNumber}}</span>）</div>
                        <div class="dc-targets clearfix">
                            <span class="dc-targets-item" v-for="(t, index) in targets" :key="index">{{t}}</span>
                        </div>
                    </div>
                    <div class="dc-scan-result" v-show="tabActive===1">
                        <div class="result-head">
                            <span class="col1">目标</span>
                            <span class="col2">脚本名称</span>
                            <span class="col3">漏洞名称</span>
                            <span class="col4">脚本类型</span>
                            <span class="col5">漏洞等级</span>
                            <span class="col6">操作</span>
                        </div>
                        <template v-for="(r, i) in results">
                            <div class="result-item" v-for="(rs, index) in r.result" :key="i+'-'+index">
                                <span class="col1">{{r.target}}</span>
                                <span class="col2">{{rs.script_name}}</span>
                                <span class="col3">{{rs.script_title}}</span>
                                <span class="col4">{{rs.script_type}}</span>
                                <span class="col5"><span class="result-level" :class="'result-level-'+rs.script_level">{{getLevelChinese(rs.script_level)}}危</span></span>
                                <span class="col6"><span class="watch-btn" @click="changeMessage(i, index, rs.showMessage)" v-if="rs.message">{{rs.showMessage?'关闭详情':'查看详情'}}</span></span>
                                <div class="result-item-message" v-if="rs.message" v-show="rs.showMessage">
                                    <p class="message-title">插件返回信息</p>
                                    <p class="message-text">{{rs.message}}</p>
                                </div>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Header from './layout/header.vue'
import { getTaskDetail } from '../api'
import { getQueryParams } from '../common/util.js'
export default {
    data() {
        return {
            name: '',
            type: '',
            target: '',
            targets: null,
            targetNumber: '',
            highCount: 0,
            mediumCount: 0,
            lowCount: 0,
            mode: '',
            tabActive: 0,
            startTime: '',
            finishTime: '',
            warning: '',
            scriptNumber: '',
            scriptType: '',
            scriptInfo: [],
            results: null
        }
    },
    methods: {
        getTaskDetail(id) {
            getTaskDetail({
                params: {
                    taskid: id
                },
                success: data => {
                    if(data.success) {
                        data = data.info;
                        this.name = data.task_name;
                        this.type = data.target_type;
                        this.target = data.input_target;
                        this.targets = JSON.parse(data.full_target);
                        this.targetNumber = data.target_number;
                        this.highCount = data.high_count;
                        this.mediumCount = data.medium_count;
                        this.lowCount = data.low_count;
                        this.mode = data.scan_mode;
                        this.startTime = data.start_time;
                        this.finishTime = data.finish_time;
                        this.scriptNumber = data.script_number;
                        this.scriptType = data.script_type;
                        this.scriptInfo = data.scripts_info;
                        let result = JSON.parse(data.result);

                        result = result.map(item => {
                            item.result = item.result.map(i => {
                                let o = Object.assign(i, this.getScriptInfo(i.script_name));
                                o.showMessage = false;
                                return o;
                            })
                            return item;
                        })
                        this.results = result;

                    }
                },
                fail: e => {
                    console.log('err', e);
                }
            })
        },
        formatTime(time) {
            if(!time) {
                return '';
            }
            let formatStr = time.split(' ')[0].replace(/\-/g, '/');
            let timeStr = ''
            time = new Date(time);
            let h = time.getHours(),
                m = time.getMinutes();
            if(h < 11) {
                timeStr = '上午';
            } else {
                timeStr = '下午';
            }
            h = '0' + h%12;
            m = '0' + m;
            h = h.slice(h.length - 2);
            m = m.slice(m.length - 2);
            formatStr = formatStr + ' ' + timeStr + h + ':' + m;
            return formatStr;
        },
        getScriptInfo(name) {
            let script = this.scriptInfo.find(item => {
                return item.script_name === name;
            })
            return script || {};
        },
        getLevelChinese(l) {
            let level;
            switch (l) {
                case 'high':
                    level = '高'
                    break;
                case 'medium':
                    level = '中'
                    break;
                case 'low':
                    level = '低'
                    break;
            }
            return level;
        },
        changeMessage(i, j, b) {
            // console.log(this.results[i].resultp[])
            this.results[i].result[j].showMessage = !b;
        }
    },
    components: { Header },
    created() {
        let params = getQueryParams();
        params.taskid && this.getTaskDetail(params.taskid);
    }
}
</script>

<style lang="less" scoped>
    @bg-color: #eff3f9;
    @color: #333;
    @high-color: rgb(251, 13, 29);
    @medium-color: rgb(249, 98, 29);
    @low-color: rgb(252, 185, 42);
    @blue-color: #1d8eff;
    @grey-color: #384150;
    .detail{
        background: @bg-color;
        color: @color;
    }
    .main{
        padding: 20px;
        .detail-header{
            background: #fff;
        }
        .dh-left{
            float: left;
            width: 70%;
            padding: 20px;
            box-sizing: border-box;
            h1{
                font-weight: 400;
                margin-bottom: 20px;
            }
            li{
                line-height: 20px;
                margin: 10px 0;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                .dhdr-title{
                    display: inline-block;
                    width: 100px;
                }
                .dhdrc-mode-tag{
                    display: inline-block;
                    padding: 0 10px;
                    border-radius: 3px;
                    border: 1px solid #1d8eff;
                    color: #1d8eff;
                }
            }
        }
        .dh-right{
            width: 30%;
            padding: 50px 0;
            float: right;
            box-sizing: border-box;
            border-left: 1px solid #eee;
        }
        .dh-right-row{
            text-align: center;
            font-size: 13px;
            span{
                display: inline-block;
                width: 60px;
                text-align: center;
            }
            .high-count, .medium-count, .low-count{
                font-size: 32px;
                height: 48px;
                line-height: 48px;
            }
            .high-count{
                color: @high-color;
            }
            .medium-count{
                color: @medium-color;
            }
            .low-count{
                color: @low-color;
            }
        }
        
    }
    .detail-content{
        background: #fff;
        margin-top: 20px;
        .dc-block{
            padding: 20px;
        }
        .dc-tab{
            border-bottom: 1px solid #d9d9d9;
        }
        .dc-tab-item{
            float: left;
            height: 36px;
            line-height: 36px;
            margin-right: 24px;
            box-sizing: border-box;
            position: relative;
            padding: 0 20px;
            transition: color .3s cubic-bezier(.645,.045,.355,1);
            cursor: pointer;
            text-decoration: none;
            &:hover{
                color: @blue-color;
            }
        }
        .dc-tab-item-active{
            color: @blue-color;
            border-bottom: 2px solid @blue-color;
        }
        .dc-section-title{
            position: relative;
            height: 30px;
            line-height: 30px;
            text-indent: 16px;
            font-size: 14px;
            color: @grey-color;
            margin: 10px 0;
            letter-spacing: 1px;
            font-weight: bold;
            &::before{
                position: absolute;
                top: 10px;
                left: 0;
                content: '';
                width: 4px;
                height: 10px;
                background: @grey-color;
            }
            span{
                color: red;
            }
        }
        .dc-scripts-item {
            float: left;
            margin-right: 20px;
            width: 150px;
            border: 1px solid @grey-color;
            border-radius: 3px;
            color: @grey-color;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            cursor: default;
            box-sizing: border-box;
            line-height: 30px;
            text-indent: 10px;
            &:hover{
                color: #fff;
                background: @grey-color;
            }
        }
        .dc-targets-item{
            float: left;
            margin: 5px 20px 5px 0;
            width: 150px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            border-radius: 3px;
            cursor: default;
            box-sizing: border-box;
            background: #ececec;
            color: #666;
            line-height: 30px;
            text-indent: 10px;
        }
        .dc-scan-result{
            font-size: 0;
            cursor: default;
            span{
                display: inline-block;
                box-sizing: border-box;
                font-size: 12px;
                padding: 16px 8px;
            }
            .result-head{
                background: #f7f7f7;
            }
            .result-item{
                border-bottom: 1px solid #e9e9e9;
                transition: all .3s;
                &:hover{
                    background: #fbf8f4;
                }
            }
            .col1{
                width: 20%;
            }
            .col2{
                width: 15%;
            }
            .col3{
                width: 25%;
            }
            .col4{
                width: 20%;
            }
            .col5{
                width: 10%;
            }
            .col6 {
                width: 10%;
            }
            .result-level{
                display: inline-block;
                height: 25px;
                line-height: 25px;
                padding: 0 8px;
                border-radius: 3px;
                color: #fff;
                margin-right: 8px;
            }
            .result-level-high{
                background: @high-color;
            }
            .result-level-medium{
                background: @medium-color;
            }
            .result-level-low{
                background: @low-color;
            }
        }
        .result-item-message{
            padding: 8px;
            font-size: 12px;
            .message-title{
                margin-bottom: 10px;
                font-weight: bold;
                color: @grey-color;
            }
            .message-text{
                color: #666;
            }
        }
        .watch-btn{
            transition: all .1s ease-in-out;
            cursor: pointer;
            &:hover{
                color: @blue-color;
            }
        }
    }
</style>


