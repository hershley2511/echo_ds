import { forwardRef } from "react"
import { chakra, HTMLChakraProps } from "@chakra-ui/react"

export type TagColorScheme = "brand" | "success" | "critical" | "warning" | "info" | "neutral"

export interface TagProps extends HTMLChakraProps<"span"> {
  colorScheme?: TagColorScheme
  onRemove?: () => void
  isDisabled?: boolean
}

const schemeStyles: Record<TagColorScheme, object> = {
  brand: { bg: "green.50", color: "green.800", borderColor: "green.100" },
  success: { bg: "green.50", color: "green.500", borderColor: "green.100" },
  critical: { bg: "#FFE8E0", color: "red.500", borderColor: "#FFCAB5" },
  warning: { bg: "#FFFAE2", color: "#8B6005", borderColor: "#FFE89A" },
  info: { bg: "#EBF8FF", color: "#2B6CB0", borderColor: "#BEE3F8" },
  neutral: { bg: "slate.100", color: "slate.700", borderColor: "grey.100" },
}

export const Tag = forwardRef<HTMLSpanElement, TagProps>(function Tag(
  { colorScheme = "neutral", onRemove, isDisabled, children, ...rest },
  ref
) {
  return (
    <chakra.span
      ref={ref}
      display="inline-flex"
      alignItems="center"
      gap="4px"
      px="8px"
      py="3px"
      borderRadius="999px"
      border="1px solid"
      fontFamily="Inter, sans-serif"
      fontSize="12px"
      fontWeight="500"
      lineHeight="1"
      opacity={isDisabled ? 0.5 : 1}
      pointerEvents={isDisabled ? "none" : undefined}
      {...schemeStyles[colorScheme]}
      {...rest}
    >
      {children}
      {onRemove && (
        <chakra.button
          type="button"
          onClick={onRemove}
          display="inline-flex"
          alignItems="center"
          justifyContent="center"
          w="14px"
          h="14px"
          borderRadius="full"
          bg="transparent"
          border="none"
          cursor="pointer"
          p="0"
          color="currentColor"
          opacity={0.6}
          _hover={{ opacity: 1 }}
          aria-label="Remove"
        >
          ✕
        </chakra.button>
      )}
    </chakra.span>
  )
})
