<template>
    <div class="front">
        <el-form :model="searchForm" label-width="120px">
            <el-form-item class="input" label="仓位名字">
                <el-input v-model="searchForm.name" />
            </el-form-item>
        </el-form>
        <el-button class="search" type="primary">查询</el-button>
    </div>


    <div class="tail">
        <div class="tail-action">
            <el-button type="primary" @click="dialogVisible1 = true">新增仓位</el-button>
        </div>
        <el-table :data="tableData()" border style="width: 100%">
            <el-table-column prop="storageCode" label="仓位编码" min-width="60" />
            <el-table-column prop="storageName" label="仓位名字" min-width="60" />
            <el-table-column prop="createBy" label="创建人" min-width="60" />
            <el-table-column prop="createTime" label="创建时间" min-width="60" />
            <el-table-column prop="remark" label="备注" min-width="60" />
            <el-table-column prop="status" label="状态" min-width="80" :filter-multiple="false" :filters="[
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
        <el-dialog v-model="dialogVisible1" title="新建仓位" width="30%" :close-on-click-modal="true" :show-close="false">
            <div>
                <el-form :model="storageForm" label-width="120px" :rules="storageRules">
                    <el-form-item label="仓位编码" prop="storageCode" :required="true">
                        <el-input v-model="storageForm.storageCode" />
                    </el-form-item>
                    <el-form-item label="仓位名字" prop="storageName" :required="true">
                        <el-input v-model="storageForm.storageName" />
                    </el-form-item>
                    <el-form-item label="备注" :required="true">
                        <el-input v-model="storageForm.remark" />
                    </el-form-item>
                    <el-form-item label="最大容量" :required="true">
                        <el-input v-model="storageForm.maxCap" />
                    </el-form-item>
                </el-form>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible1 = false">取消</el-button>
                    <el-button type="primary" @click="handleAddStorage">
                        确认
                    </el-button>
                </span>
            </template>
        </el-dialog>

        <el-dialog v-model="dialogVisible2" title="编辑仓位" width="30%" :before-close="handleClose" :show-close="false">
            <div>
                <el-form :model="storageForm" label-width="120px">
                    <el-form-item label="仓位编码" prop="storageCode" :required="true">
                        <el-input v-model="storageForm.storageCode" />
                    </el-form-item>
                    <el-form-item label="仓位名字" prop="storageName" :required="true">
                        <el-input v-model="storageForm.storageName" />
                    </el-form-item>
                    <el-form-item label="备注" :required="true">
                        <el-input v-model="storageForm.remark" />
                    </el-form-item>
                    <el-form-item label="最大容量" :required="true">
                        <el-input v-model="storageForm.maxCap" />
                    </el-form-item>
                </el-form>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible2 = false">取消</el-button>
                    <el-button type="primary" @click="handleUpdateStorage">
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
import { getStorageList, addStorage, deleteStorage, updateStorage } from '@/api/setting'

export default defineComponent({
    name: "UserRole",
    components: {},

    setup() {
        let storageData = reactive({
            data: [],
        });
        const storageForm = reactive({
            storageName: '',
            storageCode: '',
            remark: '',
            status: 0,
            maxCap: '',
            deptId: "1",
            id:'',
        });
        const searchForm = reactive({
            name: '',

        });
        let dialogVisible1 = ref(false)
        const dialogVisible2 = ref(false)
        const storageRules = reactive({
            storageName: [{ required: true, message: '请输入内容', trigger: 'blur' },
            { min: 3, max: 10, message: '账号长度 在 3 到 10长度之间', trigger: 'blur' }],
            storageCode: [{ required: true, message: '请输入内容', trigger: 'blur' },
            { min: 3, max: 10, message: '账号长度 在 3 到 10长度之间', trigger: 'blur' }],
        });


        //表格用到的参数
        let state = reactive({
            data: {
                page: 1,
                limit: 10,
                total: storageData.data.length,
            }
        });

        const filterTag = (value, row) => {
            return row.status == value
        }
        onMounted(() => {
            handleGetStorageList(state.data.page, state.data.limit)
        })


        const handleGetStorageList = (page, limit) => {
            getStorageList(page, limit).then((res) => {
                storageData.data = res.rows
                state.data.total = res.total
            })
        }
        const tableData = () => {
            return storageData.data
        };
        //改变页码
        const handleCurrentChange = (e) => {
            state.page = e;
            handleGetStorageList(e, state.data.limit)
        };
        //改变页数限制
        const handleSizeChange = (e) => {
            state.limit = e;
            handleGetStorageList(state.data.page, e)
        };

        //添加仓位
        const handleAddStorage = () => {
            ElMessageBox.confirm('确认提交?')
                .then(() => {
                    addStorage(storageForm).then(() => {
                        dialogVisible1.value = false
                        handleGetStorageList(state.data.page, state.data.limit)
                    })
                })
                .catch(() => {
                    // catch error
                })

        }

        const handleDeleteRole = (storageId) => { //删除仓位
            ElMessageBox.confirm(
                '是否要删除该仓位?',
                '提示',
                {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }
            )
                .then(() => {
                    deleteStorage(storageId).then(() => {
                        handleGetStorageList(state.data.page, state.data.limit)
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

        const handleOpenEdit = (data) => { //打开编辑仓位
            dialogVisible2.value = true
            storageForm.storageCode = data.storageCode
            storageForm.storageName = data.storageName
            storageForm.remark = data.remark
            storageForm.maxCap = data.maxCap
            storageForm.id = data.id
        }

        const handleUpdateStorage = () => {  //编辑仓位
            ElMessageBox.confirm('确认提交?')
                .then(() => {
                    updateStorage(storageForm).then(() => {
                        dialogVisible2.value = false
                        handleGetStorageList(state.data.page, state.data.limit)
                    })
                })
                .catch(() => {
                    // catch error
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
            storageData,
            dialogVisible1,
            dialogVisible2,
            searchForm,
            storageForm,
            storageRules,
            tableData, filterTag,
            handleCurrentChange,
            handleSizeChange,
            handleClose,
            handleDeleteRole, handleAddStorage, handleGetStorageList,handleUpdateStorage,
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