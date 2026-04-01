import { useState, forwardRef } from "react"
import type { CSSProperties } from "react"
import { chakra, HTMLChakraProps } from "@chakra-ui/react"

export type AvatarSize   = "md" | "sm" | "xs" | "2xs"
export type AvatarColour = "strong" | "neutral" | "subtle" | "mix"
export type AvatarType   = "letter" | "icon"
export type AvatarState  = "default" | "alert" | "disabled"

export interface AvatarProps extends HTMLChakraProps<"div"> {
  type?:     AvatarType
  colour?:   AvatarColour
  size?:     AvatarSize
  state?:    AvatarState
  initials?: string
  name?:     string
  icon?:     React.ReactNode
  dropdown?: boolean
  /** Forces a visual interaction state without mouse events — for Storybook stories only */
  forceInteractionState?: "hover" | "active" | "focus"
}

const sizes: Record<AvatarSize, { d: string; arrow: string; fs: string; lh: string }> = {
  md:    { d: "40px", arrow: "24px", fs: "14px", lh: "16px" },
  sm:    { d: "36px", arrow: "20px", fs: "12px", lh: "16px" },
  xs:    { d: "32px", arrow: "20px", fs: "12px", lh: "16px" },
  "2xs": { d: "20px", arrow: "12px", fs: "10px", lh: "12px" },
}

interface ColourConfig {
  bg: string       // Chakra semantic token — OR a raw CSS gradient string for mix default
  bgHover: string  // Chakra semantic token
  bgActive: string // Chakra semantic token
  ring: string     // Chakra semantic token
  text: string     // Chakra semantic token
}

// Mix default: light slate→mint gradient (Figma: brand/secondary/50 → brand/primary/100)
const MIX_DEFAULT_GRADIENT = "linear-gradient(135deg, #F6F7FF 0%, #DDFBC6 100%)"

const colours: Record<AvatarColour, ColourConfig> = {
  strong:  { bg: "avatar.strong.default",  bgHover: "avatar.strong.hover",  bgActive: "avatar.strong.active",  ring: "avatar.strong.ring",  text: "content.dark.strong"        },
  neutral: { bg: "avatar.neutral.default", bgHover: "avatar.neutral.hover", bgActive: "avatar.neutral.active", ring: "avatar.neutral.ring", text: "content.dark.strong"        },
  subtle:  { bg: "avatar.subtle.default",  bgHover: "avatar.subtle.hover",  bgActive: "avatar.subtle.active",  ring: "avatar.subtle.ring",  text: "content.light.brand-strong" },
  mix:     { bg: MIX_DEFAULT_GRADIENT,     bgHover: "green.100",            bgActive: "green.200",             ring: "focus.neutral-subtle", text: "content.light.brand-subtle" },
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
    forceInteractionState,
    ...rest
  },
  ref
) {
  // JS-tracked interaction state — works reliably in all browsers and Storybook iframes
  const [isHovered, setIsHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  const { d, arrow, fs, lh }                = sizes[size]
  const { bg, bgHover, bgActive, ring, text } = colours[colour]

  const isAlert    = state === "alert"
  const isDisabled = state === "disabled"
  const letters    = getInitials(initials, name)

  // forceInteractionState overrides live JS state (for Storybook story grids)
  const hovered = forceInteractionState === "hover"  || isHovered
  const pressed = forceInteractionState === "active" || isPressed
  const focused = forceInteractionState === "focus"  || isFocused

  // ── Text colour ─────────────────────────────────────────────────────────────
  const resolvedText = isDisabled ? "feedback.disabled.strong" : text

  // ── Circle background ────────────────────────────────────────────────────────
  // Mix default is a CSS gradient → needs inline style; all other cases use Chakra tokens.
  let circleBg:    string | undefined
  let circleStyle: CSSProperties | undefined

  if (isDisabled) {
    circleBg = "feedback.disabled.bg"
  } else if (pressed) {
    circleBg = bgActive
  } else if (hovered) {
    circleBg = bgHover
  } else if (colour === "mix") {
    circleStyle = { background: bg }
  } else {
    circleBg = bg
  }

  // ── Ring ─────────────────────────────────────────────────────────────────────
  const hasRing   = !isDisabled && (pressed || focused)
  const ringColor = (focused && !pressed) ? "focus.brand-default" : ring

  return (
    <chakra.div
      ref={ref}
      display="inline-flex"
      gap="4px"
      alignItems="center"
      justifyContent="center"
      position="relative"
      cursor={isDisabled ? "not-allowed" : "pointer"}
      pointerEvents={isDisabled ? "none" : undefined}
      fontFamily="Inter, sans-serif"
      tabIndex={!isDisabled ? 0 : undefined}
      _focusVisible={{ outline: "none" }}
      onMouseEnter={() => { if (!isDisabled) setIsHovered(true) }}
      onMouseLeave={() => { setIsHovered(false); setIsPressed(false) }}
      onMouseDown={() => { if (!isDisabled) setIsPressed(true) }}
      onMouseUp={() => setIsPressed(false)}
      onFocus={() => { if (!isDisabled) setIsFocused(true) }}
      onBlur={() => setIsFocused(false)}
      {...rest}
    >
      {/* Ring wrapper — expands with border + padding when active or focused */}
      <chakra.div
        position="relative"
        display="inline-flex"
        alignItems="center"
        justifyContent="center"
        borderRadius="50px"
        border="2px solid"
        borderColor={hasRing ? ringColor : "transparent"}
        padding={hasRing ? "4px" : "0"}
        flexShrink={0}
        transition="border-color 0.1s, padding 0.1s"
      >
        {/* Background circle */}
        <chakra.div
          w={d}
          h={d}
          borderRadius="full"
          bg={circleBg}
          style={circleStyle}
          display="flex"
          alignItems="center"
          justifyContent="center"
          position="relative"
          overflow="hidden"
          transition="background 0.15s"
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

        {/* Alert dot — bottom-left, 8px red circle */}
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
          fontSize={arrow}
          display="flex"
          alignItems="center"
          justifyContent="center"
          color={isDisabled ? "feedback.disabled.strong" : "content.light.default"}
          flexShrink={0}
        >
          <i className="ri-arrow-down-s-line" style={{ lineHeight: 1 }} />
        </chakra.div>
      )}
    </chakra.div>
  )
})
