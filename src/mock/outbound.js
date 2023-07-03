// 引入mockjs
import Mock from "mockjs";
 
// 获取 mock.Random 对象
const Random = Mock.Random;
 
// 使用mockjs模拟数据
let data = [
    {
        date: "暂无图片",
        name: "Jerry",
        outboundno: "scau4042023052652",
        address: "No. 125, Grove St, Los Angeles",
        outboundNumber:"10",
        lendCustom:"李白",
        supplier:"董卓",
        outboundPeople:"董卓",
        outboundType:"采购入库",
        outboundTime:"2022-4-5 16:00"
      },
      {
        date: "暂无图片",
        name: "Tom",
        outboundno: "scau4042023052612",
        address: "No. 189, Grove St, Los Angeles",
        outboundNumber:"2",
        lendCustom:"董卓",
        supplier:"张小凡",
        outboundPeople:"张小凡",
        outboundType:"采购入库",
        outboundTime:"2022-1-5 16:00"
      },
      {
        date: "暂无图片",
        name: "Tomas",
        outboundno: "scau4042023045612",
        address: "No. 259, Grove St, Los Angeles",
        outboundNumber:"5",
        lendCustom:"张小凡",
        supplier:"张小凡",
        outboundPeople:"李白",
        outboundType:"采购入库",
        outboundTime:"2052-1-5 16:40"
      },
  ];
 
// for (let i = 0; i < 20; i++) {
//   let newObject = {
//     id: Random.guid(), // 获取全局唯一标识符
//     account: /^[a-zA-Z0-9]{4,6}$/,
//     password: /^[a-zA-Z]\w{5,17}$/,
//     address: /[1-9]\d{7,10}@qq\.com/,
//   };
//   tableList.push(newObject);
// }
 
/** get请求
 * 获取数据列表
 */
Mock.mock("/mock/getOutboundOrder", "get", () => {
  return {
    code: "0",
    data: data,
  };
});
 
 
/** post请求添加表格数据 */
Mock.mock("/mock/outbound", "post", (params) => {
  let newData = JSON.parse(params.body);
  newData.id = Random.guid();
  tableList.push(newData);
  return {
    code: "0",
    message: "success",
    data: data,
  };
});