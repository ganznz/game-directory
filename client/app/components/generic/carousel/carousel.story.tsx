import type { Meta, StoryObj } from "@storybook/react";

import { Carousel } from "./carousel";

const meta: Meta<typeof Carousel> = {
    component: Carousel,
};

export default meta;

type Story = StoryObj<typeof Carousel>;
export const Default: Story = {
    render: (args) => {
        return (
            <Carousel {...args}>
                <div className="bg-red-500 p-10 rounded-lg">
                    <h1>Slide 1</h1>
                </div>
                <div className="bg-blue-500 p-10 rounded-lg">
                    <h1>Slide 2</h1>
                </div>
                <div className="bg-green-500 p-10 rounded-lg">
                    <h1>Slide 3</h1>
                </div>
            </Carousel>
        );
    },
};
