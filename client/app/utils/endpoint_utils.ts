/**
 * Enum representing available image size options for IGDB images
 * @enum {string}
 */
enum ImageSize {
    /** Cover small - 90x128px, Fit */
    CoverSmall = "t_cover_small",

    /** Cover big - 264x374px, Fit */
    CoverBig = "t_cover_big",

    /** Logo medium - 284x160px, Fit */
    LogoMed = "t_logo_med",

    /** Screenshot medium - 569x320px, Lfill, Center gravity */
    ScreenshotMed = "t_screenshot_med",

    /** Screenshot big - 889x500px, Lfill, Center gravity */
    ScreenshotBig = "t_screenshot_big",

    /** Screenshot huge - 1280x720px, Lfill, Center gravity */
    ScreenshotHuge = "t_screenshot_huge",

    /** Thumbnail - 90x90px, Thumb, Center gravity */
    Thumb = "t_thumb",

    /** Micro thumbnail - 35x35px, Thumb, Center gravity */
    Micro = "t_micro",

    /** 720p resolution - 1280x720px, Fit, Center gravity */
    Resolution720 = "t_720p",

    /** 1080p resolution - 1920x1080px, Fit, Center gravity */
    Resolution1080 = "t_1080p",
}

/**
 * Adjusts the size of an IGDB image URL by replacing the size parameter
 * @param {string} url - The original image URL
 * @param {ImageSize} size - The desired image size from the ImageSize enum
 * @returns {string} The modified URL with the new size parameter
 *
 * @example
 * const bigCover = adjustImageSize("https://images.igdb.com/...t_thumb.jpg", ImageSize.CoverBig);
 */
export const adjustImageSize = (url: string, size: ImageSize): string => {
    return url.replace("t_thumb", size);
};
