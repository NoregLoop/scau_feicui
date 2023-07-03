<template>
    <div class="iframe_box">
        <div class="load" element-loading-text="拼命加载中"></div>
        <iframe src="/static/index.html" width="100%" height="900px" ref="iframeDom"></iframe>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                src:"",
            }
        },
        methods(){

        }
    }
</script>