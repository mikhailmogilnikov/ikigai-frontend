import { PluginOptions, tailwindThemePlugin } from '@blur-ui/tailwind-themes';

import { AppThemes } from '../../config/themes';

const pluginOptions: PluginOptions = {
  removeTailwindColors: true,
};

export default tailwindThemePlugin(AppThemes, pluginOptions);
