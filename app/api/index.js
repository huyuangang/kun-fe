
import axios from 'axios'

const API_HOST = ''


//登陆
const LOGIN_PATH = '/login'

export function login({
        params={},
        success,
        fail
    }) {
        axios
            .post(_handlePath(LOGIN_PATH), params)
            .then(res => {
                success && success(res.data)
            })
            .catch(e => {
                fail && fail(e)
            })

}

//注册
const REGIST_PATH = '/create_admin'

export function regist({
        params={},
        success,
        fail
    }) {
        axios
            .post(_handlePath(REGIST_PATH), params)
            .then(res => {
                success && success(res.data)
            })
            .catch(e => {
                fail && fail(e)
            })

}

//任务状态
const GET_TASK_STATUS = '/task_count'

export function getTaskStatus({
    params={},
    success,
    fail
}) {
    axios
        .get(_handlePath(GET_TASK_STATUS), params)
        .then(res => {
            success && success(res.data)
        })
        .catch(e => {
            fail && fail(e)
        })
}

//任务列表
const GET_TASK_LIST = '/task_index'

export function getTaskList({
    params={},
    success,
    fail
}) {
    axios
        .get(_handlePath(GET_TASK_LIST), params)
        .then(res => {
            success && success(res.data)
        })
        .catch(e => {
            fail && fail(e)
        })
}

//漏洞排行
const GET_VULN_RANK = '/top_vuln'

export function getVulnRank({
    params={},
    success,
    fail
}) {
    axios
        .get(_handlePath(GET_VULN_RANK), params)
        .then(res => {
            success && success(res.data)
        })
        .catch(e => {
            fail && fail(e)
        })
}

//漏洞排行
const GET_SCRIPT_RANK = '/active_script'

export function getScriptRank({
    params={},
    success,
    fail
}) {
    axios
        .get(_handlePath(GET_SCRIPT_RANK), params)
        .then(res => {
            success && success(res.data)
        })
        .catch(e => {
            fail && fail(e)
        })
}

//漏洞排行
const GET_PLUGIN_LIST = '/get_scripts'

export function getPluginList({
    params={},
    success,
    fail
}) {
    axios
        .get(_handlePath(GET_PLUGIN_LIST), params)
        .then(res => {
            success && success(res.data)
        })
        .catch(e => {
            fail && fail(e)
        })
}

//提交扫描任务
const PUT_TASK = '/add_task'

export function putTask({
    params={},
    success,
    fail
}) {
    axios
        .post(_handlePath(PUT_TASK), params)
        .then(res => {
            success && success(res.data)
        })
        .catch(e => {
            fail && fail(e)
        })
}




function _handlePath(p) {
    return API_HOST + p;
}