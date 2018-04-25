<template>
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
                        <span class="active-target" @click="dropChange">{{activeTraget}}</span>
                        <ul class="dropdown-list" v-show="targetShow">
                            <li class="dropdown-list-item" v-for="(t, index) in targetList" @click="chooseTarget(t)" :key="index">{{t}}</li>
                        </ul>
                    </div>
                </div>
                <div class="form-group" v-show="activeTraget==='URL' || activeTraget==='IP段'">
                    <label for="">请输入{{activeTraget}}</label>
                    <input class="url-area" type="text" v-model="url">
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
</template>

<script>
import { getPluginList, putTask } from '../api'
export default {
    data() {
        return {
            targetList: ['URL', 'IP段', '文件', '爬虫', 'API'],
            pluginList: [],
            activeTraget: 'URL',
            targetShow: false,
            taskName: '',
            url: ''
        }
    },
    methods: {
        getPluginList() {
            let me = this;
            getPluginList({
                success(data) {
                    me.pluginList = data;
                    console.log(data)
                },
                fail(e) {
                    console.log(e);
                }
            })
        },
        dropChange() {
            this.targetShow = !this.targetShow;
        },
        chooseTarget(t) {
            this.activeTraget = t;
            this.targetShow = false;
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
            let me = this;
            let index = this.targetList.indexOf(this.activeTraget);
            putTask({
                params: {
                    task_type: index,
                    task_name: me.taskName,
                    target: me.url,
                    script: me.getChooseSctipt()
                },
                success(data){
                    console.log(data);
                    me.$emit('close');
                },
                fail(e) {
                    me.$emit('close');
                    console.log(e);
                }
            })
        }
    },
    created() {
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
            .task-name-area, .url-area{
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
            .target-wrap{
                position: relative;
                float: right;
                width: 450px;
                height: 30px;
                line-height: 30px;
                background: #fff;
                border-radius: 3px;
                cursor: pointer;
                .active-target{
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    padding-left: 10px;
                    border-radius: 3px;
                    color: #333;
                    box-shadow: 2px 2px 4px 0 #aaa;
                    box-sizing: border-box;
                }
                .dropdown-list{
                    position: absolute;
                    top: 100%;
                    width: 100%;
                    background: #fff;
                    box-shadow: 2px 2px 4px 0 #aaa;
                }
                .dropdown-list-item{
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
</style>


