<template>
    <div class="front">
        <div class="left">
            <div class="front-data">
                <el-row :gutter="20" class="business-data">
                    <el-col :span="3.5">
                        <div class="data-title">货品总数(件)</div>
                    </el-col>
                    <el-col :span="3.5">
                        <div class="data-title">在仓货品数量(件)</div>
                    </el-col>
                    <el-col :span="3.5">
                        <div class="data-title">已售物品数(件)</div>
                    </el-col>
                    <el-col :span="3.5">
                        <div class="data-title">已售退货数(件)</div>
                    </el-col>
                    <el-col :span="3.5">
                        <div class="data-title">退货占比</div>
                    </el-col>
                </el-row>
            </div>
            <div class="front-action">
                <span>常用操作</span>
                <el-row :gutter="20" class="business-action">
                    <el-col :span="3.5">
                        <div class="action-title">快速入库</div>
                    </el-col>
                    <el-col :span="3.5">
                        <div class="action-title">出库操作</div>
                    </el-col>

                </el-row>
            </div>
        </div>

        <div class="right">
            <div class="front-timeline">
                <div style="margin-bottom: 5px;">最近操作</div>
                <el-row :gutter="20" class="recent-action" >
                    <div class="timeline">
                        <div class="timeline-item">
                            <div class="time"> 2023/7/20-16:16:54 </div>
                            <div class="text"> 执行了入库单号为000001的入库操作 </div>
                        </div>
                        <div class="timeline-item">
                            <div class="time"> 2023/7/20-16:16:54 </div>
                            <div class="text"> 执行了入库单号为000001的入库操作 </div>
                        </div>
                        <!-- 添加更多节点 -->
                    </div>

                </el-row>
            </div>
        </div>

    </div>
</template>
<script >
import { ref, defineComponent, reactive, toRefs, } from "vue";
export default defineComponent({
    name: "home",
    components: {},
    setup() {

        return {

        }
    }
})
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.front {
}

.left {
    float: left;
}

.right {
    float: right;
}

.front-data {
    background-color: #fff;
    padding: 15px;
    width: 850px;
    .business-data {
        display: flex;
        flex-wrap: wrap;
        .el-col {
            height: 70px;
            width: 150px;
            margin-left: 20px;
            border: 1px solid #96c2f1 transparent;
            border-radius: 5%;
            background: #eefaff;
            box-shadow: 1px 1px 10px 3px #ccc;

            .data-title {
                text-align: left;
            }
        }
    }
}

.front-action {
    margin-top: 20px;
    background-color: #fff;
    padding: 15px;
    width: 850px;

    .business-action {
        display: flex;
        flex-wrap: wrap;

        .el-col {
            height: 35px;
            width: 100px;
            margin-left: 20px;
            border: 1px solid transparent;
            border-radius: 5%;
            background: #eefaff;
            box-shadow: 1px 1px 10px 3px #ccc;

            .action-title {
                text-align: left;
            }
        }
    }
}

.front-timeline {
    width: 450px;
    height: 175px;
    float: right;
    background-color: #fff;
    padding: 15px;

    //时间轴
    .timeline {
        position: relative;
        width: 100%;
    }

    .timeline::before {
        content: "";
        position: absolute;
        top: 0;
        left: 30%;
        bottom: 0;
        width: 2px;
        background-color: #ccc;
        transform: translateX(-50%);
    }

    .timeline-item {
        position: relative;
        display: flex;
        align-items: center;
        margin-bottom: 20px;
    }

    .timeline-item .time {
        color: #999;
        width: 120px;
        text-align: right;
        font-size: small;
    }

    .timeline-item .text {
        margin-left: 60px;
        flex-grow: 1;
        font-size: small;
    }
}
</style>