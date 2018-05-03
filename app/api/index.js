
import axios from 'axios'
axios.defaults.withCredentials = true

const API_HOST = 'http://192.168.2.206:8000'
// const API_HOST = ''


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

//添加用户
const ADD_USER_PATH = '/add_user'

export function addUser({
        params={},
        success,
        fail
    }) {
        axios
            .post(_handlePath(ADD_USER_PATH), params)
            .then(res => {
                success && success(res.data)
            })
            .catch(e => {
                fail && fail(e)
            })

}

//注销
const LOGOUT_PATH = '/logout'

export function logout({
        params={},
        success,
        fail
    }) {
        axios
            .get(_handlePath(LOGOUT_PATH))
            .then(res => {
                success && success(res.data)
            })
            .catch(e => {
                fail && fail(e)
            })

}

//获取用户名
const GET_USER_NAME = '/user'

export function getUserName({
        params={},
        success,
        fail
    }) {
        axios
            .get(_handlePath(GET_USER_NAME), params)
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

//任务搜索
const GET_TASK_SEARCH = '/search/task'

export function getTaskSearch({
    params={},
    success,
    fail
}) {
    axios
        .get(_handlePath(GET_TASK_SEARCH, params))
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

//漏洞搜索
const GET_VULN_SEARCH = '/search/vuln'

export function getVulnSearch({
    params={},
    success,
    fail
}) {
    axios
        .get(_handlePath(GET_VULN_SEARCH, params))
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

//插件搜索
const GET_PLUGIN_SEARCH = '/search/script'

export function getPluginSearch({
    params={},
    success,
    fail
}) {
    axios
        .get(_handlePath(GET_PLUGIN_SEARCH, params))
        .then(res => {
            success && success(res.data)
        })
        .catch(e => {
            fail && fail(e)
        })
}

//插件更新
const SCRIPT_UPDATE = '/script_update'

export function scriptUpdate({
    params={},
    success,
    fail
}) {
    axios
        .get(_handlePath(SCRIPT_UPDATE))
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