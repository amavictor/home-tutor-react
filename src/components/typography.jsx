import { cva } from "class-variance-authority"
import { cn, variantMapping } from "../utils/helpers"
import PropTypes from "prop-types"
import { memo } from "react"

/**
 * This file defines the main Typography component, which is a wrapper around an HTML tag (default is a p tag).
 * It uses the class-variance-authority library to generate CSS classes based on the design system's typography settings.
 * It also uses the variantMapping helper function to map typography variants to their corresponding HTML tags.
 *
 * @param {string} variant - The typography variant to use. Can be one of the following:
 *   - h-xxl
 *   - h-xl
 *   - h-l
 *   - h-m
 *   - h-s
 *   - h-xs
 *   - p-xxl
 *   - p-xl
 *   - p-l
 *   - p-m
 *   - p-s
 * @param {string} tag - The HTML tag to use. If not provided, the component will use the variantMapping helper function to determine the tag based on the variant.
 * @param {string} underline - The underline style to use. Can be one of the following:
 *   - always
 *   - hover
 *   - none
 * @param {string} fontWeight - The font weight to use. Can be one of the following:
 *   - regular
 *   - medium
 *   - bold
 *   - black
 *   - thin
 *   - light
 * @param {boolean} gutterBottom - If true, adds a margin bottom to the element.
 * @param {boolean} noWrap - If true, adds an overflow-hidden and text-ellipsis class to the element.
 * @param {string} align - The text alignment to use. Can be one of the following:
 *   - left
 *   - center
 *   - right
 *   - justify
 *   - start
 *   - end
 * @param {string} color - The color to use. Can be one of the following:
 *   - B100 (black)
 *   - P100 (primary color)
 *   - PR100 (purple)
 *   - T100 (teal)
 *   - G100 (green)
 *   - W100 (white)
 *   - GR100 (gray)
 * @param {string} customClassName - An additional class name to add to the element.
 * @param {string} font - The font family to use.
 * @param {ReactNode} children - The content of the element.
 * @param {string} className - An additional class name to add to the element.
 */

// Color classes defined by the design system for consistency
const colorClasses = {
    // Black color variants
    B100: "text-black",

    // Primary color variants
    P100: "text-primary-color",

    // Purple variants
    PR100: "text-purple",

    // Teal variants
    T100: "text-teal",

    // Green variants
    G100: "text-light-green",

    // White variants
    W100: "text-white",

    // Gray variants
    GR100: "text-gray",
}

// Defining typography variants using class-variance-authority and my tailwind configuration
const typography = cva("", {
    variants: {
        intent: {
            "h-xxl": "text-h-xxl mmd:text-h-xl",
            "h-xl": "text-h-xl mmd:text-h-l",
            "h-l": "text-h-l mmd:text-h-m",
            "h-m": "text-m mmd:text-s",
            "h-s": "text-h-s",
            "h-xs": "text-h-xs",
            "p-xxl": "text-p-xxl mmd:p-xl",
            "p-xl": "text-p-xl mmd:p-l",
            "p-l": "text-p-l",
            "p-m": "text-p-m",
            "p-s": "text-p-s",
        },
        color: colorClasses,
        fontWeight: {
            thin: "font-thin",
            light: "font-light",
            regular: "font-normal",
            medium: "font-medium",
            bold: "font-bold",
            black: "font-black",
        },
        underline: { always: "underline", hover: "hover:underline", none: "" },
        align: {
            center: "text-center",
            start: "text-start",
            end: "text-end",
            left: "text-left",
            right: "text-right",
            justify: "text-justify",
        },
    },
    compoundVariants: [],
})

// Main Typography component
const TypographyComponent = ({
    variant = "p-l",
    tag,
    underline = "none",
    fontWeight = "regular",
    gutterBottom,
    noWrap,
    align = "left",
    color = "B100",
    customClassName = "",
    font,
    children,
    className,
    ...rest
}) => {
    // Determine the HTML tag to use
    const Tag = tag || variantMapping[variant] || "p"

    // Combine additional classnames
    const classNameI = cn(
        gutterBottom && "mb-4",
        noWrap && "overflow-hidden text-ellipsis whitespace-nowrap",
        className
    )

    return (
        <Tag
            className={typography({
                intent: variant,
                underline,
                fontWeight,
                color,
                align,
                font,
                className: cn(classNameI, customClassName),
            })}
            {...rest}
        >
            {children}
        </Tag>
    )
}

// Memoize the component to prevent unnecessary re-renders
export const Typography = memo(TypographyComponent)

// PropTypes for type checking
TypographyComponent.propTypes = {
    variant: PropTypes.oneOf([
        "h-xxl", "h-xl", "h-l", "h-m", "h-s", "h-xs",
        "p-xxl", "p-xl", "p-l", "p-m", "p-s"
    ]),
    tag: PropTypes.string,
    underline: PropTypes.oneOf(["always", "hover", "none"]),
    fontWeight: PropTypes.oneOf(["regular", "medium", "bold", "black", "thin", "light"]),
    gutterBottom: PropTypes.bool,
    noWrap: PropTypes.bool,
    align: PropTypes.oneOf(["left", "center", "right", "justify", "start", "end"]),
    color: PropTypes.oneOf(Object.keys(colorClasses)),
    customClassName: PropTypes.string,
    font: PropTypes.string,
    children: PropTypes.node,
    className: PropTypes.string,
}

