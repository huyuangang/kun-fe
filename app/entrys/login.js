
import Vue from 'vue'
import 'bootstrap'
import '../common/common.css'
import login from '../components/login.vue'

new Vue({
    el: '#app',
    render: h => h(login)
})