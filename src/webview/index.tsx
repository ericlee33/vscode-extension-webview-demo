import React, { useEffect, useState } from 'react';
import ReactDom from 'react-dom';

import { createGlobalStyle } from 'styled-components';
import { Button } from '@arco-design/web-react';
import '@arco-design/web-react/dist/css/arco.css';

const GlobalStyle = createGlobalStyle`
  html, body {
    height: 100vh;
    overflow: scroll;
    padding: 20px;
    background: yellow;
  }
`;

interface ISidebarProps {}

const vscode = (window as any).acquireVsCodeApi();

const Sidebar: React.FC<ISidebarProps> = () => {
  const [testText, setTestText] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.addEventListener('message', providerMessageHandler);
    return () => {
      window.removeEventListener('message', providerMessageHandler);
    };
  }, []);

  /**
   * 处理 provider 发送过来的请求
   * @param event
   * @returns
   */
  const providerMessageHandler = function (event: any) {
    const data = event.data;
    const { type, payload } = data;
    if (type === 'test') {
      setTestText(payload.message);
      setLoading(false);
    }
  };

  return (
    <>
      <GlobalStyle />

      {!testText ? (
        <Button
          onClick={() => {
            vscode.postMessage({ type: 'test' });
            setLoading(true);
          }}
          loading={loading}
        >
          {'invoke test script'}
        </Button>
      ) : (
        testText
      )}
    </>
  );
};

ReactDom.render(<Sidebar />, document.getElementById('root'));
