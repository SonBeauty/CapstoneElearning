import React from "react";
import { Col, Layout, Row } from "antd";
import { Outlet } from "react-router-dom";
import { Content } from "antd/lib/layout/layout";
import Header from '../Header/Header'
import BackGround from "./BackGround";

const AuthLayout = () => {
  return (
    // <Row>
    //   <Col span={14}>
    //     <h1>Background Image</h1>
    //   </Col>
    //   <Col span={8}>
    //     <Outlet />
    //   </Col>
    // </Row>
    <Layout>
      <Content>
        <BackGround/>

      </Content>
    </Layout>
  );
};

export default AuthLayout;
