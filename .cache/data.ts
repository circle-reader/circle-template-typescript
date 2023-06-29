import App from '../src/core/app.class';

export default function (app: App) {
  return {
    keys: {
      setting: {
        value: 's t',
        checked: true,
        priority: 50,
      },
      setting__account: {
        value: 's a',
        priority: 600,
      },
      setting__style: {
        value: 's l',
        priority: 601,
      },
      setting__skin: {
        value: 't m',
        priority: 602,
      },
      setting__toolbar: {
        value: 't b',
        priority: 605,
      },
      setting__keys: {
        value: '?',
        checked: true,
        priority: 606,
      },
      setting__menu: {
        value: 'c m',
        priority: 607,
      },
      setting__lists: {
        value: 'm w',
        priority: 608,
      },
      setting__basic: {
        value: 'b c',
        priority: 609,
      },
      setting__stylesheet: {
        value: 'c s',
        priority: 610,
      },
      setting__about: {
        value: 'a b',
        priority: 612,
      },
      exit: {
        value: 'esc',
        checked: true,
        priority: 10,
      },
      exitclose: {
        value: 'x x',
        priority: 20,
      },
      imagehide: {
        value: 'h p',
        priority: 30,
      },
      enter_or_exit: {
        value: 'a a',
        checked: true,
      },
    },
    menu: {
      setting: {
        title: app.i10n('open_setting'),
        checked: true,
        priority: 50,
      },
      setting__account: {
        title: app.i10n('open_account'),
        priority: 600,
      },
      setting__style: {
        title: app.i10n('open_style'),
        priority: 601,
      },
      setting__skin: {
        title: app.i10n('open_skin'),
        priority: 602,
      },
      setting__toolbar: {
        title: app.i10n('open_toolbar'),
        priority: 605,
      },
      setting__keys: {
        title: app.i10n('open_keys'),
        priority: 606,
      },
      setting__menu: {
        title: app.i10n('open_menu'),
        priority: 607,
      },
      setting__lists: {
        title: app.i10n('open_lists'),
        priority: 608,
      },
      setting__basic: {
        title: app.i10n('open_basic'),
        priority: 609,
      },
      setting__stylesheet: {
        title: app.i10n('open_stylesheet'),
        priority: 610,
      },
      setting__about: {
        title: app.i10n('open_about'),
        priority: 612,
      },
      exit: {
        title: app.i10n('exit'),
        priority: 10,
      },
      exitclose: {
        title: app.i10n('exitclose'),
        priority: 20,
      },
      imagehide: {
        title: app.i10n('imagehide'),
        priority: 30,
      },
      enter_or_exit: {
        title: app.i10n('enter_or_exit'),
        checked: true,
      },
    },
    toolbar: {
      setting: {
        group: 0,
        checked: true,
        icon: 'SettingOutlined',
        title: app.i10n('open_setting'),
        priority: 50,
      },
      setting__account: {
        group: 4,
        priority: 600,
        icon: 'UserOutlined',
        title: app.i10n('open_account'),
      },
      setting__style: {
        group: 4,
        priority: 601,
        icon: 'FormatPainterOutlined',
        title: app.i10n('open_style'),
      },
      setting__skin: {
        group: 4,
        priority: 602,
        icon: 'SkinOutlined',
        title: app.i10n('open_skin'),
      },
      setting__toolbar: {
        group: 4,
        checked: true,
        priority: 605,
        icon: 'ToolOutlined',
        title: app.i10n('open_toolbar'),
      },
      setting__keys: {
        group: 4,
        priority: 606,
        icon: 'ThunderboltOutlined',
        title: app.i10n('open_keys'),
      },
      setting__menu: {
        group: 4,
        priority: 607,
        icon: 'MenuOutlined',
        title: app.i10n('open_menu'),
      },
      setting__lists: {
        group: 4,
        priority: 608,
        icon: 'ProfileOutlined',
        title: app.i10n('open_lists'),
      },
      setting__apps: {
        group: 4,
        priority: 609,
        icon: 'AppstoreOutlined',
        title: app.i10n('open_apps'),
      },
      setting__stylesheet: {
        group: 4,
        priority: 610,
        icon: 'CodeOutlined',
        title: app.i10n('open_stylesheet'),
      },
      setting__about: {
        group: 4,
        priority: 612,
        icon: 'ExclamationCircleOutlined',
        title: app.i10n('open_about'),
      },
      exit: {
        group: 0,
        priority: 10,
        checked: true,
        icon: 'CloseOutlined',
        title: app.i10n('exit'),
      },
      exitclose: {
        group: 0,
        priority: 20,
        icon: 'PoweroffOutlined',
        title: app.i10n('exitclose'),
      },
      imagehide: {
        group: 0,
        priority: 30,
        icon: 'ImageHideOutline',
        title: app.i10n('imagehide'),
      },
    },
    setting: {
      style_night: {
        value: true,
      },
      style_light: {
        align: 'reset',
        blockspace: '20px',
        imagealign: 'reset',
        indent: '0em',
        lineheight: 1.8,
        size: '20px',
        space: '0',
        title1: '2em',
        title1weight: 500,
        title2: '1.6em',
        title2weight: 500,
        title3: '1.2em',
        title3weight: 500,
        title4: '1em',
        title4weight: 500,
        title5: '1em',
        title5weight: 500,
        title6: '1em',
        title6weight: 500,
        titlealign: 'reset',
        weight: 400,
        width: '800px',
      },
      style_dark: {
        align: 'reset',
        blockspace: '24px',
        imagealign: 'reset',
        indent: '0em',
        lineheight: '2',
        size: '22px',
        space: 'px',
        title1: '2em',
        title1weight: 500,
        title2: '1.6em',
        title2weight: 500,
        title3: '1.2em',
        title3weight: 500,
        title4: '1em',
        title4weight: 500,
        title5: '1em',
        title5weight: 500,
        title6: '1em',
        title6weight: 500,
        titlealign: 'reset',
        weight: 400,
        width: '860px',
      },
      skin_night: {
        value: true,
      },
      skin_light: {
        color: '#1b1b1b',
        link: '#416ed2',
        hover: '#305ab7',
        visited: '#305ab7',
        select: '#1b1b1b',
        selectbg: '#bbd6fc',
        bg: '#ffffff',
        track: '#e2e2e2',
        thumb: '#9e9e9e',
        radius: '4px',
      },
      skin_dark: {
        color: '#b0b0b0',
        link: '#5ac8fa',
        hover: '#3ea4d2',
        visited: '#3ea4d2',
        select: '#fffefe',
        selectbg: '#43b0e2',
        bg: '#4a4a4d',
        track: '#4e4e50',
        thumb: '#83838c',
        radius: '4px',
      },
      theme_light: {
        value: 'light',
      },
      theme_dark: {
        value: 'gray',
      },
    },
  };
}
