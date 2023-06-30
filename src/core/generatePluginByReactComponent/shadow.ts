export default function generateShadow({
  style,
  mode = 'closed',
}: {
  style?: string | Array<string>;
  mode?: 'closed' | 'open';
} = {}) {
  const root = document.createElement('div');
  const parent = document.documentElement;
  parent.insertBefore(root, document.body);
  const shadow = root.attachShadow({ mode });
  if (style) {
    (Array.isArray(style) ? style : [style]).forEach((item) => {
      if (!item) {
        return;
      }
      let styleElement;
      if (item.endsWith('.css')) {
        styleElement = document.createElement('link');
        styleElement.rel = 'stylesheet';
        styleElement.href = item;
      } else {
        styleElement = document.createElement('style');
        styleElement.textContent = item;
      }
      styleElement && shadow.appendChild(styleElement);
    });
  }
  return { root, shadow };
}
