<template>
<transition name="modal">
    <div class="modal">
        <div class="content">
            <header class="header">新建扫描<span class="close-btn" @click="$emit('close')">关闭</span></header>
            <div class="form-wrap">
                <div class="form-group">
                    <label for="">任务名称</label>
                    <input class="task-name-area" type="text" v-model="taskName">
                </div>
                <div class="form-group">
                    <label for="">目标类型</label>
                    <div class="target-wrap dropdown">
                        <span class="active-target" @click="dropChange(0)">{{activeTarget}}</span>
                        <ul class="dropdown-list" v-show="targetShow">
                            <li class="dropdown-list-item" v-for="(t, index) in targetList" @click="chooseTarget(t)" :key="index">{{t}}</li>
                        </ul>
                    </div>
                </div>
                <div class="form-group" v-show="activeTarget==='URL' || activeTarget==='IP段'">
                    <label for="">请输入{{activeTarget}}</label>
                    <input class="url-area" type="text" v-model="url">
                </div>
                <div class="form-group" v-show="activeTarget==='文件'">
                    <input type="file" ref="file" @change="getFile">
                </div>
                <div class="form-group" v-show="activeTarget==='API'">
                    <label for="">API列表</label>
                    <div class="api-choose">
                        <p class="api-list-active" @click="dropChange(1)">{{activeApi}}</p>
                        <ul class="api-list" v-show="apiShow">
                            <li class="api-list-item" v-for="(a, index) in apiList" @click="chooseApi(a)" :key="index">{{a}}</li>
                        </ul>
                    </div>
                </div>
                <div class="form-group" v-show="activeTarget==='API'">
                    <label for="">搜索关键字</label>
                    <input class="api-area" type="text" v-model="apiKey">
                </div>
                <div class="form-group clearfix">
                    <p class="plugin-label" for="">插件选择</p>
                    <div class="plugin-list">
                        <p v-for="(p, index) in pluginList" :key="index" @click="addPlugin(index)">{{p.name}}<span v-if="p.active" class="active-point"></span></p>
                    </div>
                    <div class="active-plugin-list">
                        <p v-for="(p, index) in pluginList" :key="index" v-if="p.active">{{p.name}}</p>
                    </div>
                </div>
            </div>
            <button class="confirm-btn" @click="putTask">执行扫描</button>
        </div>
    </div>
</transition>
</template>

<script>
import { getPluginList, putTask, getApiList } from '../api'
export default {
    data() {
        return {
            targetList: ['URL', 'IP段', 'API', '爬虫', '文件' ],
            pluginList: [],
            activeTarget: 'URL',
            targetShow: false,
            apiShow: false,
            activeApi: '',
            taskName: '',
            url: '',
            file: null,
            apiList: [],
            apiKey: ''
        }
    },
    methods: {
        getApiList() {
            getApiList({
                success: data => {
                    this.apiList = data;
                },
                fail: e => {
                    console.log(e);
                }
            })
        },
        getPluginList() {
            let me = this;
            getPluginList({
                success(data) {
                    me.pluginList = data;
                },
                fail(e) {
                    console.log(e);
                }
            })
        },
        dropChange(t) {
            if(t === 0) {
                this.targetShow = !this.targetShow;
            } else if(t === 1) {
                this.apiShow = !this.apiShow;
            }
        },
        chooseTarget(t) {
            this.activeTarget = t;
            this.targetShow = false;
        },
        chooseApi(a) {
            this.activeApi = a;
            this.apiShow = false;
        },
        addPlugin(index) {
            if(this.pluginList[index].active) {
                this.pluginList[index].active = false;
                this.$forceUpdate();
                return;
            }
            this.pluginList[index].active = true;
            this.$forceUpdate();
        },
        getChooseSctipt(){
            let actives = [];
            this.pluginList.forEach(item => {
                if(item.active){
                    actives.push(item.id)
                }
            })
            return actives.join(',')
        },
        putTask(){
            let index = this.targetList.indexOf(this.activeTarget);
            let params;
            let type = 0;
            if(index === 4) {
                params = new FormData();
                params.append('task_type', index);
                params.append('task_name', this.taskName);
                params.append('target', this.url);
                params.append('script', this.getChooseSctipt());
                params.append('file', this.file);
                type = 1;
            } else if(index === 2) {
                params = {
                    task_type: index,
                    task_name: this.taskName,
                    api_name: this.activeApi,
                    keyword: this.apiKey,
                    script: this.getChooseSctipt()
                }
            } else {
                params = {
                    task_type: index,
                    task_name: me.taskName,
                    target: this.url,
                    script: this.getChooseSctipt()
                }
            } 
            putTask({
                params,
                type,
                success: data => {
                    this.$emit('close');
                },
                fail: e => {
                    this.$emit('close');
                    console.log(e);
                }
            })
        },
        getFile() {
            this.file = this.$refs.file.files[0];
        }
    },
    created() {
        this.getApiList();
        this.getPluginList();
    }
}
</script>

<style lang="less" scoped>
    @bg-color: #eff3f9;
    .modal{
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.4);
        transition: opacity .3s ease;
        .content{
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            width: 600px;
            background: @bg-color;
            max-height: 90%;
            box-shadow: 0 0 4px #666;
            padding-bottom: 20px;
            transition: all .3s ease;
            .header{
                height: 60px;
                line-height: 60px;
                text-align: center;
                font-size: 20px;
                background: #fff;
                .close-btn{
                    float: right;
                    margin-right: 20px;
                    font-size: 14px;
                    color: #666;
                    cursor: pointer;
                    &:hover{
                        color: #333;
                    }
                }
            }
            .form-wrap{
                width: 540px;
                margin: auto;
                margin-top: 30px;
            }
            .form-group{
                margin: 30px 0;
                label{
                    display: inline-block;
                    width: 85px;
                    font-size: 14px;
                    line-height: 30px;
                }
                .plugin-label{
                    height: 40px;
                    line-height: 40px;
                }
            }
            .task-name-area, .url-area, .api-area {
                float: right;
                height: 30px;
                width: 450px;
                line-height: 30px;
                border-radius: 3px;
                border: none;
                box-shadow: 2px 2px 4px 0 #aaa;
                text-indent: 10px;
                outline: none;
            }
            .target-wrap, .api-choose{
                position: relative;
                float: right;
                width: 450px;
                height: 30px;
                line-height: 30px;
                background: #fff;
                border-radius: 3px;
                cursor: pointer;
                .active-target, .api-list-active{
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    padding-left: 10px;
                    border-radius: 3px;
                    color: #333;
                    box-shadow: 2px 2px 4px 0 #aaa;
                    box-sizing: border-box;
                    &::after{
                        position: absolute;
                        right: 10px;
                        top: 12px;
                        content: "";
                        border: 6px solid #666;
                        border-bottom: none;
                        border-left-color: transparent;
                        border-right-color: transparent;
                    }
                }
                .dropdown-list, .api-list{
                    position: absolute;
                    top: 100%;
                    width: 100%;
                    background: #fff;
                    box-shadow: 2px 2px 4px 0 #aaa;
                }
                .dropdown-list-item, .api-list-item{
                    padding-left: 10px;
                    &:hover{
                        background: #eee;
                    }
                }
            }
            .plugin-list{
                float: left;
                width: 220px;
                height: 150px;
                background: #fff;
                overflow: auto;
                p{
                    height: 25px;
                    line-height: 25px;
                    padding-left: 10px;
                    cursor: pointer;
                    &:hover{
                        background: #eee;
                    }
                }
                .active-point{
                    float: right;
                    width: 8px;
                    height: 8px;
                    background: #00aaff;
                    margin: 7.5px 10px 0 0;
                }
            }
            .active-plugin-list{
                float: right;
                width: 220px;
                height: 150px;
                background: #fff;
                overflow: auto;
                p{
                    height: 25px;
                    line-height: 25px;
                    padding-left: 10px;
                }
            }
            .plugin-label{
                display: block;
            }
            .confirm-btn{
                float: right;
                margin-right: 30px;
                width: 80px;
                height: 30px;
                line-height: 30px;
                outline: none;
                border: none;
                cursor: pointer;
                background: rgb(51, 173, 0);
                color: #fff;
                transition: all .1s ease-in-out;
                &:hover{
                    background: rgb(126,200,86);
                }
            }
        }
    }

    .modal-enter {
  opacity: 0;
}

    .modal-leave-active {
    opacity: 0;
    }

    .modal-enter .modal-container,
    .modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
    }
</style>


