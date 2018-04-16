
<template>
    <div class="index">
        <Header></Header>
        <div class="main">
            <ul class="scan-nav clearfix">
                <li class="scan-nav-item">
                    <div class="scan-circle scan-circle-finish">10</div>
                    <p class="scan-text">已完成</p>
                </li>
                <li class="scan-nav-item">
                    <div class="scan-circle scan-circle-running">10</div>
                    <p class="scan-text">扫描中</p>
                </li>
                <li class="scan-nav-item">
                    <div class="scan-circle scan-circle-waiting">10</div>
                    <p class="scan-text">等待中</p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import Header from './layout/header.vue'
export default {
    data() {
        return {

        }
    },
    components: { Header }
}
</script>

<style lang="less" scoped>

    .scan-nav{
        width: 960px;
        margin: auto;
        margin-top: 60px;
        .scan-nav-item{
            float: left;
            margin: 0 60px;
            .scan-circle{
                box-sizing: border-box;
                border-width: 5px;
                border-style: solid;
                width: 200px;
                height: 200px;
                border-radius: 50%;
                text-align: center;
                line-height: 200px;
                font-size: 48px;
                color: #00b0f0;
            }
            .scan-circle-finish{
                border-color: #07aefc;
            }
            .scan-circle-running{
                border-color: #26d25e;
            }
            .scan-circle-waiting{
                border-color: #fba22b;
            }
            .scan-text{
                margin-top: 20px;
                text-align: center;
            }
        }
    }
</style>


