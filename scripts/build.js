const path = require('path');
const { globSync } = require('glob');
const { readFileSync, writeFileSync } = require('fs');

const wrapper = (data) => {
  return `import App from '../src/core/app.class';

export default function(app: App){
  return ${JSON.stringify(data, null, ' ').replace(
    /"__MSG_(.*?)__"/g,
    "app.i10n('$1')"
  )};
}
`;
};

const data = {};
globSync('src/widget/*/manifest.json').forEach((item) => {
  const file = readFileSync(path.resolve(__dirname, `../${item}`));
  const manifest = JSON.parse(file);
  if (manifest.data) {
    Object.keys(manifest.data).forEach((key) => {
      const option = manifest.data[key];
      if (['setting'].includes(key)) {
        Object.keys(option).forEach((optionKey) => {
          const item = manifest.data.setting[optionKey];
          !data.setting && (data.setting = {});
          if (Array.isArray(item)) {
            !data.setting[optionKey] && (data.setting[optionKey] = []);
            data.setting[optionKey] = [...data.setting[optionKey], ...item];
          } else {
            !data.setting[optionKey] && (data.setting[optionKey] = {});
            data.setting[optionKey] = {
              ...data.setting[optionKey],
              ...item,
            };
          }
        });
        return;
      }
      if (Array.isArray(option)) {
        !data[key] && (data[key] = []);
        const nextOption = option.map((item) => {
          if (!manifest.priority || typeof item.priority !== 'undefined') {
            return item;
          }
          return {
            ...item,
            priority: manifest.priority,
          };
        });
        data[key] = [...data[key], ...nextOption];
      } else {
        !data[key] && (data[key] = {});
        const nextOption = {};
        Object.keys(option).map((key) => {
          const dataItem = option[key];
          if (!manifest.priority || typeof dataItem.priority !== 'undefined') {
            nextOption[key] = dataItem;
            return;
          }
          nextOption[key] = {
            ...dataItem,
            priority:
              typeof dataItem.priority !== 'undefined'
                ? dataItem.priority
                : manifest.priority,
          };
        });
        data[key] = {
          ...data[key],
          ...nextOption,
        };
      }
    });
  }
});

writeFileSync(path.join(__dirname, '../.cache/data.ts'), wrapper(data));

// new
const presets = [];
globSync('src/widget/*/manifest.json').forEach((item) => {
  const name = item.split('/')[2];
  const file = readFileSync(path.resolve(__dirname, `../${item}`));
  const manifest = JSON.parse(file);
  const props = {
    id: name,
    title: manifest.title,
  };
  [
    'version',
    'core',
    'enabled',
    'description',
    'dependencies',
    'homepage_url',
    'priority',
    'run_at',
    'type',
    'beta',
    'author',
    'option',
    'data',
  ].forEach((prop) => {
    const map = {
      description: 'desc',
      dependencies: 'deps',
      homepage_url: 'link',
    };
    manifest[prop] && (props[map[prop] || prop] = manifest[prop]);
  });
  presets.push(props);
});

writeFileSync(path.join(__dirname, '../.cache/presets.ts'), wrapper(presets));
