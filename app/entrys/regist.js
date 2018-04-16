
import Vue from 'vue'
import 'bootstrap'
import '../common/common.css'
import '../common/body.css'
import regist from '../components/regist.vue'

new Vue({
    el: '#app',
    render: h => h(regist)
})