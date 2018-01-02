// @flow

import React from 'react'
import styled, {css} from 'react-emotion'
import {Spin} from 'antd'

const spinXL = css`
  .ant-spin-dot {
    height: 48px;
    width: 48px;

    i {
      height: 22px;
      width: 22px;
    }
  }
`

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;

  .ant-spin-text {
    color: #7020fc;
    font-weight: 600;
    font-size: 16px;
  }

  .ant-spin-spinning {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-100%, -100%);
  }

  .ant-spin-dot i {
    background-color: #7020fc;
  }

  ${spinXL};
`

const LoadingIndication = () => (
  <Wrapper>
    <Spin tip="Loading..." size="large"/>
  </Wrapper>
)

export default LoadingIndication
