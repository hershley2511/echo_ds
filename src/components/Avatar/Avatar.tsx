import { forwardRef } from "react"
import { chakra, HTMLChakraProps } from "@chakra-ui/react"

export type AvatarSize = "md" | "sm" | "xs" | "2xs"
export type AvatarColour = "strong" | "neutral" | "subtle" | "mix" | "purple" | "green" | "mocha" | "blue"
export type AvatarType = "letter" | "icon"
export type AvatarState = "default" | "alert"

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

// Size → { diameter, dropdownSize, fontSize, lineHeight }
const sizes: Record<AvatarSize, { d: string; arrow: string; fs: string; lh: string }> = {
  md:    { d: "40px", arrow: "24px", fs: "14px", lh: "16px" },
  sm:    { d: "36px", arrow: "20px", fs: "12px", lh: "16px" },
  xs:    { d: "32px", arrow: "20px", fs: "12px", lh: "16px" },
  "2xs": { d: "20px", arrow: "12px", fs: "10px", lh: "12px" },
}

// Colour → { bg, bgHover, bgActive, textColor }
const colours: Record<AvatarColour, { bg: string; bgHover: string; bgActive: string; textColor: string }> = {
  strong:  { bg: "#367F94", bgHover: "#578E9E", bgActive: "#2A6373", textColor: "#FFFFFF" },
  neutral: { bg: "#838894", bgHover: "#9A9FB8", bgActive: "#7C8094", textColor: "#FFFFFF" },
  subtle:  { bg: "#D8D9E5", bgHover: "#C6C8D8", bgActive: "#BCC0D1", textColor: "#424559" },
  mix:     { bg: "#5B6AB5", bgHover: "#6B7AC5", bgActive: "#4A5AA5", textColor: "#FFFFFF" },
  purple:  { bg: "#7C3F9A", bgHover: "#8F4FB0", bgActive: "#6A3585", textColor: "#FFFFFF" },
  green:   { bg: "#026257", bgHover: "#017B68", bgActive: "#014039", textColor: "#FFFFFF" },
  mocha:   { bg: "#7A5C4A", bgHover: "#8E6D5A", bgActive: "#664D3D", textColor: "#FFFFFF" },
  blue:    { bg: "#2B6CB0", bgHover: "#3182CE", bgActive: "#245A97", textColor: "#FFFFFF" },
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
    type = "letter",
    colour = "strong",
    size = "md",
    state = "default",
    initials,
    name,
    icon,
    dropdown = false,
    ...rest
  },
  ref
) {
  const { d, arrow, fs, lh } = sizes[size]
  const { bg, bgHover, bgActive, textColor } = colours[colour]
  const isAlert = state === "alert"

  const letters = getInitials(initials, name)

  return (
    <chakra.div
      ref={ref}
      display="inline-flex"
      gap="4px"
      alignItems="center"
      justifyContent="center"
      position="relative"
      cursor="pointer"
      fontFamily="Inter, sans-serif"
      _focusVisible={{
        outline: "none",
        "& > div": {
          borderColor: "#DDFBC6",
          boxShadow: "0 0 0 2px #009D7B",
        },
      }}
      tabIndex={dropdown ? 0 : undefined}
      {...rest}
    >
      {/* Ring wrapper — shows focus ring */}
      <chakra.div
        position="relative"
        display="inline-flex"
        alignItems="center"
        justifyContent="center"
        borderRadius="50px"
        border="2px solid transparent"
        flexShrink={0}
      >
        {/* Background circle */}
        <chakra.div
          w={d}
          h={d}
          borderRadius="full"
          bg={bg}
          display="flex"
          alignItems="center"
          justifyContent="center"
          position="relative"
          overflow="hidden"
          transition="background 0.15s"
          _hover={{ bg: bgHover }}
          _active={{ bg: bgActive }}
        >
          {type === "letter" && (
            <chakra.span
              fontSize={fs}
              fontWeight="500"
              lineHeight={lh}
              color={textColor}
              style={{ fontFeatureSettings: "'cv05' 1, 'cv10' 1" }}
              userSelect="none"
            >
              {letters}
            </chakra.span>
          )}
          {type === "icon" && (
            <chakra.span
              fontSize={`calc(${d} * 0.5)`}
              color={textColor}
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
            bg="#C84F25"
            border="1.5px solid white"
            zIndex={1}
          />
        )}
      </chakra.div>

      {/* Dropdown arrow */}
      {dropdown && (
        <chakra.div
          w={arrow}
          h={arrow}
          display="flex"
          alignItems="center"
          justifyContent="center"
          color="#424559"
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
