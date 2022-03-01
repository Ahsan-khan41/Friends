import React, { useContext, useState, useEffect } from "react";
import { Descriptions } from "antd";
import CurrentUserContext from "../../ContextAPI/CurrentUserContext";

export const Setting = () => {

  const currentUserInfo = useContext(CurrentUserContext);

  return (
    <div style={{ paddingRight: 40, paddingLeft: 200 }}>
      <Descriptions title="User Info" layout="vertical">
        <Descriptions.Item label="UserName">
          <b>{currentUserInfo.name}</b>
        </Descriptions.Item>
        <Descriptions.Item label="Email">
          <b>{currentUserInfo.email}</b>
        </Descriptions.Item>
        <Descriptions.Item label="Gender">
          <b>Male</b>
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};
