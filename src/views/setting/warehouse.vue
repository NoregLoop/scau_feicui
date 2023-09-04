<template>
    <div class="front">
        <el-form :model="searchForm" label-width="120px">
            <el-form-item class="input" label="仓库类型">
                <el-input v-model="searchForm.name" />
            </el-form-item>
        </el-form>
        <el-button class="search" type="primary">查询</el-button>
    </div>


    <div class="tail">
        <div class="tail-action">
            <el-button type="primary" @click="dialogVisible1 = true">新增仓库</el-button>
        </div>
        <el-table :data="tableData()" border style="width: 100%">
            <el-table-column prop="warehouseCode" label="仓库编码" min-width="60" />
            <el-table-column prop="warehouseName" label="仓库类型" min-width="60" />
            <el-table-column prop="createBy" label="创建人" min-width="60" />
            <el-table-column prop="createTime" label="创建时间" min-width="60" />
            <el-table-column prop="remark" label="备注" min-width="60" />
            <el-table-column prop="isInOk" label="允许入库" min-width="80" :filters="[
                { text: '允许', value: 1 },
                { text: '禁止', value: 0 },
            ]" :filter-method="filterTag" filter-placement="bottom-end">
                <template #default="scope">
                    <el-tag :type="scope.row.status == 1 ? 'success' : 'danger'" disable-transitions>{{
                        scope.row.status == 1 ? '允许' : '禁止' }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="isOutOk" label="允许出库" min-width="80" :filters="[
                { text: '允许', value: 1 },
                { text: '禁止', value: 0 },
            ]" :filter-method="filterTag" filter-placement="bottom-end">
                <template #default="scope">
                    <el-tag :type="scope.row.status == 1 ? 'success' : 'danger'" disable-transitions>{{
                        scope.row.status == 1 ? '允许' : '禁止' }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="status" label="状态" min-width="80" :filters="[
                { text: '启用', value: 1 },
                { text: '停用', value: 0 },
            ]" :filter-method="filterTag" filter-placement="bottom-end">
                <template #default="scope">
                    <el-tag :type="scope.row.status == 1 ? 'success' : 'danger'" disable-transitions>{{
                        scope.row.status == 1 ? '启用' : '停用' }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="Operations" min-width="60">
                <template #default="scope">
                    <el-button link type="primary" size="small" @click="handleOpenEdit(scope.row)">编辑</el-button>
                    <el-button link type="primary" size="small" @click="handleDeleteRole(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination v-model:current-page="data.page" v-model:page-size="data.limit"
                layout="prev, pager, next ,total,sizes" :total="data.total" @current-change="handleCurrentChange"
                @size-change="handleSizeChange" />
        </div>
    </div>

    <div class="dialog-list">
        <el-dialog v-model="dialogVisible1" title="新建仓库" width="30%" :close-on-click-modal="true" :show-close="false">
            <div>
                <el-form :model="warehouseForm" label-width="120px" :rules="warehouseRules">
                    <el-form-item label="仓库编码" prop="warehouseCode" :required="true">
                        <el-input v-model="warehouseForm.warehouseCode" />
                    </el-form-item>
                    <el-form-item label="仓库名称" prop="warehouseName" :required="true">
                        <el-input v-model="warehouseForm.warehouseName" />
                    </el-form-item>
                    <el-form-item label="城市" :required="true">
                        <el-input v-model="warehouseForm.roleSort" />
                    </el-form-item>
                    <el-form-item label="地址" :required="true">
                        <el-input v-model="warehouseForm.address" />
                    </el-form-item>
                    <el-form-item label="最大容量" :required="true">
                        <el-input v-model="warehouseForm.maxCap" />
                    </el-form-item>
                    <el-form-item label="备注" >
                        <el-input v-model="warehouseForm.remark" />
                    </el-form-item>
                    <el-form-item label="允许入库">
                        <el-switch v-model="warehouseForm.isInOk" active-value="1" inactive-value="0"/>
                        <el-text tag="ins" style="padding-left: 20px;color:#1890ff;"></el-text>
                    </el-form-item>
                    <el-form-item label="允许出库">
                        <el-switch v-model="warehouseForm.isOutOk" active-value="1" inactive-value="0"/>
                        <el-text tag="ins" style="padding-left: 20px;color:#1890ff;"></el-text>
                    </el-form-item>
                </el-form>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible1 = false">取消</el-button>
                    <el-button type="primary" @click="handleAddWarehouse">
                        确认
                    </el-button>
                </span>
            </template>
        </el-dialog>

        <el-dialog v-model="dialogVisible2" title="编辑仓库" width="30%" :before-close="handleClose" :show-close="false">
            <div>
                <el-form :model="warehouseForm" label-width="120px">
                    <el-form-item label="仓库编码" prop="warehouseCode" :required="true">
                        <el-input v-model="warehouseForm.warehouseCode" />
                    </el-form-item>
                    <el-form-item label="仓库名称" prop="warehouseName" :required="true">
                        <el-input v-model="warehouseForm.warehouseName" />
                    </el-form-item>
                    <el-form-item label="城市" :required="true">
                        <el-input v-model="warehouseForm.city" />
                    </el-form-item>
                    <el-form-item label="地址" :required="true">
                        <el-input v-model="warehouseForm.address" />
                    </el-form-item>
                    <el-form-item label="最大容量" :required="true">
                        <el-input v-model="warehouseForm.maxCap" />
                    </el-form-item>
                    <el-form-item label="备注" >
                        <el-input v-model="warehouseForm.remark" />
                    </el-form-item>
                </el-form>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible2 = false">取消</el-button>
                    <el-button type="primary" @click="handleUpdateWarehouse">
                        确认
                    </el-button>
                </span>
            </template>
        </el-dialog>

    </div>
</template>
       
<script >
import { ref, defineComponent, reactive, toRefs, } from "vue";
import { ElMessageBox, ElMessage } from 'element-plus'
import { onMounted } from "vue";
import { getWarehouseList,addWarehouse,deleteWarehouse,updateWarehouse} from '@/api/setting'

export default defineComponent({
    name: "UserRole",
    components: {},

    setup() {
        let warehouseData = reactive({
            data: [],
        });
        const warehouseForm = reactive({
            warehouseName: '',
            warehouseCode: '',
            remark: '',
            status: 1,
            isInOk: '',
            isOutOk: '',
            deptId: "1",
            maxCap:'',
            city:'',
            address:'',
            id:'',
        });
        const searchForm = reactive({
            name: '',

        });
        let dialogVisible1 = ref(false)
        const dialogVisible2 = ref(false)
        const warehouseRules = reactive({
            warehouseCode: [{ required: true, message: '请输入内容', trigger: 'blur' },],
            warehouseName: [{ required: true, message: '请输入内容', trigger: 'blur' },
            { min: 3, max: 10, message: '账号长度 在 3 到 10长度之间', trigger: 'blur' }],
        });


        //表格用到的参数
        let state = reactive({
            data: {
                page: 1,
                limit: 10,
                total: warehouseData.data.length,
            }
        });

        const filterTag = (value, row) => {
            return row.status == value
        }
        onMounted(() => {
            handleGetWarehouseList(state.data.page, state.data.limit)
        })


        const handleGetWarehouseList = (page, limit) => {
            getWarehouseList(page, limit).then((res) => {
                warehouseData.data = res.rows
                state.data.total = res.total
            })
        }
        const tableData = () => {
            return warehouseData.data
        };
        //改变页码
        const handleCurrentChange = (e) => {
            state.page = e;
            handleGetWarehouseList(e, state.data.limit)
        };
        //改变页数限制
        const handleSizeChange = (e) => {
            state.limit = e;
            handleGetWarehouseList(state.data.page, e)
        };

        //添加仓库
        const handleAddWarehouse = () => {
            ElMessageBox.confirm('确认提交?')
                .then(() => {
                    addWarehouse(warehouseForm).then(() => {
                        dialogVisible1.value = false
                        handleGetWarehouseList(state.data.page, state.data.limit)
                    })
                })
                .catch(() => {
                    // catch error
                })

        }

        const handleOpenEdit = (data) => { //打开编辑仓库
            dialogVisible2.value = true
            warehouseForm.warehouseCode = data.warehouseCode
            warehouseForm.warehouseName = data.warehouseName
            warehouseForm.remark = data.remark
            warehouseForm.maxCap = data.maxCap
            warehouseForm.city = data.city
            warehouseForm.address = data.address
            warehouseForm.id=data.id
        }

        const handleUpdateWarehouse = () => {  //编辑仓库
            ElMessageBox.confirm('确认提交?')
                .then(() => {
                    updateWarehouse(warehouseForm).then(() => {
                        dialogVisible2.value = false
                        handleGetWarehouseList(state.data.page, state.data.limit)
                    })
                })
                .catch(() => {
                    // catch error
                })
        }
        const handleDeleteRole = (warehouseId) => { //删除仓库
            ElMessageBox.confirm(
                '是否要删除该仓库?',
                '提示',
                {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }
            )
                .then(() => {
                    deleteWarehouse(warehouseId).then(() => {
                        handleGetWarehouseList(state.data.page, state.data.limit)
                        ElMessage({
                            type: 'success',
                            message: '删除成功',
                        })
                    })
                }).catch(() => {
                    ElMessage({
                        type: 'info',
                        message: '取消操作',
                    })
                })
        }



        const handleClose = (e) => { //提交表单
            ElMessageBox.confirm('确认提交?')
                .then(() => {
                    done()
                })
                .catch(() => {
                    // catch error
                })
        }

        return {
            warehouseData,
            dialogVisible1,
            dialogVisible2,
            searchForm,
            warehouseForm,
            warehouseRules,
            tableData, filterTag,
            handleCurrentChange,
            handleSizeChange,
            handleClose,
            handleDeleteRole, handleAddWarehouse, handleGetWarehouseList,handleUpdateWarehouse,
            handleOpenEdit,
            ...toRefs(state),
        };
    },
});
</script>
      
<style rel="stylesheet/scss" lang="scss" scoped>
.front {
    background-color: #fff;
    padding: 10px;
    display: flex;

    .input {
        float: left;
    }

    .search {
        margin-left: 50px;
    }
}

.center {
    margin: 10px;
}

.form-add-checkbox {
    width: 200px;
    height: 260px;
    display: block;
    border: solid 1px #c9c9c9;

    .form-add-checkbox-item {
        width: 180px;
        margin: auto;
    }
}

.tail {
    background-color: #fff;
    margin-top: 40px;
    padding: 10px;

    .tail-action {
        margin-bottom: 10px;
        display: flex;
    }
}
</style>