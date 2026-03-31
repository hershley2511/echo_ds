import { forwardRef } from "react"
import { chakra, HTMLChakraProps } from "@chakra-ui/react"

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl"

export interface AvatarProps extends HTMLChakraProps<"div"> {
  name?: string
  src?: string
  size?: AvatarSize
  showBorder?: boolean
}

const sizes: Record<AvatarSize, { w: string; h: string; fontSize: string }> = {
  xs: { w: "24px", h: "24px", fontSize: "10px" },
  sm: { w: "32px", h: "32px", fontSize: "12px" },
  md: { w: "40px", h: "40px", fontSize: "15px" },
  lg: { w: "56px", h: "56px", fontSize: "20px" },
  xl: { w: "72px", h: "72px", fontSize: "26px" },
}

function getInitials(name?: string) {
  if (!name) return "?"
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0][0].toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

function getColorFromName(name?: string): string {
  const colors = ["#026257", "#017B68", "#009D7B", "#367F94", "#3182CE", "#8B6005"]
  if (!name) return colors[0]
  const idx = name.charCodeAt(0) % colors.length
  return colors[idx]
}

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(function Avatar(
  { name, src, size = "md", showBorder = false, ...rest },
  ref
) {
  const { w, h, fontSize } = sizes[size]
  const initials = getInitials(name)
  const bg = getColorFromName(name)

  return (
    <chakra.div
      ref={ref}
      w={w}
      h={h}
      borderRadius="full"
      overflow="hidden"
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      bg={src ? "transparent" : bg}
      color="white"
      fontWeight="600"
      fontFamily="Inter, sans-serif"
      fontSize={fontSize}
      border={showBorder ? "2px solid white" : undefined}
      boxShadow={showBorder ? "0 0 0 1px rgba(0,0,0,0.1)" : undefined}
      flexShrink={0}
      {...rest}
    >
      {src ? (
        <chakra.img src={src} alt={name} w="100%" h="100%" objectFit="cover" />
      ) : (
        initials
      )}
    </chakra.div>
  )
})
