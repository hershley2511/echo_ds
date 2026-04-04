import { useState, forwardRef } from "react"
import type { ReactNode } from "react"
import { chakra, HTMLChakraProps } from "@chakra-ui/react"

export type DropdownOptionSize = "md" | "sm"

export interface DropdownOptionProps extends HTMLChakraProps<"div"> {
  size?: DropdownOptionSize
  /** Section header style — uppercase xs bold grey label with bottom divider; non-interactive */
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
  /** Numbered prefix rendered before the label text — e.g. label={1} renders "1." */
  label?: string | number
  /** Forces a visual interaction state without mouse events — for Storybook stories only */
  forceInteractionState?: "hover" | "active"
}

// ── Size tokens ───────────────────────────────────────────────────────────────
const sizeTokens: Record<DropdownOptionSize, {
  minH: string; px: string; activePx: string; iconTextGap: string
  iconSize: string; fontSize: string; lineHeight: string; letterSpacing: string
}> = {
  md: {
    minH: "48px", px: "16px", activePx: "13px", iconTextGap: "16px",
    iconSize: "20px", fontSize: "16px", lineHeight: "24px", letterSpacing: "-0.176px",
  },
  sm: {
    minH: "44px", px: "20px", activePx: "17px", iconTextGap: "8px",
    iconSize: "16px", fontSize: "14px", lineHeight: "20px", letterSpacing: "0px",
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
    label,
    forceInteractionState,
    children,
    ...rest
  },
  ref
) {
  const [isHovered, setIsHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)

  const {
    minH, px, activePx, iconTextGap, iconSize,
    fontSize, lineHeight, letterSpacing,
  } = sizeTokens[size]

  // ── Section title (non-interactive) ────────────────────────────────────────
  if (isTitle) {
    return (
      <chakra.div
        ref={ref}
        display="flex"
        alignItems="center"
        w="full"
        minH={minH}
        pl={px}
        pr={px}
        py="0"
        bg="transparent"
        borderTopWidth={topSeparator ? "1px" : "0"}
        borderTopStyle="solid"
        borderTopColor={topSeparator ? "border.subtle" : "transparent"}
        borderBottomWidth="1px"
        borderBottomStyle="solid"
        borderBottomColor="border.subtle"
        {...rest}
      >
        {leadingIcon && (
          <chakra.span
            display="inline-flex"
            alignItems="center"
            justifyContent="center"
            w={iconSize}
            h={iconSize}
            flexShrink={0}
            mr={iconTextGap}
            color="content.light.medium"
            fontSize={iconSize}
            lineHeight={1}
          >
            {leadingIcon}
          </chakra.span>
        )}
        <chakra.p
          m={0}
          fontFamily="Inter, sans-serif"
          fontWeight="700"
          fontSize="12px"
          lineHeight="16px"
          letterSpacing="0.96px"
          color="content.light.medium"
          textTransform="uppercase"
          style={{ fontFeatureSettings: "'cv05' 1, 'cv10' 1" }}
          whiteSpace="nowrap"
          overflow="hidden"
          textOverflow="ellipsis"
        >
          {children}
        </chakra.p>
      </chakra.div>
    )
  }

  // ── Interactive option ─────────────────────────────────────────────────────
  const hovered = !isActive && (forceInteractionState === "hover" || isHovered)
  const pressed = !isActive && (forceInteractionState === "active" || isPressed)

  const bg = isActive || pressed
    ? "rgba(90,199,146,0.2)"
    : hovered
    ? "rgba(149,229,161,0.2)"
    : "transparent"

  const textColor  = isActive ? "interaction.main.active" : "content.light.default"
  const fontWeight = isActive || pressed ? "500" : "400"
  const showBottomDivider = bottomSeparator

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
      bg={bg}
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
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setIsPressed(false) }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
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

      {/* Label prefix + main text + description */}
      <chakra.div display="flex" flexDir="column" flex={1} minW={0}>
        {label !== undefined ? (
          <chakra.div
            display="flex"
            alignItems="baseline"
            gap="4px"
            fontFamily="Inter, sans-serif"
            color={textColor}
            style={{ fontFeatureSettings: "'cv05' 1, 'cv10' 1, 'lnum' 1, 'tnum' 1" }}
          >
            <chakra.span
              fontWeight="500"
              fontSize="12px"
              lineHeight="16px"
              letterSpacing="0px"
              flexShrink={0}
            >
              {label}.
            </chakra.span>
            <chakra.span
              fontWeight={fontWeight}
              fontSize={fontSize}
              lineHeight={lineHeight}
              letterSpacing={letterSpacing}
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis"
            >
              {children}
            </chakra.span>
          </chakra.div>
        ) : (
          <chakra.p
            m={0}
            fontFamily="Inter, sans-serif"
            fontWeight={fontWeight}
            fontSize={fontSize}
            lineHeight={lineHeight}
            letterSpacing={letterSpacing}
            color={textColor}
            style={{ fontFeatureSettings: "'cv05' 1, 'cv10' 1, 'lnum' 1, 'tnum' 1" }}
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
          >
            {children}
          </chakra.p>
        )}
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
