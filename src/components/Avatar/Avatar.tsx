import { forwardRef } from "react"
import { chakra, HTMLChakraProps } from "@chakra-ui/react"

export type AvatarSize   = "md" | "sm" | "xs" | "2xs"
export type AvatarColour = "strong" | "neutral" | "subtle" | "mix" | "purple" | "green" | "mocha" | "blue"
export type AvatarType   = "letter" | "icon"
export type AvatarState  = "default" | "alert" | "disabled"

export interface AvatarProps extends HTMLChakraProps<"div"> {
  type?: AvatarType
  colour?: AvatarColour
  size?: AvatarSize
  state?: AvatarState
  initials?: string
  name?: string
  icon?: React.ReactNode
  dropdown?: boolean
}

const sizes: Record<AvatarSize, { d: string; arrow: string; fs: string; lh: string }> = {
  md:    { d: "40px", arrow: "24px", fs: "14px", lh: "16px" },
  sm:    { d: "36px", arrow: "20px", fs: "12px", lh: "16px" },
  xs:    { d: "32px", arrow: "20px", fs: "12px", lh: "16px" },
  "2xs": { d: "20px", arrow: "12px", fs: "10px", lh: "12px" },
}

interface ColourConfig {
  bg: string
  bgHover: string
  bgActive: string
  ring: string
  text: string
}

// Mix is a gradient in Figma — bg uses CSS variable refs to palette tokens so no
// raw hex values are hardcoded.
const MIX_GRADIENT =
  "linear-gradient(135deg, var(--chakra-colors-teal-600), var(--chakra-colors-lime-500))"

// All colour values reference semantic tokens defined in theme/index.ts.
// Exceptions: "content.dark.strong" and "content.light.brand-strong" are existing
// semantic tokens; avatar.*.* tokens were added alongside this component.
const colours: Record<AvatarColour, ColourConfig> = {
  strong:  { bg: "avatar.strong.default",  bgHover: "avatar.strong.hover",  bgActive: "avatar.strong.active",  ring: "avatar.strong.ring",  text: "content.dark.strong" },
  neutral: { bg: "avatar.neutral.default", bgHover: "avatar.neutral.hover", bgActive: "avatar.neutral.active", ring: "avatar.neutral.ring", text: "content.dark.strong" },
  subtle:  { bg: "avatar.subtle.default",  bgHover: "avatar.subtle.hover",  bgActive: "avatar.subtle.active",  ring: "avatar.subtle.ring",  text: "content.light.brand-strong" },
  mix:     { bg: MIX_GRADIENT,             bgHover: MIX_GRADIENT,           bgActive: MIX_GRADIENT,            ring: "avatar.subtle.ring",  text: "content.dark.strong" },
  purple:  { bg: "avatar.purple.default",  bgHover: "avatar.purple.hover",  bgActive: "avatar.purple.active",  ring: "avatar.purple.ring",  text: "content.dark.strong" },
  green:   { bg: "avatar.green.default",   bgHover: "avatar.green.hover",   bgActive: "avatar.green.active",   ring: "avatar.green.ring",   text: "content.dark.strong" },
  mocha:   { bg: "avatar.mocha.default",   bgHover: "avatar.mocha.hover",   bgActive: "avatar.mocha.active",   ring: "avatar.mocha.ring",   text: "content.dark.strong" },
  blue:    { bg: "avatar.blue.default",    bgHover: "avatar.blue.hover",    bgActive: "avatar.blue.active",    ring: "avatar.blue.ring",    text: "content.dark.strong" },
}

function getInitials(initials?: string, name?: string): string {
  if (initials) return initials.slice(0, 2).toUpperCase()
  if (!name) return "?"
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0][0].toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(function Avatar(
  {
    type     = "letter",
    colour   = "strong",
    size     = "md",
    state    = "default",
    initials,
    name,
    icon,
    dropdown = false,
    ...rest
  },
  ref
) {
  const { d, arrow, fs, lh }               = sizes[size]
  const { bg, bgHover, bgActive, ring, text } = colours[colour]

  const isAlert    = state === "alert"
  const isDisabled = state === "disabled"
  const letters    = getInitials(initials, name)

  // Disabled overrides colour with the system disabled tokens
  const resolvedBg   = isDisabled ? "feedback.disabled.bg"     : bg
  const resolvedText = isDisabled ? "feedback.disabled.strong"  : text

  return (
    <chakra.div
      ref={ref}
      data-group
      display="inline-flex"
      gap="4px"
      alignItems="center"
      justifyContent="center"
      position="relative"
      cursor={isDisabled ? "not-allowed" : "pointer"}
      pointerEvents={isDisabled ? "none" : undefined}
      fontFamily="Inter, sans-serif"
      tabIndex={dropdown && !isDisabled ? 0 : undefined}
      _focusVisible={{ outline: "none" }}
      {...rest}
    >
      {/* Ring wrapper
          Default:       2px transparent border, no padding
          Active:        2px solid ring colour + 4px padding  (matches Figma active treatment)
          Focus-visible: 2px solid focus colour + 4px padding
          Both scale the hit-area outward, not inward, so the circle stays the same size. */}
      <chakra.div
        position="relative"
        display="inline-flex"
        alignItems="center"
        justifyContent="center"
        borderRadius="50px"
        border="2px solid transparent"
        flexShrink={0}
        transition="border-color 0.1s, padding 0.1s"
        {...(!isDisabled && {
          _groupActive:       { borderColor: ring,                padding: "4px" },
          _groupFocusVisible: { borderColor: "focus.brand-default", padding: "4px" },
        })}
      >
        {/* Background circle */}
        <chakra.div
          w={d}
          h={d}
          borderRadius="full"
          bg={resolvedBg}
          display="flex"
          alignItems="center"
          justifyContent="center"
          position="relative"
          overflow="hidden"
          transition="background 0.15s"
          {...(!isDisabled && {
            _groupHover:  { bg: bgHover },
            _groupActive: { bg: bgActive },
          })}
        >
          {type === "letter" && (
            <chakra.span
              fontSize={fs}
              fontWeight="500"
              lineHeight={lh}
              color={resolvedText}
              style={{ fontFeatureSettings: "'cv05' 1, 'cv10' 1" }}
              userSelect="none"
            >
              {letters}
            </chakra.span>
          )}
          {type === "icon" && (
            <chakra.span
              fontSize={`calc(${d} * 0.5)`}
              color={resolvedText}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              {icon ?? (
                <svg width="50%" height="50%" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 10a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-6 8a6 6 0 0 1 12 0H4Z" />
                </svg>
              )}
            </chakra.span>
          )}
        </chakra.div>

        {/* Alert dot — bottom-left corner, 8px red circle */}
        {isAlert && (
          <chakra.div
            position="absolute"
            bottom="0"
            left="0"
            w="8px"
            h="8px"
            borderRadius="full"
            bg="feedback.critical.default"
            border="1.5px solid white"
            zIndex={1}
          />
        )}
      </chakra.div>

      {/* Dropdown caret */}
      {dropdown && (
        <chakra.div
          w={arrow}
          h={arrow}
          display="flex"
          alignItems="center"
          justifyContent="center"
          color={isDisabled ? "feedback.disabled.strong" : "content.light.default"}
          flexShrink={0}
        >
          <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none">
            <path d="M7 10l5 5 5-5H7Z" fill="currentColor" />
          </svg>
        </chakra.div>
      )}
    </chakra.div>
  )
})
