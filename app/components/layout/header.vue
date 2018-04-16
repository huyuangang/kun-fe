<template>
    <div class="header">
        <ul class="nav clearfix">
            <li class="nav-item home"><a href="">kun</a></li>
            <li class="nav-item"><a href="">统计分析</a></li>
            <li class="nav-item"><a href="">插件列表</a></li>
            <li class="nav-item"><a href="">扫描结果</a></li>
        </ul>
    </div>
</template>

<script>
export default {
  
}
</script>

<style lang="less" scoped>
    .header {
        height: 30px;
        line-height: 30px;
        padding: 0 10px;
        background: #373e40;
    }
    .nav {
        list-style: none;
        .nav-item {
            float: right;
            height: 60px;
            a {
                display: block;
                color: #eee;
                height: 30px;
                padding: 0 16px;
                text-decoration: none;
                transition: all .5s;
                &:hover {
                    background: #a2b4ba;
                    color: #373e40;
                }
            }
        }
        .home{
            float: left;
        }
    }
</style>


