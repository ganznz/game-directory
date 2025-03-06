import type { Meta, StoryObj } from "@storybook/react";
import { PopoutImage } from "./popout-image";

const meta: Meta<typeof PopoutImage> = {
  component: PopoutImage,
};

export default meta;
type Story = StoryObj<typeof PopoutImage>;

export const GenericPopoutImage: Story = {
  args: {
    src: "https://images.igdb.com/igdb/image/upload/t_1080p/s7eojwfwa0viamaa68gs.jpg",
  },

  render: (args) => {
    return <PopoutImage className="h-1/3 w-1/3" {...args} />;
  },
};

export const PopoutImageWithBacksplash: Story = {
  args: {
    src: "https://images.igdb.com/igdb/image/upload/t_1080p/s7eojwfwa0viamaa68gs.jpg",
  },

  render: (args) => {
    return (
      <PopoutImage
        className="h-1/3 w-1/3"
        opts={{
          expandedBacksplashColourLight: "bg-light-primary",
          expandedBacksplashColourDark: "dark:bg-dark-bg",
        }}
        {...args}
      />
    );
  },
};

export const PopoutImageWithRotation: Story = {
  args: {
    src: "https://images.igdb.com/igdb/image/upload/t_1080p/s7eojwfwa0viamaa68gs.jpg",
  },

  render: (args) => {
    return (
      <PopoutImage
        className="h-1/3 w-1/3"
        rotateCardEffect
        opts={{
          expandedBacksplashColourLight: "bg-light-primary",
          expandedBacksplashColourDark: "dark:bg-dark-bg",
        }}
        {...args}
      />
    );
  },
};
