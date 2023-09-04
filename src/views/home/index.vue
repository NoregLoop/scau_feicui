<template>
    <div class="iframe_box">
        <div class="load" element-loading-text="拼命加载中"></div>
        <iframe src="/static/index.html" width="100%" height="900px" ref="iframeDom"></iframe>
    </div>
</template>
<script>
import { ref, defineComponent, reactive, toRefs, onMounted } from "vue";
export default defineComponent({
    name: "home",
    components: {},
    setup() {
        const iframeDom = ref(null);
        const dataT = reactive({
            test: 111,
            temp: '一起',
            title: '翡翠ERP系统大数据可视化集成界面',
            supplierNum:'200家',
            userNum:'1200个',
            solderNum:'2000个',
        })
        onMounted(() => {
            iframeDom.value.contentWindow.addEventListener('load', function () {
                // 在这里执行加载完成后的操作
                console.log('Iframe 加载完成');
                const dataStr = JSON.stringify(dataT);
                try {
                    iframeDom.value.contentWindow.postMessage({
                        total:dataStr
                    }, '*')
                } catch (error) {
                    console.log(error)
                }
            });

        })
        return {
            iframeDom
        }
    }
})
</script>