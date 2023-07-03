<template>
    <div class="front">
        <el-form :model="searchForm" label-width="120px">
            <el-form-item class="input" label="租户名称">
                <el-input v-model="searchForm.name" />
            </el-form-item>
            <el-form-item class="input" label="手机号">
                <el-input v-model="searchForm.name" />
            </el-form-item>
            <el-form-item class="input" label="状态">
                <el-select v-model="searchForm.name" placeholder="请选择">
                    <el-option label="启用" value="shanghai" />
                    <el-option label="停用" value="beijing" />
                </el-select>
            </el-form-item>
        </el-form>
        <el-button class="search" type="primary">查询</el-button>
    </div>

    <div class="tail">
        <div class="tail-action">
            <el-button type="primary" @click="dialogVisible1 = true">新增租户</el-button>
            <el-button type="primary">启用</el-button>
        </div>
        <el-table :data="tableData()" border style="width: 100%">
            <el-table-column type="selection" min-width="40" />
            <el-table-column type="index" lable="序号" min-width="40" />
            <el-table-column prop="tenantId" label="租户ID" min-width="60" />
            <el-table-column prop="tenantName" label="租户名称" min-width="60" />
            <el-table-column prop="phonenumber" label="手机号" min-width="60" />
            <el-table-column prop="createTime" label="创建时间" min-width="60" />
            <el-table-column fixed="right" label="Operations" width="120PX">
                <template #default="scope">
                    <el-button link type="primary" size="small" @click="dialogVisible2 = true">编辑</el-button>
                    <el-button link type="primary" size="small"
                        @click="handleDeleteTenant(scope.row.tenantId)">删除</el-button>
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
        <el-dialog v-model="dialogVisible1" title="新增租户" width="30%" :show-close="false" :close-on-click-modal="true">
            <div>
                <el-form :model="tenantForm" label-width="120px" :rules="tenantRules">
                    <el-form-item label="租户编号" prop="tenantCode" :required="true">
                        <el-input v-model="tenantForm.tenantCode" placeholder="请输入租户编号" />
                    </el-form-item>
                    <el-form-item label="租户公司名称" prop="tenantCode" :required="true">
                        <el-input v-model="tenantForm.tenantName" placeholder="请输入租户公司名称" />
                    </el-form-item>
                    <el-form-item label="管理员用户主键">
                        <el-input v-model="tenantForm.adminId" placeholder="请输入管理员用户主键" />
                    </el-form-item>
                    <el-form-item label="手机号码">
                        <el-input v-model="tenantForm.phonenumber" placeholder="请输入手机号码" />
                    </el-form-item>
                    <el-form-item label="租户邮箱">
                        <el-input v-model="tenantForm.email" placeholder="请输入租户邮箱" />
                    </el-form-item>
                    <el-form-item label="联系地址">
                        <el-input v-model="tenantForm.address" placeholder="请输入联系地址" />
                    </el-form-item>
                    <el-form-item label="备注">
                        <el-input v-model="tenantForm.remark" placeholder="请输入内容" />
                    </el-form-item>
                    <el-form-item label="限制容量">
                        <el-input v-model="tenantForm.volumnLimit" placeholder="请输入限制容量" />
                    </el-form-item>
                    <el-form-item label="租户等级">
                        <el-input v-model="tenantForm.tenantLevel" placeholder="请输入租户等级" />
                    </el-form-item>
                    <el-form-item label="有效期限">
                        <el-date-picker v-model="tenantForm.tenantTerm" type="datetime" placeholder="请输入有效期限" />
                    </el-form-item>

                    <el-form-item label="激活码">
                        <el-input v-model="tenantForm.tenantKey" placeholder="请输入激活码" />
                    </el-form-item>

                </el-form>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible1 = false">取消</el-button>
                    <el-button type="primary" @click="handleAddTenant">
                        确认
                    </el-button>
                </span>
            </template>
        </el-dialog>

        <el-dialog v-model="dialogVisible2" title="编辑租户" width="30%" :show-close="false">
            <div>
                <el-form :model="tenantForm" label-width="120px">
                    <el-form-item label="租户名称">
                        <el-input v-model="tenantForm.tenantName" />
                    </el-form-item>
                    <el-form-item label="手机电话">
                        <el-input v-model="tenantForm.phone" />
                    </el-form-item>
                    <el-form-item label="租户账号">
                        <el-input v-model="tenantForm.account" />
                    </el-form-item>
                    <el-form-item label="租户密码">
                        <el-input v-model="tenantForm.password" />
                    </el-form-item>
                    <el-form-item label="角色选择">
                        <el-select v-model="tenantForm.role" placeholder="请选择该用户角色">
                            <el-option label="采购" value="shanghai" />
                            <el-option label="管理" value="beijing" />
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible2 = false">取消</el-button>
                    <el-button type="primary" @click="dialogVisible2 = false">
                        确认
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>
         
<script >
import { ref, defineComponent, reactive, toRefs, } from "vue";
import { ElMessageBox, ElMessage, } from 'element-plus'
import { addTenant, deleteTenant, getTenantList } from '@/api/auth'
import { onMounted } from "vue";

export default defineComponent({
    name: "UserRole",
    components: {},

    setup() {
        //表格的全数据（这里是自定义的列表，要看分页效果自行往此数组内加数据）
        let tenantData = reactive({
            data: []
        });
        const searchForm = reactive({
            name: '',

        });
        const tenantForm = reactive({
            tenantCode: '',
            tenantName: '',
            phonenumber: '',
            adminId: '',
            email: '',
            address: '',
            email: '',
            tenantLevel: 1,
            tenantTerm: '',
            volumnLimit: 30,
            remark: '',
            tenantKey: '',
        });
        const tenantRules = reactive({
            tenantCode: [{ required: true, message: '请输入内容', trigger: 'blur' },
            { min: 3, max: 10, message: '账号长度 在 3 到 5长度之间', trigger: 'blur' }],
        });

        let dialogVisible1 = ref(false)
        const dialogVisible2 = ref(false)
        //表格用到的参数
        let state = reactive({
            data: {
                page: 1,
                limit: 10,
                total: tenantData.data.length,
            }
        });
        onMounted(() => {
            handleGetTenantList(state.data.page, state.data.limit)
        })

        //前端限制分页（tableData为当前展示页表格）
        const tableData = () => {
            return tenantData.data
        };
        //改变页码
        const handleCurrentChange = (e) => {
            state.page = e;
            handleGetTenantList(e, state.data.limit)
        };
        //改变页数限制
        const handleSizeChange = (e) => {
            state.limit = e;
            handleGetTenantList(state.data.page, e)
        };

        const handleGetTenantList = (page, limit) => {
            getTenantList(page, limit).then((res) => {
                tenantData.data = res.rows
                state.data.total = res.total
            })
        }
        //添加租户
        const handleAddTenant = () => {
            ElMessageBox.confirm('确认提交?')
                .then(() => {
                    addTenant(tenantForm).then(() => {
                        dialogVisible1.value = false
                        handleGetTenantList(state.data.page, state.data.limit)
                    })
                })
                .catch(() => {
                    // catch error
                })

        }

        const handleDeleteTenant = (tenantId) => {        //删除租户
            ElMessageBox.confirm(
                '是否要删除该用户?',
                '提示',
                {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }
            )
                .then(() => {
                    deleteTenant(tenantId).then(() => {
                        handleGetTenantList(state.data.page, state.data.limit)
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



        return {
            tenantData,
            dialogVisible1,
            dialogVisible2,
            searchForm,
            tenantForm,
            tenantRules,
            tableData,
            handleCurrentChange,
            handleSizeChange,
            handleDeleteTenant, handleAddTenant, handleGetTenantList,
            ...toRefs(state),
        };
    },
});
</script>
        
<style rel="stylesheet/scss" lang="scss">
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