
<template>
    <div class="regist">
        <div class="main">
            <header class="header">
                <p>kun<span>.scanner</span></p>
                <p class="line"></p>
            </header>
            <div class="form-wrap">
                <div class="form-group">
                    <label for="">用户名：</label>
                    <input type="text" class="username" name="username" placeholder="输入用户名" v-model="username" >
                </div>
                <div class="form-group">
                    <label for="">密码：</label>
                    <input type="password" class="password" name="password" placeholder="输入密码" v-model="pwd" >
                </div>
                <div class="form-group">
                    <label for="">确认密码：</label>
                    <input type="password" class="password" name="confirmpassword" placeholder="再次输入密码" v-model="confirmpwd" >
                </div>
                <input type="submit" class="submit" value="注 册" @click="regist">
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
            confirmpwd: ''
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
                    success: data => {
                        if(data.success) {
                            location.href = '/login'
                        }
                    },
                    fail: e => {
                        console.log('err', e);
                    }
                })
            }
        }
    }
}
</script>

<style lang="less" scoped>
    @color: rgb(56, 65, 80);
    .regist{
        position: absolute;
        top: 50%;
        width: 420px;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #fff;
        padding: 20px 20px 40px 20px;
        border-radius: 3px;
        box-sizing: border-box;
        box-shadow: 0 0 8px rgb(56, 65, 80, .24);
    }
    .header{
        font-weight: 400;
        padding-bottom: 30px;
        font-size: 48px;
        color: @color;
        text-align: center;
        .line{
            position: absolute;
            left: 0;
            width: 100%;
            height: 2px;
            background: @color;
        }
        span{
            font-size: 30px;
            color: #666;
        }
    }
    .form-wrap {
        input[type=submit] {
            display: block;
            margin-top: 24px;
            width: 100%;
            border-color: @color;
            background-color: @color;
            color: #fff;
            border: none;
            outline: none;
            cursor: pointer;
            border-radius: 2px;
            line-height: 40px;
            min-height: 40px;
            font-size: 14px;
            font-weight: 700;
        }
    }
    .form-group{
        input[type=text], input[type=password] {
            padding: 5px 0;
            background: transparent;
            border: 1px solid @color;
            border-radius: 3px;
            outline: none;
            width: 100%;
            color: rgb(56, 65, 80);
            font-size: 14px;
            text-indent: 10px;
        }
    }
</style>


