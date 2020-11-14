type CourseList = {
  id: string;
  type: string;
  name: string;
  totalPrice: string;
  amount: string;
  address: string;
};
let courseList: CourseList[] = [
  {
    id: '1',
    type: 'React',
    name: 'dvajs',
    totalPrice: '￥999',
    amount: '999',
    address: 'https://juejin.im/user/2172290708551917',
  },
  {
    id: '2',
    type: 'Vue',
    name: 'Vue3',
    totalPrice: '￥888',
    amount: '999',
    address: 'https://juejin.im/user/2172290708551917',
  },
  {
    id: '3',
    type: 'React',
    name: 'umijs',
    totalPrice: '￥777',
    amount: '999',
    address: 'https://juejin.im/user/2172290708551917',
  },
  {
    id: '4',
    type: 'TypeScript',
    name: 'ts',
    totalPrice: '￥666',
    amount: '999',
    address: 'https://juejin.im/user/2172290708551917',
  },
  {
    id: '5',
    type: 'JavaScript',
    name: 'js',
    totalPrice: '￥555',
    amount: '999',
    address: 'https://juejin.im/user/2172290708551917',
  },
];
// 获取路径参数
function getUrlParam(url: string, key: string) {
  // 获取参数
  let reg = new RegExp('(^|&)' + key + '=([^&]*)(&|$)'); //匹配目标参数
  let result = url.split('?')[1].match(reg); //返回参数值
  let keywords = result ? decodeURIComponent(result[2]) : '';
  return keywords;
}
const getCourseList = (request: { url: string }, response: any) => {
  let keywords = getUrlParam(request.url, 'keywords');
  let filterList =
    !keywords || keywords === ''
      ? courseList
      : courseList.filter((item: { type: string; name: string }) => {
          return (
            item.type.indexOf(keywords) !== -1 ||
            item.name.indexOf(keywords) !== -1
          );
        });
  response.send({
    success: true,
    datas: filterList,
    keywords: keywords,
  });
};

//添加课程
const addCourse = (request: { body: CourseList }, response: any) => {
  let { name, type, amount, address, totalPrice } = request.body;
  courseList.unshift({
    id: Date.now().toString(),
    type,
    name,
    amount,
    address,
    totalPrice,
  });
  response.send({ msg: '添加成功', success: true });
};

// 获取编辑课程信息
const getEditCourse = (request: { url: string }, response: any) => {
  let id = getUrlParam(request.url, 'id');
  let index = courseList.findIndex((item: CourseList) => item.id === id);
  if (index === -1) {
    response.send({ msg: '该课程不存在', success: false });
  }
  response.send({ success: true, datas: courseList[index] });
};

// submit edit

const editCourse = (request: { body: CourseList }, response: any) => {
  let { id } = request.body;
  let index = courseList.findIndex((item: CourseList) => item.id === id);
  if (index === -1) {
    response.send({ msg: '该课程不存在', success: false });
  }
  courseList[index] = { ...request.body };
  response.send({ msg: '编辑成功', success: true });
};

// 删除课程信息
const deleteCourse = (request: { url: string }, response: any) => {
  let id = getUrlParam(request.url, 'id');
  let index = courseList.findIndex((item: CourseList) => item.id === id);
  if (index === -1) {
    response.send({ msg: '该课程不存在', success: false });
  }
  courseList.splice(index, 1);
  response.send({ msg: '删除成功', success: true });
};

export default {
  '/api/courseList': getCourseList,
  '/api/dictionary/type': {
    datas: [
      { label: 'React', value: 'React' },
      { label: 'Vue', value: 'Vue' },
      { label: 'Node', value: 'Node' },
      { label: 'uniapp', value: 'uniapp' },
    ],
  },
  'POST /api/course/add': addCourse,
  '/api/course/editCourse': getEditCourse,
  'POST /api/course/edit': editCourse,
  'DELETE /api/course/delete': deleteCourse,
};
