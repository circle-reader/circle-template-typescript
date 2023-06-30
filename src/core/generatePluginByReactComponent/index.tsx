import React from 'react';
import { Root, createRoot } from 'react-dom/client';
import AppContext from './hook';
import generateShadow from './shadow';
import {
  StyleProvider,
  legacyLogicalPropertiesTransformer,
} from '@ant-design/cssinjs';
import 'antd/dist/reset.css';

export default function generatePluginByReactComponent(
  children: React.ReactElement
) {
  return (app: any, me: any) => {
    let factory: Root | null = null;
    const container = document.createElement('div');
    const classNames = ['container'];
    app.data('mobile') && classNames.push('mobile');
    container.className = classNames.join(' ');
    const { root, shadow } = generateShadow({
      // @ts-ignore
      style: window.inlineStyle,
    });
    shadow.appendChild(container);

    return {
      start() {
        if (factory) {
          return;
        }
        factory = createRoot(container);
        factory.render(
          <StyleProvider
            hashPriority="high"
            container={shadow}
            transformers={[legacyLogicalPropertiesTransformer]}
          >
            <AppContext.Provider value={{ me, app, root, shadow, container }}>
              {children}
            </AppContext.Provider>
          </StyleProvider>
        );
        container.style.display = 'block';
      },
      destroy() {
        if (!factory) {
          return;
        }
        container.style.display = 'none';
        factory.unmount();
        factory = null;
      },
    };
  };
}
