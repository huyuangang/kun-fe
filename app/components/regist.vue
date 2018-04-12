
<template>
    <div class="regist">
        <div class="main">
            <header class="header">kun<span>.scanner</span></header>
            <div class="form-wrap">
                <div class="form-group">
                    <input type="text" class="username" name="username" placeholder="用户名" v-model="username" @focus="nameActive=true" @blur="nameActive=false">
                    <div class="border-bottom" :class="{'active-bottom': nameActive}"></div>
                </div>
                <div class="form-group">
                    <input type="password" class="password" name="password" placeholder="密码" v-model="pwd" @focus="pwdActive=true" @blur="pwdActive=false">
                    <div class="border-bottom" :class="{'active-bottom': pwdActive}"></div>
                </div>
                <div class="form-group">
                    <input type="password" class="password" name="confirmpassword" placeholder="确认密码" v-model="confirmpwd" @focus="repwdActive=true" @blur="repwdActive=false">
                    <div class="border-bottom" :class="{'active-bottom': repwdActive}"></div>
                </div>
                <input type="submit" class="submit" value="注册" @click="regist">
            </div>
        </div>
    </div>
</template>

<script>
import * as API from '../api'
export default {
    data() {
        return {
            username: '',
            pwd: '',
            confirmpwd: '',
            nameActive: false,
            pwdActive: false,
            repwdActive: false
        }
    },
    methods:{
        regist() {
            if(this.username && this.pwd && this.confirmpwd) {
                API.regist({
                    params: {
                        username: this.username,
                        password: this.pwd,
                        confirm_password: this.confirmpwd
                    },
                    success(data) {
                        console.log(data)
                    },
                    fail(e) {
                        console.log('err', e);
                    }
                })
            }
        }
    }
}
</script>

<style lang="less" scoped>
    .regist{
        position: absolute;
        top: 20%;
        width: 100%;
        .main{
            width: 485px;
            margin: 0 auto;
        }
    }
    .header{
        padding-bottom: 30px;
        margin: 8px 0;
        font-weight: 400;
        font-size: 48px;
        color: rgb(117, 162, 74);
        span{
            font-size: 30px;
            color: #fff;
        }
    }
    .form-wrap {
        input[type=submit] {
            float: right;
            margin-left: 0;
            margin-right: 0;
            margin-top: 24px;
            padding: 0 10px;
            width: 110px;
            border-color: #fff;
            background-color: #fff;
            color: rgb(56, 65, 80);
            border: none;
            outline: none;
            cursor: pointer;
            border-radius: 2px;
            line-height: 32px;
            min-height: 32px;
            font-size: 14px;
            font-weight: 700;
        }
    }
    .form-group{
        border-bottom: 1px solid #fff;
        .border-bottom{
            border-bottom: 2px solid #fff;
            margin: auto;
            width: 100%;
            transform: scaleX(0);
            transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;
        }
        .active-bottom {
            transform: scaleX(1);
        }
        input[type=text], input[type=password] {
            padding: 5px 0;
            background: transparent;
            border: none;
            outline: none;
            width: 100%;
            color: #fff;
        }
    }
</style>


