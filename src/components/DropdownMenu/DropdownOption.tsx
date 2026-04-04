import { forwardRef } from "react"
import type { ReactNode } from "react"
import { chakra, HTMLChakraProps } from "@chakra-ui/react"

export type DropdownOptionSize = "md" | "sm"

export interface DropdownOptionProps extends HTMLChakraProps<"div"> {
  size?: DropdownOptionSize
  /** Section header style — medium weight text, renders a divider below */
  isTitle?: boolean
  /** 1px divider line rendered above this item */
  topSeparator?: boolean
  /** 1px divider line rendered below this item */
  bottomSeparator?: boolean
  /** Icon slot rendered before the label */
  leadingIcon?: ReactNode
  /** Icon slot rendered after the label — typically a chevron or badge icon */
  trailingIcon?: ReactNode
  /** Marks this item as the currently selected / active option */
  isActive?: boolean
  /** Secondary description text rendered below the label */
  description?: string
}

// ── Size tokens ───────────────────────────────────────────────────────────────
const sizeTokens: Record<DropdownOptionSize, {
  minH: string; px: string; activePx: string; iconTextGap: string
  iconSize: string; fontSize: string; lineHeight: string; letterSpacing: string
  titleFontSize: string; titleLineHeight: string; titleLetterSpacing: string
}> = {
  md: {
    minH: "48px", px: "16px", activePx: "13px", iconTextGap: "16px",
    iconSize: "20px", fontSize: "16px", lineHeight: "24px", letterSpacing: "-0.176px",
    titleFontSize: "16px", titleLineHeight: "24px", titleLetterSpacing: "-0.096px",
  },
  sm: {
    minH: "44px", px: "20px", activePx: "17px", iconTextGap: "8px",
    iconSize: "16px", fontSize: "14px", lineHeight: "20px", letterSpacing: "0px",
    titleFontSize: "14px", titleLineHeight: "16px", titleLetterSpacing: "0px",
  },
}

// ── Component ─────────────────────────────────────────────────────────────────
export const DropdownOption = forwardRef<HTMLDivElement, DropdownOptionProps>(function DropdownOption(
  {
    size = "md",
    isTitle = false,
    topSeparator = false,
    bottomSeparator = false,
    leadingIcon,
    trailingIcon,
    isActive = false,
    description,
    children,
    ...rest
  },
  ref
) {
  const {
    minH, px, activePx, iconTextGap, iconSize,
    fontSize, lineHeight, letterSpacing,
    titleFontSize, titleLineHeight, titleLetterSpacing,
  } = sizeTokens[size]

  const showBottomDivider = bottomSeparator || isTitle
  const textColor = isActive ? "interaction.main.active" : "content.light.default"

  return (
    <chakra.div
      ref={ref}
      display="flex"
      alignItems="center"
      w="full"
      minH={minH}
      pl={isActive ? activePx : px}
      pr={px}
      py="0"
      bg={isActive ? "rgba(90,199,146,0.2)" : "transparent"}
      borderLeftWidth="3px"
      borderLeftStyle="solid"
      borderLeftColor={isActive ? "content.light.brand-subtle" : "transparent"}
      borderTopWidth={topSeparator ? "1px" : "0"}
      borderTopStyle="solid"
      borderTopColor={topSeparator ? "border.subtle" : "transparent"}
      borderBottomWidth={showBottomDivider ? "1px" : "0"}
      borderBottomStyle="solid"
      borderBottomColor={showBottomDivider ? "border.subtle" : "transparent"}
      borderRightWidth="0"
      cursor="pointer"
      userSelect="none"
      tabIndex={0}
      transition="background 0.1s"
      _hover={isActive ? {} : { bg: "rgba(149,229,161,0.2)" }}
      _active={isActive ? {} : { bg: "rgba(90,199,146,0.2)" }}
      _focusVisible={{
        outline: "none",
        ring: "2px",
        ringColor: "focus.brand-default",
        ringOffset: "2px",
      }}
      {...rest}
    >
      {/* Leading icon */}
      {leadingIcon && (
        <chakra.span
          display="inline-flex"
          alignItems="center"
          justifyContent="center"
          w={iconSize}
          h={iconSize}
          flexShrink={0}
          mr={iconTextGap}
          color={textColor}
          fontSize={iconSize}
          lineHeight={1}
        >
          {leadingIcon}
        </chakra.span>
      )}

      {/* Label + description */}
      <chakra.div display="flex" flexDir="column" flex={1} minW={0}>
        <chakra.p
          m={0}
          fontFamily="Inter, sans-serif"
          fontWeight={isTitle ? "500" : "400"}
          fontSize={isTitle ? titleFontSize : fontSize}
          lineHeight={isTitle ? titleLineHeight : lineHeight}
          letterSpacing={isTitle ? titleLetterSpacing : letterSpacing}
          color={textColor}
          style={{ fontFeatureSettings: "'cv05' 1, 'cv10' 1, 'lnum' 1, 'tnum' 1" }}
          whiteSpace="nowrap"
          overflow="hidden"
          textOverflow="ellipsis"
        >
          {children}
        </chakra.p>
        {description && (
          <chakra.p
            m={0}
            fontFamily="Inter, sans-serif"
            fontWeight="400"
            fontSize="12px"
            lineHeight="16px"
            color="content.light.subtle"
            style={{ fontFeatureSettings: "'cv05' 1, 'cv10' 1" }}
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
          >
            {description}
          </chakra.p>
        )}
      </chakra.div>

      {/* Trailing icon */}
      {trailingIcon && (
        <chakra.span
          display="inline-flex"
          alignItems="center"
          justifyContent="center"
          w={iconSize}
          h={iconSize}
          flexShrink={0}
          ml="8px"
          color={textColor}
          fontSize={iconSize}
          lineHeight={1}
        >
          {trailingIcon}
        </chakra.span>
      )}
    </chakra.div>
  )
})
