import type { Meta, StoryObj } from "@storybook/react";
import { NavBar } from "./navbar";

const meta: Meta<typeof NavBar> = {
    component: NavBar,
};

export default meta;

type Story = StoryObj<typeof NavBar>;
export const NavigationBar: Story = {
    render: (args) => {
        return (
            <NavBar {...args}>
                <a className="font-bold md:p-3 md:mr-5">
                    ULTIMATE GAMES DIRECTORY
                </a>
                <a>Games</a>
                <a>Genres</a>
                <a>Developers</a>
            </NavBar>
        );
    },
};
