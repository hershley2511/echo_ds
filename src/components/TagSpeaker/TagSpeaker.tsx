import { forwardRef } from "react"
import { chakra, HTMLChakraProps } from "@chakra-ui/react"

export interface TagSpeakerProps extends HTMLChakraProps<"span"> {
  label: string
  isMuted?: boolean
  isActive?: boolean
}

export const TagSpeaker = forwardRef<HTMLSpanElement, TagSpeakerProps>(function TagSpeaker(
  { label, isMuted = false, isActive = false, ...rest },
  ref
) {
  const bg = isActive ? "green.800" : isMuted ? "slate.100" : "white"
  const color = isActive ? "white" : isMuted ? "slate.700" : "slate.800"
  const borderColor = isActive ? "green.800" : "grey.100"

  return (
    <chakra.span
      ref={ref}
      display="inline-flex"
      alignItems="center"
      gap="6px"
      px="10px"
      py="4px"
      borderRadius="999px"
      border="1px solid"
      borderColor={borderColor}
      bg={bg}
      color={color}
      fontFamily="Inter, sans-serif"
      fontSize="12px"
      fontWeight="500"
      lineHeight="1"
      {...rest}
    >
      <chakra.span
        display="inline-flex"
        alignItems="center"
        justifyContent="center"
        fontSize="12px"
        aria-hidden
      >
        {isMuted ? "🔇" : "🎙️"}
      </chakra.span>
      {label}
    </chakra.span>
  )
})
