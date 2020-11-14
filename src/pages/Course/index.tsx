import React, { Fragment, useState, useEffect } from 'react';
import { Table, Input, Button, message } from 'antd';
import { deleteCourse, getList } from '@/services/courseApi';
import { Data, Response } from '@/utils/type';
import { history, Link } from 'umi';

const { Search } = Input;
function index() {
  const [datas, setDatas] = useState<Data[]>([] as Data[]);
  const [keywords, setKeywords] = useState('');

  const handleRemove = (id: string) => {
    deleteCourse({ id }).then((response: Response) => {
      if (response && response.success) {
        message.success(response.msg);
        getDatas({ keywords });
        return;
      }
      message.warning(response ? response.msg : '删除异常');
    });
  };

  let columns = [
    {
      title: '课程类别',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '课程名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '课程总价',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
    },
    {
      title: '课程数量',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: '课程地址',
      dataIndex: 'address',
      key: 'address',
      render: (text: string) => (
        <Fragment>
          <a href={text} target="blank">
            查看课程
          </a>
        </Fragment>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (record: { id: string }) => (
        <Fragment>
          <Link to={`/course/edit/${record.id}`}>编辑</Link> &nbsp;
          <a onClick={() => handleRemove(record.id)}>删除</a>
        </Fragment>
      ),
    },
  ];

  useEffect(() => {
    getDatas({ keywords });
  }, [keywords]);
  const getDatas = (params: object) => {
    getList(params).then((response: Response) => {
      // console.log(response.datas);
      setDatas(response.datas as Data[]);
    });
  };

  const handleSearch = (keywords: string) => {
    // console.log(keywords);
    setKeywords(keywords);
    // 搜索
    // getDatas({ keywords });
  };

  const handleAdd = () => {
    history.push('/course/add');
  };
  return (
    <div>
      <Button type="primary" onClick={handleAdd}>
        添加课程
      </Button>
      <Search
        placeholder="请输入搜索课程名称"
        allowClear
        onSearch={handleSearch}
        style={{ width: 200, margin: '0 10px' }}
      />
      <Table
        columns={columns}
        dataSource={datas}
        rowKey={(datas: { id: string }) => datas.id}
      />
      ;
    </div>
  );
}

export default index;
