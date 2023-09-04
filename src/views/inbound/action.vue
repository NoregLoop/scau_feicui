<template>
  <div class="left">
    <el-form :model="inboundForm" ref='inboundRef' label-width="120px" :rules="inboundOrderRules">
      <el-form-item class="left-input" label="采购方式" :required="true" prop="wms_inbound_type">
        <el-select v-model="inboundForm.wms_inbound_type" placeholder="请选择采购方式" @change="changeType()">
          <el-option v-for="item in typeList" :key="item.orderType" :label="item.inboundTypeName"
            :value="item.orderType" />
          <el-option label="借入" value="0" />
        </el-select>
      </el-form-item>
      <el-form-item class="left-input" label="入库单号" :required="true">
        <el-input v-model="inboundOrderCode" disabled />
      </el-form-item>
      <el-form-item class="left-input" label="货品条码" :required="true">
        <el-input v-model="inboundForm.barcode" required />
      </el-form-item>
      <el-form-item class="left-input" v-if="inboundType" label="供应商" style="width: 60%;" :required="true">
        <el-select v-model="inboundForm.supplierId" placeholder="搜索匹配/扫码" style="width: 60%;" prop="supplierId">
          <el-option v-for="item in supplierList" :key="item.id" :label="item.supplierName" :value="item.id" />
        </el-select>
        <el-button @click="dialogVisible1 = true" style="color:#1890ff;">添加</el-button>
      </el-form-item>
      <el-form-item class="left-input" v-if="!inboundType" label="借入客户" style="width: 60%;" :required="true">
        <el-select v-model="inboundForm.supplierId" placeholder="搜索匹配/扫码" style="width: 60%;">
          <el-option v-for="item in supplierList" :key="item.id" :label="item.supplierName" :value="item.id" />
        </el-select>
        <el-button @click="dialogVisible1 = true" style="color:#1890ff;">添加</el-button>
      </el-form-item>
      <el-form-item class="left-input" label="仓库编码" style="width: 60%;" :required="true">
        <el-select v-model="inboundForm.desWarehouseId" placeholder="搜索匹配/扫码" style="width: 60%;">
          <el-option v-for="item in warehouseList" :key="item.id" :label="item.warehouseName" :value="item.id" />
        </el-select>
        <el-button @click="addStore" style="color:#1890ff;">添加</el-button>
      </el-form-item>
      <el-form-item class="left-input" label="仓位条码" style="width: 60%;" :required="true">
        <el-select v-model="inboundForm.desStorageId" placeholder="搜索匹配/扫码" style="width: 60%;">
          <el-option v-for="item in storageList" :key="item.id" :label="item.storageName" :value="item.id" />
        </el-select>
        <el-button @click="addStore" style="color:#1890ff;">添加</el-button>
      </el-form-item>
      <el-form-item class="left-input" label="货品品类" style="width: 60%;" :required="true">
        <el-cascader v-model="inboundForm.jadeQuantity" :options="options" placeholder="打开选择品类"
          :props="{ expandTrigger: 'hover', emitPath: false }" @change="handleChange" style="width: 60%;"/>
          <el-button @click="addStore" style="color:#1890ff;">添加</el-button>
      </el-form-item>
      <el-form-item class="left-input" label="货品数量" :required="true" prop="jadeWeight">
        <el-input oninput="value=value.replace(/[^\d]/g,'')" v-model="inboundForm.jadeWeight" />
      </el-form-item>
      <el-form-item class="left-input" label="成本价" :required="true" prop="jadeCostPrice">
        <el-input oninput="value=value.replace(/[^\d.]/g,'')" v-model="inboundForm.jadeCostPrice" />
      </el-form-item>
      <!-- <el-form-item class="left-input" label="成本价暗码">
        <el-input oninput="value=value.replace(/[^\d.]/g,'')" v-model="inboundForm.costPriceCode" />
      </el-form-item> -->
      <el-form-item class="left-input" label="标签价" :required="true" prop="jadeTagPrice">
        <el-input oninput="value=value.replace(/[^\d.]/g,'')" v-model="inboundForm.jadeTagPrice" style="width: 50%;" />
        <el-input oninput="value=value.replace(/[^\d.]/g,'')" v-model="rate" style="width: 20%;"
          @change="handleNumberChange">
          <!-- <template #append style="font-size: 10px;">倍率</template> -->
        </el-input>
        <!-- <el-select v-model="magnification" style="width: 70px;size: small;">
        </el-select> -->
        <el-select v-model="operation" placeholder="" style="width: 30%;" @change="handleNumberChange">
          <el-option label="向下取整" value="floor"></el-option>
          <el-option label="向上取整" value="ceil"></el-option>
          <el-option label="四舍五入" value="round"></el-option>
          <el-option label="保留小数" value="toFixed"></el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item class="left-input" label="标签价暗码">
        <el-input oninput="value=value.replace(/[^\d.]/g,'')" v-model="inboundForm.tagPriceCode" />
      </el-form-item> -->
      <el-form-item class="left-input" label="市场价">
        <el-input oninput="value=value.replace(/[^\d.]/g,'')" v-model="inboundForm.jadeMarketPrice" />
      </el-form-item>
      <el-form-item class="left-input" label="备注">
        <el-input v-model="inboundForm.remark" />
      </el-form-item>

      <el-form-item class="left-input" label="是否数据缓存">
        <el-switch v-model="inboundForm.isstore" />
        <el-text tag="ins" style="padding-left: 20px;color:#1890ff;">缓存字段</el-text>
        <el-tooltip content="打开缓存后将保存上次入库的信息，条码自动加 1" placement="top">
          <el-icon>
            <QuestionFilled />
          </el-icon>
        </el-tooltip>
      </el-form-item>
      <el-form-item class="left-input" label="是否入库后打印">
        <el-switch v-model="inboundForm.isprint" />
        <el-text tag="ins" style="padding-left: 20px;color:#1890ff;">Rongta RP4</el-text>
      </el-form-item>
      <!-- <el-form-item class="left-input" label="是否入库后拍照">
        <el-switch v-model="inboundForm.isphoto" />
      </el-form-item> -->
      <el-form-item class="left-input" label="条码规则">
        <el-radio-group v-model="barcodeRule">
          <el-radio :label="3">相同条码</el-radio>
          <el-radio :label="6">递增条码</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- <el-form-item class="left-input" label="打印数量">
        <el-input v-model="inboundForm.remark" />
      </el-form-item> -->
    </el-form>
    <div class="left-end">
      <el-button type="primary" :loading="loading" @click.native.prevent="onSubmit">
        <span v-if="!loading">确认入库</span>
        <span v-else>入 库 中...</span>
      </el-button>
      <el-button @click="cleanForm">重置</el-button>
    </div>
  </div>

  <div class="right">
    <div class="right-photo">
      <!-- <div id='video-id' style="width: 100%;"></div> -->
      <video ref="videoElement" class="rigth-video" width="400" height="300" autoplay></video>
      <canvas ref="canvasElement" class="right-img"></canvas>
    </div>
    <div class="right-action">
      <el-upload action="http://47.106.116.146:8080/common/uploadImage" class="upload" :headers="{ Authorization: token }"
        :show-file-list="false" accept=".png,.jpg,.jpeg,.webp" style="display: inline-block;" :name="file"
        :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :on-error="console.log(error)"
        :on-success="handleUpload">
        <el-button style="color:#1890ff;">上传</el-button>
      </el-upload>
      <el-button @click="takePhoto" style="color:#1890ff;margin-left: 10px;">拍照</el-button>
      <el-button @click.native.prevent="triggerCamera" style="color:#1890ff;">{{ cameraActive ? '关闭摄像头' : '打开摄像头'
      }}</el-button>
    </div>
    <el-col class="imageBox">
      <div v-for="(photo, index) in imageUrlList" :key="index" class="imgList">
        <el-image :src="'http://47.106.116.146:8080/profile' + photo.url" alt="Photo" fit="contain"
          style="height: 120px; width: auto;" :preview-teleported="true" :lazy="true" :preview-src-list="imgPreview"
          @click="previewSrcList(photo.url)"></el-image>
        <el-input-number class="img-num" v-model="photo.num" :min="1" size="small" controls-position="right" />
        <el-icon class="img-del" @click="handleDelteImg(photo.id)">
          <Close />
        </el-icon>
      </div>
    </el-col>
    <el-col class="right-tips">当前翡翠编码为自动获取，已上传图片数{{ imageUrlList.length }}</el-col>

    <div id="printTest" class="right-print">
      <p class="name" style="font-size: large;">翡翠龙牌</p>
      <el-image class="barcode" id="barcode" />
      <span class="code">{{ inboundForm.barcode }}</span>
    </div>
    <!-- <el-button v-print="printTest">打印</el-button> -->
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
</template>

<script>
import { onBeforeMount, onMounted, reactive, ref, nextTick, defineComponent, watch } from 'vue';
import JsBarcode from 'jsbarcode';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Plus, QuestionFilled, Close } from '@element-plus/icons-vue';

import { getSupplierList } from "@/api/user"
import { getToken } from '@/utils/auth'
import { getOrderCode, inbounding, getJadeCode, addJade, getJadeCrop, getJadeFeature, getJadeType, getInboundTypeList } from '@/api/inbound'
import { getWarehouseList, getStorageList } from '@/api/setting';
import axios from 'axios'
import Webcam from 'webcamjs'

export default defineComponent({
  name: 'loginAccount',
  components: {
    Plus,
    QuestionFilled,
    Close,
  },
  setup() {
    const loading = ref(false)
    const inboundRef = ref()
    const barcodeRule = ref(3)
    const inboundType = ref(true)
    const videoElement = ref(null)
    const webcam = ref(null)
    const canvasElement = ref(null)
    const cameraActive = ref(false)
    const videoStream = ref(null)
    const dialogImageUrl = ref('')

    const rate = ref(2.0)
    const magnification = ref(2.0)//倍率控制
    const operation = ref('floor')
    const token = ref('')
    const dialogVisibleImg = ref(false)
    const inboundOrderCode = ref(1)
    const imageUrlList = ref([])
    const imgPreview = ref([])
    const inboundOrderRules = reactive({
      wms_inbound_type: [{ required: true, message: '采购方式不能为空', trigger: 'change' },],
      supplierId: [{ required: true, message: '采购方式不能为空', trigger: 'change' },],
      jadeWeight: [{ required: true, message: '货品数量不能为空', trigger: 'blur' },],
      jadeCostPrice: [{ required: true, message: '成本价不能为空', trigger: 'blur' },],
      jadeTagPrice: [{ required: true, message: '标签价不能为空', trigger: 'blur' },],
    });

    const inboundForm = reactive({  //入库表单数据
      wms_inbound_type: '',
      orderCode: '',
      barcode: 123,//条形码
      jadeWeight: '',
      tagPriceCode: '',
      jadeTagPrice: '',
      jadeCostPrice: '',
      costPriceCode: '',
      jadeMarketPrice: '',
      jadeQuantity: '',
      orderDate: "",
      validDate: "2023-07-27",
      desStorageId: "",
      desWarehouseId: "",
      supplierId: '',
      clientId: '',
      deptId: "1",
      remark: '',
      isstore: false,
      isprint: false,
      isphoto: false,
    })
    const jadeForm = reactive({
      jadeCode: '',
      genType: "1",
      orderCode: 1,
      jadeTypeId: 1,
      jadeName: "佛",
      jadeBarcode: "",
      storageId: 1,
      warehouseId: 1,
      jadeWeight: 30,
      costPrice: 1000,
      retailPrice: 2000,
      sellingPrice: 3000,
      imageId: 33,
      deptId: 1,
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
    const supplierList = ref([
    ])
    const warehouseList = ref([
    ])
    const storageList = ref([
    ])
    const typeList = ref([])
    const imgsList = ref([//图像列表

    ])
    const options = ref([])
    const dialogVisible1 = ref(false)//添加供应商


    onBeforeMount(() => {//获取数据
      token.value = getToken()
      getJadeType().then((res) => {
        res.data.forEach((item) => {
          if (item.children) {
            let temp = []
            item.children.forEach((item_c) => {
              temp.push({ value: item_c.id, label: item_c.jadeTypeName })
            })
            options.value.push({ value: item.id, label: item.jadeTypeName, children: temp }); // 将新的元素对象添加到结果数组中
          }
          else {
            options.value.push({ value: item.id, label: item.jadeTypeName }); // 将新的元素对象添加到结果数组中
          }
        })
      })
      getSupplierList().then((res) => {
        supplierList.value = res.rows
      })
      getInboundTypeList().then((res) => {
        typeList.value = res.rows
      })
      getWarehouseList().then((res) => {
        warehouseList.value = res.rows
      })
      getOrderCode().then((res) => {
        inboundOrderCode.value = res//获取入库单单号
        inboundForm.barcode = parseInt(res.substring(12, 22))
        inboundForm.orderCode = res
      })
      getStorageList().then((res) => {
        storageList.value = res.rows
        // inboundForm.desStorageId = res.rows[0].storageName
      })
    })
    onMounted(() => {    //周期函数  生成条形码

      nextTick(() => {
        JsBarcode("#barcode", inboundForm.barcode, {
          format: "CODE128", //选择要使用的条形码类型
          width: 2, //设置条之间的宽度
          height: 60, //高度
          displayValue: false, //是否在条形码下方显示文字
          font: "STSong-Light, STHeiti, FangSong_GB2312",//设置文本的字体
          // fontOptions: "bold", //设置条形码下方文字加粗
          textAlign: "center", //文字所在位置,默认中间
          text: inboundForm.barcode, //条形码下面显示的文本内容
          lineColor: "#000", //设置条和文本的颜色。
        })
      })
    })


    const takePhoto = () => { //调用摄像头后拍照
      const video = videoElement.value
      const canvas = canvasElement.value
      if (cameraActive.value) {
        if (video) try {
          // 将视频画面绘制到画布上
          const context = canvas.getContext('2d');
          // canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height)
          const devicePixelRatio = window.devicePixelRatio || 1;
          // Webcam.snap((data_uri) => {
          //   const blob = dataURItoBlob(data_uri);
          //   const formData = new FormData()
          //   formData.append("file", blob, "image.png")
          //   // 使用 Axios 发送 POST 请求
          //   axios.post("http://47.106.116.146:8080/common/uploadImage", formData, {
          //     headers: {
          //       "Content-Type": "multipart/form-data",
          //       "Authorization": token.value,
          //     },
          //   }).then((res) => {
          //     getJadeCrop({ image_path: res.data.url.slice(34) }).then((res_crop) => {//分割图片
          //       for (var key in res_crop.result) {
          //         imageUrlList.value.push({ id: key, url: res_crop.result[key], num: 1 })
          //       }
          //       imageUrlList.value.forEach((item) => {
          //         getJadeCode().then((code) => {
          //           item.code = code
          //         })
          //       })
          //     })
          //   })
          //     .catch((error) => {
          //       // 处理上传失败的错误
          //       console.error(error)
          //     })
          // });


          // 设置 Canvas 元素的实际大小
          canvas.width = 2000 * devicePixelRatio;   // 宽度为 400 像素
          canvas.height = 1500 * devicePixelRatio;  // 高度为 300 像素
          // 缩放 Canvas 以适应屏幕
          context.scale(devicePixelRatio, devicePixelRatio);
          // 绘制一些内容
          context.fillStyle = 'red';
          context.drawImage(video, 0, 0, canvas.width, canvas.height);
          // 将画布内容转换为图片 URL
          // 将canvas内容转换为Blob对象
          canvas.toBlob(blob => {
            // 使用Blob对象创建URL
            const formData = new FormData()
            formData.append("file", blob, "image.png")
            // 使用 Axios 发送 POST 请求
            axios.post("http://47.106.116.146:8080/common/uploadImage", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": token.value,
              },
            }).then((res) => {
              getJadeCrop({ image_path: res.data.url.slice(34) }).then((res_crop) => {//分割图片
                for (var key in res_crop.result) {
                  imageUrlList.value.push({ id: key, url: res_crop.result[key], num: 1 })
                }
                imageUrlList.value.forEach((item) => {
                  getJadeCode().then((code) => {
                    item.code = code
                  })
                })
              })
            })
              .catch((error) => {
                // 处理上传失败的错误
                console.error(error)
              })
          });

        }
          catch (error) {
            console.log(error)
            ElMessage.error('摄像头拍照失败')
          }
      }
      else {
        ElMessage.error('请先打开摄像头')
      }

    };
    const triggerCamera = async () => { //启动摄像头
      // if (cameraActive.value) {
      //   cameraActive.value = false
      //   Webcam.reset();
      // } else {
      //   try {
      //     console.log(navigator.mediaDevices.getUserMedia({ video: true }))
      //     cameraActive.value = true
      //     //调用摄像头
      //     Webcam.set({
      //       width: 400,//实时摄像机查看器的宽度
      //       height: 300,//实时摄像机查看器的高度
      //       dest_width: 400,//捕获相机图像的宽
      //       dest_height: 300,//捕获相机图像的高
      //       crop_width: 400,//最终裁剪图像的宽度(以像素为单位)，默认为dest_width。
      //       crop_height: 300,//最终裁剪图像的高度(以像素为单位)，默认为dest_height。
      //       image_format: "jpeg",//捕获图像的期望图像格式，可以是“jpeg”或“png”。
      //       jpeg_quality: 100,//对于JPEG图像，这是理想的质量，从0(最差)到100(最好)。
      //       enable_flash: true,//启用或禁用Flash回退，如果没有本机网络摄像头访问。
      //       force_flash: false,//将此设置为true将始终在adobeflash回退模式下运行。
      //       flip_horiz: false,//将此设置为true将水平翻转图像(镜像模式)。
      //       fps: 30,//设置所需的fps(帧/秒)捕获速率。
      //       swfURL: "./webcam.swf",//为adobeflash回退SWF文件设置一个备用位置
      //       flashNotDetectedText: "未检测到flash播放器的文本/html。",//未检测到flash播放器的文本/html。
      //       unfreeze_snap: true,//是否在拍照后解冻相机
      //       upload_name: "webcam",//在上传摄像头图像文件时使用哪个HTTP POST参数名
      //     });
      //     // DOM元素必须已经创建并且为空。将ID或CSS选择器传递给Webcam.attach()函数(挂载dom)
      //     Webcam.attach("#video-id");
      //   } catch {

      //   }
      // }



      if (cameraActive.value) {
        videoStream.value.getTracks().forEach(track => track.stop())//关闭摄像头代码
        videoElement.value.srcObject = null
        cameraActive.value = false
      } else {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
              videoStream.value = stream
              videoElement.value.srcObject = stream
              cameraActive.value = true
            })
            .catch(error => {
              console.log(error)
              ElMessage.error('获取摄像头失败')
            });
        }
        else {
          ElMessage.error('获取摄像头失败，请检查是否已连接摄像头')
        }

      }
    };
    const handleUpload = (res) => {
      getJadeCrop({ image_path: res.url.slice(34) }).then((res_crop) => {//分割图片
        for (var key in res_crop.result) {
          imageUrlList.value.push({ imageId: key, imageUrl: res_crop.result[key], num: 1 })
        }
        imageUrlList.value.forEach((item) => {
          getJadeCode().then((code) => {
            item.code = code
          })
        })
      })
      jadeForm.jadeWeight = imageUrlList.value.length
    }


    //打印
    const printTest = reactive({
      id: 'printTest', // 绑定打印区域的ID
      popTitle: ' ',
      standard: 'html5', // 默认打印文档类型，为html5（支持html5,loose,strict）
      previewBeforeOpenCallback() { console.log('预览') },
      endCallback: () => { // 打印后的回调函数
      }
    })
    const handleDelteImg = (id) => {
      imageUrlList.value.forEach((item) => {
        if (item.imageId == id) {
          imageUrlList.value.pop(item)
        }
      })
    }

    const handlePictureCardPreview = (uploadFile) => {  //图片预览
      console.log(uploadFile)
      dialogImageUrl.value = uploadFile.url
      dialogVisibleImg.value = true
    }

    const cleanForm = () => { //重置表单
      console.log('清空表单')
      inbound.value.resetFields()
    }
    const changeType = (value) => { //更换入库来源
      inboundForm.wms_inbound_type == 1 ? inboundType.value = true : inboundType.value = false
    }
    const previewSrcList = (imgUrl) => {//预览图片
      imgPreview.value = []
      imgPreview.value.push('http://47.106.116.146:8080/profile' + imgUrl)
    }

    const onSubmit = () => {//提交入库单
      if (imageUrlList.value.length == 0) {
        ElMessage.error('请先上传图片')
        return
      }
      inboundRef.value.validate().then(() => {
        ElMessageBox.confirm(
          '是否确认入库?',
          'Warning',
          {
            confirmButtonText: '是',
            cancelButtonText: '取消',
            type: 'warning',
          }
        ).then(() => {
          // 验证通过
          //入库单数据赋值新建货品单
          loading.value = true
          jadeForm.storageId = inboundForm.desStorageId
          jadeForm.warehouseId = inboundForm.desStorageId
          jadeForm.orderCode = inboundOrderCode
          jadeForm.jadeBarcode = inboundForm.barcode
          jadeForm.jadeWeight = 1
          jadeForm.retailPrice = inboundForm.jadeTagPrice
          jadeForm.costPrice = inboundForm.jadeCostPrice
          jadeForm.sellingPrice = inboundForm.jadeTagPrice
          imageUrlList.value.forEach((item) => {
            jadeForm.imageId = item.imageId
            jadeForm.jadeCode = item.code
            addJade(jadeForm)
          })
          getJadeFeature({ data:imageUrlList.value })
          inbounding(inboundForm).then((res) => {
            ElMessage.success('入库成功')
            imageUrlList.value = []
            loading.value = false
            if (!inboundForm.isstore) {
              inboundRef.value.resetFields()
              getOrderCode().then((res) => {
                inboundOrderCode.value = res//获取入库单单号
                inboundForm.barcode = parseInt(res.substring(12, 22))
                inboundForm.orderCode = res
              })
            } else {
              getOrderCode().then((res) => {
                inboundOrderCode.value = res//获取入库单单号
                inboundForm.barcode = parseInt(res.substring(12, 22))
                inboundForm.orderCode = res
              })
            }

          })
        }).catch(() => {
          ElMessage.info('已取消')
        })
      }).catch((err) => {
        //验证失败
        ElMessage.error('请正确填写信息');
        loading.value = false
      })
    }

    const handleNumberChange = () => {
      if (operation.value === 'floor') {
        inboundForm.jadeTagPrice = Math.floor(inboundForm.jadeCostPrice * rate.value);
      } else if (operation.value === 'ceil') {
        inboundForm.jadeTagPrice = Math.ceil(inboundForm.jadeCostPrice * rate.value);
      } else if (operation.value === 'round') {
        inboundForm.jadeTagPrice = Math.round(inboundForm.jadeCostPrice * rate.value);
      } else if (operation.value === 'toFixed') {
        inboundForm.jadeTagPrice = parseFloat((inboundForm.jadeCostPrice * rate.value).toFixed(1));
      }
    }
    watch(() => inboundForm.jadeCostPrice, (newValue) => {//成本价控制标签价
      if (operation.value == 'floor') {
        inboundForm.jadeTagPrice = Math.floor(newValue * rate.value);
      } else if (operation.value == 'ceil') {
        inboundForm.jadeTagPrice = Math.ceil(newValue * rate.value);
      } else if (operation.value == 'round') {
        inboundForm.jadeTagPrice = Math.round(newValue * rate.value);
      } else if (operation.value == 'toFixed') {
        inboundForm.jadeTagPrice = parseFloat((newValue * rate.value).toFixed(1));
      }
    });

    return {
      inboundForm, supplierForm, jadeForm, inboundRef, inboundOrderRules, token,
      inboundOrderCode, barcodeRule, imgPreview,
      dialogVisible1, cameraActive, videoStream, dialogVisibleImg, dialogImageUrl, webcam,
      operation, rate, magnification, typeList,
      videoElement, canvasElement, imageUrlList,
      options, imgsList, supplierList, warehouseList, storageList, inboundType,
      cleanForm, handleUpload, previewSrcList, handleDelteImg,
      onSubmit, triggerCamera, takePhoto, handlePictureCardPreview, changeType, handleNumberChange,
    };
  }
})
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@media print {

  .name {
    position: absolute;
    left: 240px;
    top: 0px;
  }

  .barcode {
    width: 60px;
    height: 30px;
    position: absolute;
    left: 222px;
    top: 48px;
  }

  .code {
    position: absolute;
    left: 260px;
    top: 83px;
    font-size: xx-small;
  }

  @page {
    size: auto;
    margin: 0mm;
    padding: 0mm;
    resolution: 800dpi;
  }
}

.left {
  float: left;
  width: 48%;
  height: 800px;
  background-color: #fff;
  padding: 20px;

  .left-input {
    float: auto;
    margin-bottom: 10px;

    /deep/ .el-form-item__label {
      font-size: x-small;
    }

    /deep/ .el-input__wrapper {
      height: 25px;
    }
  }

  .left-end {
    margin-left: 20%;
  }
}

.right {
  float: right;
  width: 45%;
  height: 800px;
  background-color: #fff;
  padding: 20px;

  .right-photo {
    width: 100%;
    border: solid 1px;
  }

  .right-tips {
    line-height: 40px;
    width: 100%;
    text-align: center;
    font-family: Arial;
    font-size: 12px;
    letter-spacing: 1px;
  }

  .rigth-video {
    flex: auto;
    width: 400px;
    height: 300px;
  }

  .right-img {
    flex: auto;
    // width: 400px;
    // height: 500px;
    position: absolute;
    top: -9999px;
    opacity: 0;
  }

  .right-action {
    width: 100%;
    height: 40px;
    margin: 10px;

    .el-upload {
      display: inline-block;
    }
  }

  .right-print {
    position: absolute;
    top: -9999px;
    opacity: 0;
  }

  .imageBox {
    min-height: 100px;
    border-color: #000;
    border: solid 1px;
    padding: 5px;
    display: flex;
    flex-wrap: wrap;


    /* 图片之间的间距 */
    .imgList {
      padding-right: 10px;
      padding-bottom: 25px;
      /* 可根据需要调整每个图片元素的宽度 */
      margin-right: 10px;
      /* 图片之间的间距 */
      margin-bottom: 10px;
      /* 每行图片的底部间距 */
      position: relative;
    }

    .img-num {
      position: absolute;
      bottom: 1px;
      left: 50%;
      transform: translateX(-50%);
      width: 70px;
    }

    .img-del {
      position: absolute;
      top: 1px;
      right: 1px;
      height: 10px;
      width: 10px;
    }
  }
}
</style>
