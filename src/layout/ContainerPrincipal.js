import React from 'react';
import { Layout } from 'antd';

const { Content } = Layout;



const ContainerPrincipal = ({ children }) => {

  return (
    <div className="flex-max-width">
      <Content>{children}</Content>
    </div>
  );
}

export default ContainerPrincipal;
