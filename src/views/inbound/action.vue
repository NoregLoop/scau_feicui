<template>
  <body class="body">
    <div class="left">
      <el-form :model="inboundForm" ref='inbound' label-width="120px">
        <el-form-item class="left-input" label="采购方式">
          <el-select v-model="inboundForm.procurement" placeholder="请选择采购方式">
            <el-option label="自采" value="shanghai" />
            <el-option label="购货" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item class="left-input" label="入库单号">
          <el-input type="number" v-model="inboundForm.inboundNo" />
        </el-form-item>
        <el-form-item class="left-input" label="货品条码">
          <el-input v-model="inboundForm.jadeCode" />
        </el-form-item>
        <el-form-item class="left-input" label="供应商" style="width: 60%;">
          <el-select v-model="inboundForm.supplier" placeholder="搜索匹配/扫码" style="width: 60%;">
            <el-option label="Zone one" value="shanghai" />
            <el-option label="Zone two" value="beijing" />
          </el-select>
          <el-button @click="dialogVisible1 = true" style="color:#1890ff;">添加</el-button>
        </el-form-item>
        <el-form-item class="left-input" label="仓库编码" style="width: 60%;">
          <el-select v-model="inboundForm.storeNo" placeholder="搜索匹配/扫码" style="width: 60%;">
            <el-option label="Zone one" value="shanghai" />
            <el-option label="Zone two" value="beijing" />
          </el-select>
          <el-button @click="addStore" style="color:#1890ff;">添加</el-button>
        </el-form-item>

        <el-form-item label="货品名称">
          <el-input v-model="inboundForm.jadeName" />
        </el-form-item>
        <el-form-item prop="number" label="货品数量">
          <el-input oninput="value=value.replace(/[^\d.]/g,'')" v-model="inboundForm.jadeNumber" />
        </el-form-item>
        <el-form-item label="成本价">
          <el-input oninput="value=value.replace(/[^\d.]/g,'')" v-model="inboundForm.costPrice" />
        </el-form-item>
        <el-form-item label="成本价暗码">
          <el-input oninput="value=value.replace(/[^\d.]/g,'')" v-model="inboundForm.costPriceCode" />
        </el-form-item>
        <el-form-item label="标签价">
          <el-input oninput="value=value.replace(/[^\d.]/g,'')" v-model="inboundForm.tagPrice" />
        </el-form-item>
        <el-form-item label="标签价暗码">
          <el-input oninput="value=value.replace(/[^\d.]/g,'')" v-model="inboundForm.tagPriceCode" />
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="inboundForm.note" />
        </el-form-item>

        <el-form-item label="是否数据缓存">
          <el-switch v-model="inboundForm.isstore" />
          <el-text tag="ins" style="padding-left: 20px;color:#1890ff;">缓存字段</el-text>
        </el-form-item>
        <el-form-item label="是否入库后打印">
          <el-switch v-model="inboundForm.isprint" />
          <el-text tag="ins" style="padding-left: 20px;color:#1890ff;">Rongta RP4</el-text>
        </el-form-item>
        <el-form-item label="是否入库后拍照">
          <el-switch v-model="inboundForm.isphoto" />
        </el-form-item>
      </el-form>
      <div class="left-end">
        <el-button type="primary" @click="onSubmit">确认入库</el-button>
        <el-button @click="cleanForm">重置</el-button>
      </div>
    </div>

    <div class="right">
      <div class="right-img">
        <el-empty description="No image" image="" />
      </div>
      <div class="right-action">
        <el-button @click="addStore" style="color:#1890ff;">拍照</el-button>
        <el-button @click="addStore" style="color:#1890ff;">打开摄像头</el-button>
      </div>
      <el-col class="right-img-upload">
        <el-upload class="uploader" action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
          :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="upload" />
          <el-icon v-else class="uploader-icon">
            <Plus />
          </el-icon>
        </el-upload>
      </el-col>

      <div id="printTest">
        <p class="name">翡翠龙牌</p>
        <el-image class="barcode" id="barcode" />
        <span class="code">{{ code }}</span>
      </div>
      <el-button v-print="printTest">打印</el-button>
    </div>

    <div class="dialog-list">
      <el-dialog v-model="dialogVisible1" title="添加供应商" width="30%" :before-close="handleClose" :show-close="false">
        <div>
          <el-form :model="supplierForm" label-width="120px">
            <el-form-item label="供应商名称">
              <el-input v-model="supplierForm.name" />
            </el-form-item>
            <el-form-item label="手机电话">
              <el-input v-model="supplierForm.phone" />
            </el-form-item>
            <el-form-item label="地址">
              <el-input v-model="supplierForm.address" />
            </el-form-item>
            <el-form-item label="收款人姓名">
              <el-input v-model="supplierForm.payeeName" />
            </el-form-item>
            <el-form-item label="收款账号">
              <el-input v-model="supplierForm.payeeAccount" />
            </el-form-item>
            <el-form-item label="结算方式">
              <el-radio-group v-model="supplierForm.settlement" class="ml-4">
                <el-radio label="1" size="large">成本价百分比计算</el-radio>
                <el-radio label="2" size="large">标签价百分比计算</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="结算比率">
              <el-select v-model="supplierForm.settleratio" placeholder="请选择采购方式">
                <el-option label="Zone one" value="shanghai" />
                <el-option label="Zone two" value="beijing" />
              </el-select>
            </el-form-item>
            <el-form-item label="拦截天数">
              <el-select v-model="supplierForm.alertDay" placeholder="请选择采购方式">
                <el-option label="Zone one" value="shanghai" />
                <el-option label="Zone two" value="beijing" />
              </el-select>
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="supplierForm.note" />
            </el-form-item>
            <el-form-item label="是否查看客户">
              <el-switch v-model="supplierForm.authority1" />
              <el-text tag="ins" style="padding-left: 20px;color:#1890ff;">是</el-text>
            </el-form-item>
            <el-form-item label="是否查看销售价">
              <el-switch v-model="supplierForm.authority2" />
              <el-text tag="ins" style="padding-left: 20px;color:#1890ff;">是</el-text>
            </el-form-item>
          </el-form>
        </div>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible1 = false">取消</el-button>
            <el-button type="primary" @click="dialogVisible1 = false">
              确认
            </el-button>
          </span>
        </template>
      </el-dialog>
    </div>

  </body>
</template>

<script>
import { onMounted, reactive, ref, nextTick, defineComponent } from 'vue';
import JsBarcode from 'jsbarcode';
import { Plus } from '@element-plus/icons-vue';

export default defineComponent({
  name: 'loginAccount',
  components: {
    Plus,
  },
  setup() {

    const code = ref('A456')  //条形码
    const inboundForm = reactive({  //入库表单数据
      procurement: '',
      inboundNo: '',
      jadeName: '',
      jadeCode: '',
      jadeNumber: '',
      tagPriceCode: '',
      tagPrice: '',
      costPrice: '',
      costPriceCode: '',
      storeNo: '',
      supplier: '',
      note: '',
      isstore: false,
      isprint: false,
      isphoto: false,
    })
    const supplierForm = reactive({ //供应商表单数据
      name: '',
      payeeName: '',
      payeeAccount: '',
      phone: '',
      address: '',
      settlement: '',
      settleratio: '',
      alertDay: '',
      note: '',
      authority1: false,
      authority2: false,
    });
    const dialogVisible1 = ref(false)//添加供应商
    const inbound = ref(null)
    //周期函数  生成条形码
    onMounted(() => {
      nextTick(() => {
        JsBarcode("#barcode", code.value, {
          format: "CODE128", //选择要使用的条形码类型
          width: 2, //设置条之间的宽度
          height: 50, //高度
          displayValue: false, //是否在条形码下方显示文字
          font: "STSong-Light, STHeiti, FangSong_GB2312",//设置文本的字体
          fontOptions: "bold", //设置条形码下方文字加粗
          textAlign: "center", //文字所在位置,默认中间
          text: code.value, //条形码下面显示的文本内容
          lineColor: "#000", //设置条和文本的颜色。
        })
      })
    })
    //打印
    const printTest = reactive({
      id: 'printTest', // 绑定打印区域的ID
      popTitle: ' ',
      standard: 'html5', // 默认打印文档类型，为html5（支持html5,loose,strict）
      previewBeforeOpenCallback() { console.log('预览') },
      endCallback: () => { // 打印后的回调函数
        console.log('打印')
      }
    })

    const cleanForm = () => {
      console.log('清空表单')
      inbound.value.resetFields()
    }

    //提交表单
    const handleClose = (e) => {
      ElMessageBox.confirm('确认提交?')
        .then(() => {
          done()
        })
        .catch(() => {
          // catch error
        })
    }


    const onSubmit = () => {
      console.log('submit!')
    }

    return {
      inboundForm,
      printTest,
      dialogVisible1,
      supplierForm,
      inbound,
      cleanForm,
      onSubmit,
      handleClose,
    };
  }
})
</script>
<style rel="stylesheet/scss" lang="scss">
@media print {

  .name {
    margin-left: 230px;
    margin-top: 10px;
  }

  .barcode {
    width: 85px;
    margin-left: 220px;
    margin-top: 3px;
  }

  .code {
    margin-left: 245px;
    margin-top: 0;
    font-size: xx-small;
  }

  @page {
    size: auto;
    margin: 0mm;
    padding: 0mm;
    resolution: 350dpi;
  }
}



.left-input {
  float: auto;
}

.left-end {
  margin-left: 20%;
}



.right-img {
  width: 100%;
  height: 40%;
  border: solid 1px;
}

.right-action {
  width: 100%;
  height: 40px;
  margin: 10px;
}

.right-img-upload {
  height: 150px;
  border-color: #000;
  border: solid 1px;
}

.left {
  float: left;
  width: 45%;
  height: 800px;
  background-color: #fff;
  padding: 20px;
}

.right {
  float: right;
  width: 45%;
  height: 800px;
  background-color: #fff;
  padding: 20px;
}

.uploader {
  float: left;

}

.uploader-icon {
  margin: 20px;
  float: left;
  width: 100px;
  height: 100px;
  border: dashed 1px;
  border-radius: 10px;
}
</style>
