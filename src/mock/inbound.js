// // 引入mockjs
// import Mock from "mockjs";
 
// // 获取 mock.Random 对象
// const Random = Mock.Random;
 
// // 使用mockjs模拟数据
// let data = [
//     {
//         date: "暂无图片",
//         name: "Jerry",
//         inboundno: "scau4042023052652",
//         address: "No. 125, Grove St, Los Angeles",
//         inboundNumber:"10",
//         inboundPeople:"张小凡",
//         inboundType:"采购入库",
//         inboundTime:"2022-4-5 16:00"
//       },
//       {
//         date: "暂无图片",
//         name: "Tom",
//         inboundno: "scau4042023052612",
//         address: "No. 189, Grove St, Los Angeles",
//         inboundNumber:"2",
//         inboundPeople:"张三",
//         inboundType:"采购入库",
//         inboundTime:"2022-1-5 16:00"
//       },
//       {
//         date: "暂无图片",
//         name: "Tomas",
//         inboundno: "scau4042023045612",
//         address: "No. 259, Grove St, Los Angeles",
//         inboundNumber:"5",
//         inboundPeople:"李白",
//         inboundType:"采购入库",
//         inboundTime:"2052-1-5 16:40"
//       },
//   ];

//   let form={  //入库表单数据
//     procurement: '',
//     inboundNo: '',
//     jadeName: '',
//     jadeCode: '',
//     jadeNumber: '',
//     tagPriceCode: '',
//     tagPrice: '',
//     costPrice: '',
//     costPriceCode: '',
//     storeNo: '',
//     supplier: '',
//     note: '',
//   }
 
// // for (let i = 0; i < 20; i++) {
// //   let newObject = {
// //     id: Random.guid(), // 获取全局唯一标识符
// //     account: /^[a-zA-Z0-9]{4,6}$/,
// //     password: /^[a-zA-Z]\w{5,17}$/,
// //     address: /[1-9]\d{7,10}@qq\.com/,
// //   };
// //   tableList.push(newObject);
// // }
 
// /** get请求
//  * 获取数据列表
//  */
// Mock.mock("/mock/getInboundOrder", "get", () => {
//   return {
//     code: "0",
//     data: data,
//   };
// });
 
 
// /** post请求添加表格数据 */
// Mock.mock("/mock/inbound", "post", (params) => {
//   let newData = JSON.parse(params.body);
//   newData.id = Random.guid();
//   tableList.push(newData);
//   return {
//     code: "0",
//     message: "success",
//     data: form,
//   };
// });

