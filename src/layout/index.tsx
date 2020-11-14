import React from 'react';
import { Layout, Menu } from 'antd';
import styles from './index.less';
import { Link, useHistory } from 'umi';

const { Header, Content, Footer, Sider } = Layout;

//获取所有路由地址,根据地址来决定选中状态
const getMenuSelectKeys = (pathname: string): string[] => {
  if (pathname === '') return [];
  let paths: string[] = pathname.split('/');
  let selectKeys: string[] = [];
  // console.log(paths);
  paths.forEach((x, i) => {
    selectKeys.push(paths.slice(0, paths.length - i).join('/'));
  });
  // console.log(selectKeys);
  return selectKeys;
};
const index = (props: { children: React.ReactNode }) => {
  const { location } = useHistory();
  return (
    <Layout className={styles.layout}>
      <Sider breakpoint="lg" collapsedWidth="0">
        <div className="title">bbter</div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={getMenuSelectKeys(location.pathname)}
        >
          <Menu.Item key="/course">
            <Link to="/course">课程记录</Link>
          </Menu.Item>
          <Menu.Item key="/about">
            <Link to="/about">关于我们</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{ padding: 0 }}
        ></Header>
        <Content
          className="site-layout-background"
          style={{ margin: '24px 16px', padding: 24, minHeight: 'max-content' }}
        >
          {props.children}
        </Content>
        <Footer style={{ textAlign: 'center' }}>Umi3-demo by bbter</Footer>
      </Layout>
    </Layout>
  );
};

export default index;
