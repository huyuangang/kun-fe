
import Vue from 'vue'
import '../common/common.css'
import taskDetail from '../components/taskDetail.vue'

new Vue({
    el: '#app',
    render: h => h(taskDetail)
})