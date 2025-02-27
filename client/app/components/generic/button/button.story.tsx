import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";

const meta: Meta<typeof Button> = {
    component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const GenericButton: Story = {
    render: (args) => {
        return <Button {...args}>Click me</Button>;
    },
};
