<template>
  <div class="front">
    <div class="front-left">
      <el-radio-group class="front-select" v-model="outboundForm.outboundType" @change="changeOutboundType">
        <el-radio :label="1" size="large">客户借货</el-radio>
        <el-radio :label="2" size="large">市场还货</el-radio>
        <el-radio :label="3" size="large">销售出库</el-radio>
      </el-radio-group>
      <el-form class="front-form" :model="outboundForm" ref='outboundRef' :rules="outboundOrderRules" label-width="120px">
        <el-form-item class="front-input" v-if="outboundForm.outboundShow1" label="出借客户" :required="true">
          <el-select v-model="outboundForm.clientId" placeholder="请选择" prop="clientId">
            <el-option v-for="item in clientList" :key="item.id" :label="item.userName" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item class="front-input" v-if="outboundForm.outboundShow1" label="出借天数" :required="true">
          <el-input v-model="outboundForm.validDate" />
        </el-form-item>
        <el-form-item class="front-input" v-if="outboundForm.outboundShow2" label="还货商户" :required="true">
          <el-select v-model="outboundForm.clientId" placeholder="请选择" prop="clientId">
            <el-option v-for="item in clientList" :key="item.id" :label="item.userName" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item class="front-input" v-if="outboundForm.outboundShow3" label="售出客户" :required="true">
          <el-select v-model="outboundForm.clientId" placeholder="请选择" prop="clientId">
            <el-option v-for="item in clientList" :key="item.id" :label="item.userName" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item class="front-input" v-if="outboundForm.outboundShow3" label="结算周期" :required="true">
          <el-input v-model="input1">
            <template #prepend>售后</template>
          </el-input>
        </el-form-item>
        <el-form-item class="front-input" v-if="outboundForm.outboundShow3" label="销售价计算方式">
          <el-select v-model="outboundForm.lendCustom" placeholder="请选择">
            <el-option label="启用" value="shanghai" />
            <el-option label="停用" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item class="front-input" v-if="outboundForm.outboundShow3" label="百分比">
          <el-input v-model="input1">
          </el-input>
        </el-form-item>
      </el-form>
    </div>

    <div class="front-right">
      <div class="right-photo">
        <video ref="videoElement" class="rigth-video" autoplay v-if="isvideo"></video>
        <!-- <el-img description="No image" :src="imageUrlList" v-if="!isvideo" /> -->
        <canvas ref="canvasElement" class="right-img"></canvas>
      </div>
      <div class="right-action">
        <el-upload action="http://47.106.116.146:8080/common/uploadImage" class="upload"
          :headers="{ Authorization: token }" :show-file-list="false" accept=".png,.jpg,.jpeg,.webp"
          style="display: inline-block;" :name="file" :on-preview="handlePictureCardPreview" :on-remove="handleRemove"
          :on-error="console.log(error)" :on-success="handleUpload">
          <el-button @click="uploadImg" style="color:#1890ff;">上传</el-button>
        </el-upload>
        <el-button @click="takePhoto" style="color:#1890ff;margin-left: 10px;">拍照</el-button>
        <el-button @click="triggerCamera" style="color:#1890ff;">{{ cameraActive ? '关闭摄像头' : '打开摄像头' }}</el-button>
      </div>
      <!-- <el-col class="imageBox">
        <div v-for="(photo, index) in imageUrlList" :key="index" class="imgList">
          <el-image :src="'http://47.106.116.146:8080/profile' + photo.url" alt="Photo" fit="contain"
            style="max-height: 70px;max-width: 50px;" :preview-teleported="true" :lazy="true"
            :preview-src-list="imgPreview" @click="previewSrcList(photo.url)"></el-image>
          <span>{{ }}</span>
        </div>
      </el-col> -->
    </div>
  </div>


  <div class="tail">
    <div class="tail-input">
      <el-form>
        <el-form-item label="扫描/输入条码" width="200" style="width: 400px;margin-left: 40px;">
          <el-input v-model="barcode">
          </el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="tail-action">
      <el-button type="primary" @click="onSubmit">操作出库</el-button>
      <el-button type="primary">导出明细</el-button>
      <el-button type="primary">打印明细</el-button>
    </div>
    <el-table :data="tableData()" border style="width: 100%" max-height="320">
      <template v-slot:empty>
        <div class="no-data">暂无数据</div>
      </template>
      <el-table-column label="货品图片" width="90">
        <template #default="scope">
          <el-image :src="'http://47.106.116.146:8080/profile' + scope.row.imageUrl" fit="contain"
            style="max-height: 50px;max-width: 30px;" :preview-teleported="true" :lazy="true"
            :preview-src-list="imgPreview" @click="previewSrcList(scope.row.imageUrl)"></el-image>
        </template>
      </el-table-column>
      <el-table-column v-for="item in outboundJadeDataColumn.data" :prop="item.prop" :min-width="item.minWidth"
        :width="item.width" :max-width="item.maxWidth" :label="item.label" />
      <el-table-column width="100px">
        <template #header>
          <el-popover placement="bottom" trigger="click">
            <template #reference>
              <el-button size="small">显示设置</el-button>
            </template>
            <el-checkbox-group v-model="selectedFilters.data">
              <el-checkbox v-for="item in tableFilter.data" :label="item.label" @change="filterColumns"
                :disabled="item.isdisabled" />
            </el-checkbox-group>
          </el-popover>
        </template>
        <template #default>
          <el-button link type="primary" size="small">查看明细</el-button>
          <el-button link type="primary" size="small">编辑备注</el-button>
          <el-button link type="primary" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination v-model:current-page="data.page" v-model:page-size="data.limit"
        layout="prev, pager, next ,total,sizes" :total="data.total" @current-change="handleCurrentChange"
        @size-change="handleSizeChange" />
    </div>
  </div>

  <div class="optionView">
    <el-dialog v-model="dialogVisibleDetails">
      <el-descriptions border size="large" direction="vertical" title="排班基本信息">
        <el-descriptions-item label="直播店铺">{{ rowDetails.streamPlatform }}</el-descriptions-item>
        <el-descriptions-item label="代购费"><el-tag size="small">50</el-tag></el-descriptions-item>
        <el-descriptions-item label="直播班次">{{ rowDetails.streamShift }}</el-descriptions-item>
        <el-descriptions-item label="播货开始时间">{{ rowDetails.startTime }}</el-descriptions-item>
        <el-descriptions-item label="播货结束时间">{{ rowDetails.endTime }}</el-descriptions-item>
        <el-descriptions-item label="扣点比例">{{ rowDetails.deductionPoints }}</el-descriptions-item>
        <el-descriptions-item label="添加时间">{{ rowDetails.createTime }}</el-descriptions-item>
        <el-descriptions-item label="添加人">{{ rowDetails.createBy }}</el-descriptions-item>
        <el-descriptions-item label="修改时间">{{ rowDetails.updateTime }}</el-descriptions-item>
        <el-descriptions-item label="修改人">{{ rowDetails.updateBy }}</el-descriptions-item>
      </el-descriptions>

      <el-descriptions border size="large" direction="vertical" title="直播人员信息" style="margin-top: 50px;">
        <el-descriptions-item label="售前客服"><el-tag size="small">张三</el-tag></el-descriptions-item>
        <el-descriptions-item label="直播助理"><el-tag size="small">张三</el-tag></el-descriptions-item>
        <el-descriptions-item label="场控"><el-tag size="small">张三</el-tag></el-descriptions-item>
        <el-descriptions-item label="主播"><el-tag size="small">张三</el-tag></el-descriptions-item>
        <el-descriptions-item label="其他人员"><el-tag size="small">张三</el-tag></el-descriptions-item>

      </el-descriptions>
    </el-dialog>
    <el-dialog v-model="dialogVisibleResult" title="检测结果" :close-on-press-escape="false" :close-on-click-modal="false"
      style="width: 350px;">
      <el-table :data="imageUrlList" border @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="40" />
        <el-table-column label="出库对象" prop="url" width="120">
          <template #default="scope">
            <el-image :src="'http://47.106.116.146:8080/profile' + scope.row.url" alt="Photo" fit="contain"
              style="max-height: 120px;max-width: 70px;" :preview-teleported="true" :lazy="true"
              :preview-src-list="imgPreview" @click="previewSrcList(scope.row.url)"></el-image>
          </template>
        </el-table-column>
        <el-table-column label="库存对比" prop="matchUrl">
          <template #default="scope">
            <!-- <el-tooltip content="查无此货">
            </el-tooltip> -->
            <el-image :src="'http://47.106.116.146:8080/profile' + scope.row.matchUrl" alt="Photo" fit="contain"
              style="max-height: 120px;max-width: 70px;" :preview-teleported="true" :lazy="true"
              :preview-src-list="imgPreview" @click="previewSrcList(scope.row.matchUrl)">
              <template v-slot:error>
                <i class="image-miss">{{ match_controll }}</i>
              </template>
            </el-image>
          </template>
        </el-table-column>
      </el-table>
      <el-button type="primary" style="margin-top: 15px;" @click="ensureJade">确认</el-button>
      <div>请勾选需要出库的对象然后选择确认</div>
      <!-- <el-descriptions border size="large"  column="2">
        <el-descriptions-item  v-for="(photo, index) in imageUrlList" :key="index" class="imgList">
          <el-image :src="'http://47.106.116.146:8080/profile' + photo.url" alt="Photo" fit="contain"
            style="max-height: 120px;max-width: 70px;" :preview-teleported="true" :lazy="true"
            :preview-src-list="imgPreview" @click="previewSrcList(photo.url)">原图</el-image>
            <el-image :src="'http://47.106.116.146:8080/profile' + photo.matchUrl" alt="Photo" fit="contain"
            style="max-height: 120px;max-width: 70px;" :preview-teleported="true" :lazy="true"
            :preview-src-list="imgPreview" @click="previewSrcList(photo.matchUrl)">检测结果</el-image>
        </el-descriptions-item>
      </el-descriptions> -->
    </el-dialog>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs, ref, onBeforeMount, onMounted } from "vue";
import { ElMessage } from "element-plus";
import { getToken } from '@/utils/auth'
import { Plus } from '@element-plus/icons-vue';
import { getJadeCrop, jadeMatch, getJadeFeature, getJadeInfo, getUserList, outbound, getOutboundOrderCode, altJadeStatus } from '@/api/outbound'
import axios from 'axios'

export default defineComponent({
  name: "HomeView",
  components: {
    Plus,
  },
  setup() {
    const outboundRef = ref(null)
    const videoElement = ref(null);//拍照相关参数
    const canvasElement = ref(null);
    const cameraActive = ref(false)
    const videoStream = ref(null)
    const dialogVisibleDetails = ref(false)
    const match_controll = ref('识别中')

    const isvideo = ref(true)
    const dialogVisibleImg = ref(false)
    const token = ref('')
    const clientList = ref([])//客户列表

    const imageUrlList = ref([])//图片相关参数
    const dialogImageUrl = ref('')
    const dialogVisibleResult = ref(false)
    const imgPreview = ref([])
    const tempData = ref([])
    //表格的全数据（这里是自定义的列表，要看分页效果自行往此数组内加数据）
    const outboundJadeInfoData = ref([])

    const outboundOrderRules = reactive({//表单验证
      clientId: [{ required: true, message: '出库客户不能为空', trigger: 'change' },],
    });
    const outboundForm = reactive({
      orderCode: '',
      jadeCode: '',
      clientId: '',
      validDate: '',
      outboundType: 3,
      outboundShow1: false,
      outboundShow2: false,
      outboundShow3: true,
      deptId: '1',
    });
    const outboundJadeDataColumn = reactive({
      data: [
      ]
    })
    const selectedFilters = reactive({
      data: []
    })
    const tableFilter = reactive({//表头自定义数组
      data: [
        { label: '货品编码', prop: 'jadeCode', width: '200', isdisabled: true, isSelected: true },
        { label: '入库单单号', prop: 'orderCode', width: '200', isdisabled: true, isSelected: true },
        { label: '数量', prop: 'jadeWeight', width: '60', isSelected: true },
        { label: '成本价', prop: 'costPrice', width: '60', isSelected: true },
        { label: '标签价', prop: 'sellingPrice', Width: '60', isSelected: false },
        { label: '供应商', prop: 'supplierName', width: '70', isSelected: true },
        { label: '货品状态', prop: 'inventoryStatus', width: '70', isSelected: true },
        { label: '客户名字', prop: 'clientName', width: '70', isSelected: false },
        { label: '入库仓库', prop: 'warehouseId', width: '70', isSelected: false },
        { label: '入库类型', prop: 'inboundTypeName', width: '90', isdisabled: true, isSelected: true },
        { label: '入库人员', prop: 'inboundPeople', width: '90', isdisabled: true, isSelected: true },
        { label: '入库时间', prop: 'createTime', minWidth: '100', isdisabled: true, isSelected: true },
        { label: '备注', prop: 'remark', minWidth: '80', maxWidth: '80', isSelected: true },
        { label: '测试1', prop: 'test1', minWidth: '80', maxWidth: '80', isSelected: false },
        { label: '测试2', prop: 'test2', minWidth: '80', maxWidth: '80', isSelected: false },
      ]
    })

    onBeforeMount(() => {//获取数据
      token.value = getToken()
      getUserList().then((res) => {
        clientList.value = res.rows
      })
      getOutboundOrderCode().then((res) => {
        outboundForm.orderCode = res
      })
    })

    onMounted(() => {
      tableFilter.data.forEach(function (item, index) {
        if (item.isSelected) {
          selectedFilters.data.push(item.label)
          outboundJadeDataColumn.data.push(item)
        }
      })
    })

    const filterColumns = () => {//监听筛选器，实现列的动态增删
      let temp = []
      tableFilter.data.forEach(item_t => {
        selectedFilters.data.forEach(item_s => {
          if (item_t.label == item_s) {
            temp.push(item_t)
          }

        })
      })
      outboundJadeDataColumn.data = temp
    }
    //表格用到的参数
    const state = reactive({
      data: {
        page: 1,
        limit: 10,
        total: outboundJadeInfoData.value.length,
      }
    });
    //前端限制分页（tableData为当前展示页表格）
    const tableData = () => {
      return outboundJadeInfoData.value
    };
    //改变页码
    const handleCurrentChange = (e) => {
      state.page = e;
    };
    //改变页数限制
    const handleSizeChange = (e) => {
      state.limit = e;
    };

    const takePhoto = () => { //调用摄像头后拍照
      const video = videoElement.value
      const canvas = canvasElement.value
      if (cameraActive.value) {
        if (video) try {
          // 将视频画面绘制到画布上
          const context = canvas.getContext('2d');
          // canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height)
          const devicePixelRatio = window.devicePixelRatio || 1;

          // 设置 Canvas 元素的实际大小
          canvas.width = 1200 * devicePixelRatio;   // 宽度为 400 像素
          canvas.height = 900 * devicePixelRatio;  // 高度为 300 像素

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
                  imageUrlList.value.push({ imageId: key, imageUrl: res_crop.result[key] })
                }
                let imageIds = imageUrlList.value.map(item => item.imageId)

                getJadeFeature({ data: imageUrlList.value })
                jadeMatch(imageIds).then((res_match) => {
                  console.log(res_match)
                })

                // imageUrlList.value.forEach((item) => {//添加到图片列表
                //   // getJadeFeature({ imageId: item.imageId, imagePath: item.imageUrl }).then(() => {//图片提取特征
                //   //   jadeMatch({ imageId: item.id }).then((res_match) => {//匹配翡翠然后加入匹配到的结果
                //   //     if (res_match.msg == '当前库存数量为0') {
                //   //       match_controll.value = '查无此货，请核查'
                //   //     } else {
                //   //       item.matchId = res_match['best_match'][0]
                //   //       getJadeInfo(res_match['best_match'][0]).then((jadeInfo) => {
                //   //         if (jadeInfo.rows[0]) {
                //   //           item.matchUrl = jadeInfo.rows[0].imageUrl
                //   //           item.details = jadeInfo.rows[0]
                //   //         }
                //   //         else {
                //   //           item.matchUrl = false
                //   //         }
                //   //       })
                //   //     }

                //   //   })
                //   // })

                // })
                dialogVisibleResult.value = true  //打开确认列表
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
    const handleSelectionChange = (selection) => {
      selection.forEach((item) => {
        console.log(item.details)
        tempData.value.push(item.details)
      })
    }
    const ensureJade = () => {
      try {
        outboundJadeInfoData.value = tempData.value
        tempData.value = []
        imageUrlList.value = []
        dialogVisibleResult.value = false
      } catch {
        ElMessage.error('请检测完成后再勾选')
      }

    }
    const handleUpload = (res) => {
      getJadeCrop({ image_path: res.url.slice(34) }).then((res_crop) => {//切割得到分割后的图列
        for (var key in res_crop.result) {
          imageUrlList.value.push({ imageId: key, imageUrl: res_crop.result[key] })
        }
        let imageIds = imageUrlList.value.map(item => item.imageId)
        getJadeFeature({ data: imageUrlList.value })
        jadeMatch({ imageIds: imageIds }).then((res_match) => {
          imageUrlList.value = imageUrlList.value.map(item => {
            const imageId = item.imageId;
            const bestMatch = res_match.match_result[imageId];
            return { ...item, best_match: bestMatch };
          })
          imageUrlList.value.forEach((item) => {
            getJadeInfo(item.best_match).then((jadeInfo) => {
              if (jadeInfo.rows[0]) {
                item.matchUrl = jadeInfo.rows[0].imageUrl
                item.details = jadeInfo.rows[0]
              }
              else {
                item.matchUrl = false
              }
            })
          })
          console.log(imageUrlList.value)
        })
        // imageUrlList.value.forEach((item) => {
        //   // getJadeFeature({ imageId: item.id, imagePath: item.url }).then(() => {//图片提取特征
        //   //   jadeMatch({ imageId: item.id }).then((res_match) => {//匹配翡翠然后加入匹配到的结果
        //   //     if (res_match.msg == '当前库存数量为0') {
        //   //       match_controll.value = '查无此货，请核查'
        //   //     } else {
        //   //       item.matchId = res_match['best_match'][0]
        //   //       getJadeInfo(res_match['best_match'][0]).then((jadeInfo) => {
        //   //         if (jadeInfo.rows[0]) {
        //   //           item.matchUrl = jadeInfo.rows[0].imageUrl
        //   //           item.details = jadeInfo.rows[0]
        //   //         }
        //   //         else {
        //   //           item.matchUrl = false
        //   //         }
        //   //       })
        //   //     }

        //   //   })
        //   // })

        // })
        dialogVisibleResult.value = true  //打开确认列表
      })


    }
    const previewSrcList = (imgUrl) => {//预览图片
      imgPreview.value = []
      imgPreview.value.push('http://47.106.116.146:8080/profile' + imgUrl)
    }

    const changeOutboundType = (value) => {
      console.log(value)
      outboundForm.outboundShow1 = outboundForm.outboundShow2 = outboundForm.outboundShow3 = false
      value == 1 ? outboundForm.outboundShow1 = true : value == 2 ? outboundForm.outboundShow2 = true : outboundForm.outboundShow3 = true
    }
    const getStatus = () => {//得到货品应要改变的状态
      if (outboundForm.outboundShow1) {
        return 1
      } else if (outboundForm.outboundShow2) {
        return 2
      } else {
        return 3
      }

    }
    const onSubmit = () => {//提交入库单
      if (outboundJadeInfoData.value.length == 0) {
        ElMessage.error('请先选择出库货品')
        return
      }
      outboundRef.value.validate().then(() => {
        outboundJadeInfoData.value.forEach((item) => {
          altJadeStatus({ id: item.id, status: getStatus() })
        })
        outbound(outboundForm).then((res) => {
          ElMessage.success('出库成功')
          outboundJadeInfoData.value = []
        })
        // 验证通过
      }).catch((err) => {
        //验证失败
        ElMessage.error('请正确填写出库信息');
      })

    }
    return {
      outboundJadeInfoData, token, imgPreview, imageUrlList, tempData, clientList,
      outboundForm, tableFilter, outboundJadeDataColumn, selectedFilters,
      state, outboundOrderRules, outboundRef, match_controll,
      videoElement, canvasElement, isvideo, cameraActive, videoStream,
      dialogVisibleImg, dialogImageUrl, dialogVisibleDetails, dialogVisibleResult,
      tableData,
      handleCurrentChange, changeOutboundType,
      handleSizeChange, filterColumns, handleSelectionChange, ensureJade,
      triggerCamera, handleUpload, previewSrcList, takePhoto, onSubmit, getStatus,
      ...toRefs(state),
    };
  },
});
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.front {
  display: flex;
  height: 30%;
}

.front-left {
  height: 100%;
  background-color: #fff;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  gap: 30px;
  width: 58%;

  .front-select {
    width: 80%;
    margin-left: 50px;
  }

  .front-form {
    .front-input {
      width: 400px;
    }

    .el-form-item__label {
      font-size: x-small;
    }
  }


}

.front-left-second {
  position: absolute;
  top: 400px;
  left: 240px;
}

.front-right {
  height: 100%;
  margin-left: 15px;
  background-color: #fff;
  padding: 10px;
  width: 40%;

  .right-photo {
    width: 100%;
    height: 80%;
    border: solid 1px;
  }

  .rigth-video {
    flex: auto;
    width: 100%;
    height: 100%;
  }

  .right-img {
    flex: auto;
    width: 100%;
    height: 100%;
    position: absolute;
    top: -9999px;
    opacity: 0;
  }

  .right-action {
    width: 100%;
    height: 40px;
    margin: 10px;
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
      /* 可根据需要调整每个图片元素的宽度 */
      margin-right: 10px;
      /* 图片之间的间距 */
      margin-bottom: 10px;
      /* 每行图片的底部间距 */
    }
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

.el-collapse {
  border-top: 0px;
  border-bottom: 0px;
}

.el-collapse-item__header {
  border-bottom: 0px;
}

.el-collapse-item__content {
  border-bottom: 0px;
}

.el-table {
  .el-button {
    margin-left: 0px; //调整按钮不对齐
  }
}
</style>