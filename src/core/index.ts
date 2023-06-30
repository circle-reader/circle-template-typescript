import React from 'react';
import generatePluginByReactComponent from './generatePluginByReactComponent';

export function register(id: string, plugin: any) {
  // @ts-ignore
  window.definePlugin(
    id,
    React.isValidElement(plugin)
      ? generatePluginByReactComponent(plugin)
      : plugin
  );
}
