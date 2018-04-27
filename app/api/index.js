
import axios from 'axios'

// const API_HOST = 'http://192.168.2.206:8000'
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
const GET_TASK_LIST = '/task_list/index'

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
//任务页
const GET_TASK_PAGE = '/task_list/page'

export function getTaskPage({
    params={p:1},
    success,
    fail
}) {
    axios
        .get(_handlePath(GET_TASK_PAGE, params))
        .then(res => {
            success && success(res.data)
        })
        .catch(e => {
            fail && fail(e)
        })
}

//漏洞排行
const GET_VULN_RANK = '/vuln_list/index'

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
//漏洞分页
const GET_VULN_PAGE = '/vuln_list/page'

export function getVulnPage({
    params={p:1},
    success,
    fail
}) {
    axios
        .get(_handlePath(GET_VULN_PAGE, params))
        .then(res => {
            success && success(res.data)
        })
        .catch(e => {
            fail && fail(e)
        })
}

//漏洞排行
const GET_SCRIPT_RANK = '/script_list/index'

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

//插件
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

//插件分页
const GET_PLUGIN_PAGE = '/script_list/page'

export function getPluginPage({
    params={p:1},
    success,
    fail
}) {
    axios
        .get(_handlePath(GET_PLUGIN_PAGE, params))
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




function _handlePath(p, params) {
    let url = API_HOST + p;
    if(params) {
        let keys = Object.keys(params);
        let parr = []
        keys.forEach(item => {
            parr.push(item+'='+params[item])
        })
        url = url + '?' + parr.join('&');
    }
    return url;
}