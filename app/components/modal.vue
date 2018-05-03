
<template>
    <div class="modal">
        <div class="modal-content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
  
}
</script>

<style lang="less" scoped>
    .modal{
        position: fixed;
        z-index: 9998;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, .5);
    }
    .modal-content{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        padding: 10px;
        background-color: #fff;
        border-radius: 2px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    }
</style>

