import React from "react";

import type { Preview } from "@storybook/react";
import "../app/app.css";
import "./storybook.css";

import { ThemeProvider } from "../app/utils/theme-provider";

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
        theme: {
            options: {
                light: "light",
                dark: "dark",
            },
        },
    },

    argTypes: {
        // control to change 'theme' parameter
        theme: {
            control: { type: "radio" },
            options: ["light", "dark"],
        },
    },

    decorators: [
        (Story, context) => {
            const theme = context.args.theme || "dark";
            return (
                <ThemeProvider theme={theme}>
                    <Story />
                </ThemeProvider>
            );
        },
    ],
};

export default preview;
