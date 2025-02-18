import type { StorybookConfig } from "@storybook/react-vite";
import { mergeConfig } from "vite";
import { join, dirname } from "path";

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): any {
    return dirname(require.resolve(join(value, "package.json")));
}
const config: StorybookConfig = {
    stories: ["../app/**/*.story.@(js|jsx|ts|tsx)"],
    addons: [
        getAbsolutePath("@storybook/addon-onboarding"),
        getAbsolutePath("@storybook/addon-essentials"),
        getAbsolutePath("@chromatic-com/storybook"),
        getAbsolutePath("@storybook/addon-interactions"),
        "storybook-addon-deep-controls",
    ],
    core: {
        builder: "@storybook/builder-vite",
    },
    framework: {
        name: getAbsolutePath("@storybook/react-vite"),
        options: {
            builder: {
                viteConfigPath: "./sb-vite.config.ts",
            },
        },
    },
    viteFinal: async (config) => {
        return mergeConfig(config, {
            resolve: {
                alias: {
                    "@": "/app",
                },
            },
        });
    },
};
export default config;
