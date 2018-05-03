<template>
    <div class="header clearfix">
        <div class="logo">kun</div>
        <ul class="nav">
            <li class="nav-item" :class="{'active-nav': active===index}" v-for="(l, index) in list" :key="index"><a :href="l.url">{{l.text}}</a></li>
        </ul>
        <div class="user-option">
            <span class="user-name">{{name}}</span>
            <ul class="option-list">
                <li class="option-item" @click="newUserShow=true">添加用户</li>
                <li class="option-item" @click="scriptUpdate">更新插件</li>
                <li class="option-item" @click="logout">注销</li>
            </ul>
        </div>
        <div class="search">
            <input type="text" class="search-input" :placeholder="tabs[tab].placeholder" v-model="searchStr" @keyup.enter="search">
            <a :href="jumpPath" ref="jump"></a>
            <div class="search-tab" @click="tabShow=!tabShow">
                <p class="search-tab-text">{{tabs[tab].text}}</p>
                <ul class="search-tab-list" :class="{'search-tab-list-show': tabShow}" >
                    <li class="list-item" v-for="(t, index) in tabs" :key="index" @click="tab=index;">{{t.text}}</li>
                </ul>
            </div>
        </div>
        <modal v-show="newUserShow">
            <div class="new-user">
                <header class="new-header">新建用户<span class="new-cancel-btn" @click="newUserShow=false">取消</span></header>
                <div class="user-form">
                    <div class="form-group">
                        <label class="user-form-label">用户名：</label>
                        <input type="text" class="user-form-input" v-model="username">
                    </div>
                    <div class="form-group">
                        <label class="user-form-label">密码：</label>
                        <input type="password" class="user-form-input" v-model="pwd">
                    </div>
                    <div class="form-group">
                        <label class="user-form-label">确认密码：</label>
                        <input type="password" class="user-form-input" v-model="confirmpwd">
                    </div>
                    <div class="form-group">
                        <div class="new-submit-btn" @click="addUser">确认新建</div>
                    </div>
                </div>
            </div>
        </modal>
    </div>
</template>

<script>
import { getUserName, logout, addUser, scriptUpdate } from '../../api'
import modal from '../modal.vue'
export default {
    props: [ 'active' ],
    data() {
        return {
            name: '',
            list: [
                { text: '首页', url: '/'},
                { text: '漏洞列表', url: '/vuln'},
                { text: '任务列表', url: '/task'},
                { text: '插件列表', url: '/script'},
                { text: '统计分析', url: '/'}
            ],
            tabs: [{
                text: '漏洞',
                type: 'vuln',
                placeholder: '检索目标'
            }, {
                text: '任务',
                type: 'task',
                placeholder: '检索任务名称'
            }, {
                text: '插件',
                type: 'script',
                placeholder: '检索插件详情'
            }],
            tab: 0,
            tabShow: false,
            newUserShow: false,
            username: '',
            pwd: '',
            confirmpwd: '',
            searchStr: '',
            jumpPath: ''
        }
    },
    components: { modal },
    methods: {
        logout() {
            logout({
                success: data => {
                    if(data.success) {
                        location.href = '/login'
                    }
                }
            });
        },
        addUser() {
            if(!this.username) {
                alert('请输入用户名')
                return;
            }
            if(!this.pwd) {
                alert('请输入密码')
                return;
            }
            if(this.pwd !== this.confirmpwd) {
                alert('两次密码不同')
                return;
            }
            addUser({
                params: {
                    username: this.username,
                    password: this.pwd,
                    confirm_password: this.confirmpwd
                },
                success: data => {
                    console.log(data);
                    alert('用户添加成功');
                    this.newUserShow = false;
                },
                fail: e => {
                    console.log('err', e);
                    alert('用户添加失败');
                    this.newUserShow = false;
                }
            })
        },
        search() {
            if(!this.searchStr) {
                return;
            }
            this.jumpPath =  `/${this.tabs[this.tab].type}?q=${this.searchStr}`
            this.$nextTick(() => {
                this.$refs.jump.click();
            })
        },
        scriptUpdate() {
            scriptUpdate({
                success: data => {
                    if(data.success) {
                        alert('更新成功')
                    } else {
                        alert('更新失败')
                    }
                },
                fail: e => {
                    console.log('err', e);
                    alert('更新失败')
                }
            })
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
    @color2: rgb(56, 65, 80);
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
        z-index: 1;
        &:hover{
            .user-name{
                background: #eff3f9;
            }
            .option-list{
                height: 120px;
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
            float: left;
            margin-top: 12.5px;
            width: 220px;
            height: 35px;
            outline: none;
            text-indent: 10px;
            border: 1px solid rgb(229, 232, 238);
            border-radius: 3px 0 0 3px;
        }
        .search-tab{
            float: left;
            position: relative;
            margin-top: 12.5px;
            height: 35px;
            width: 80px;
            text-indent: 10px;
            line-height: 35px;
            border: 1px solid rgb(229, 232, 238);
            border-left: none;
            border-radius: 0 3px 3px 0;
            cursor: default;
            &::after{
                position: absolute;
                top: 15px;
                right: 10px;
                display: block;
                content: " ";
                border: 5px solid #ccc;
                border-bottom: none;
                border-left-color: transparent;
                border-right-color: transparent;
            }
        }
        .search-tab-list{
            position: absolute;
            left: 0px;
            top: 35px;
            width: 80px;
            height: 0;
            overflow: hidden;
            transition: all .2s ease-in-out;
            background: #fff;
            box-shadow: 0 0 1px rgb(229, 232, 238);
            cursor: default;
            .list-item {
                &:hover{
                    color: @color;
                }
            }
        }
        .search-tab-list-show{
            height: 105px;
        }
    }
    .new-user{
        margin: 0 10px;
        .new-header{
            font-weight: 400;
            padding-bottom: 30px;
            font-size: 20px;
            color: @color2;
            text-align: center;
            .new-cancel-btn{
                float: right;
                font-size: 12px;
                color: #aaa;
                cursor: pointer;
                &:hover{
                    color: #666;
                }
            }
        }
        .form-group{
            margin-bottom: 10px;
        }
        .user-form-label{
            display: block;
            margin-bottom: 5px;
        }
        .user-form-input{
            padding: 5px 0;
            background: transparent;
            border: 1px solid @color2;
            border-radius: 3px;
            outline: none;
            width: 300px;
            color: @color2;
            font-size: 14px;
            text-indent: 10px;
        }
        .new-submit-btn{
            margin-top: 20px;
            background: @color2;
            color: #fff;
            text-align: center;
            height: 35px;
            line-height: 35px;
            cursor: pointer;
            border-radius: 3px;
        }
    }
</style>


