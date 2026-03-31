import { forwardRef } from "react"
import { chakra, HTMLChakraProps } from "@chakra-ui/react"

export type BannerVariant = "info" | "success" | "warning" | "critical"

export interface BannerProps extends HTMLChakraProps<"div"> {
  variant?: BannerVariant
  title?: string
  description?: string
  onDismiss?: () => void
  action?: React.ReactNode
}

const variants: Record<BannerVariant, { bg: string; borderColor: string; iconColor: string; icon: string }> = {
  info: { bg: "#EBF8FF", borderColor: "#BEE3F8", iconColor: "#2B6CB0", icon: "ℹ" },
  success: { bg: "#F1FFE5", borderColor: "#BBF0BB", iconColor: "#009D7B", icon: "✓" },
  warning: { bg: "#FFFAE2", borderColor: "#FFE89A", iconColor: "#8B6005", icon: "⚠" },
  critical: { bg: "#FFE8E0", borderColor: "#FFCAB5", iconColor: "#C84F25", icon: "✕" },
}

export const Banner = forwardRef<HTMLDivElement, BannerProps>(function Banner(
  { variant = "info", title, description, onDismiss, action, children, ...rest },
  ref
) {
  const { bg, borderColor, iconColor, icon } = variants[variant]

  return (
    <chakra.div
      ref={ref}
      display="flex"
      alignItems="flex-start"
      gap="12px"
      p="16px"
      bg={bg}
      border="1px solid"
      borderColor={borderColor}
      borderRadius="8px"
      fontFamily="Inter, sans-serif"
      {...rest}
    >
      <chakra.div
        w="20px"
        h="20px"
        borderRadius="full"
        bg={iconColor}
        color="white"
        display="flex"
        alignItems="center"
        justifyContent="center"
        fontSize="12px"
        fontWeight="700"
        flexShrink={0}
        mt="1px"
      >
        {icon}
      </chakra.div>
      <chakra.div flex={1} display="flex" flexDir="column" gap="4px">
        {title && (
          <chakra.p m={0} fontSize="14px" fontWeight="600" color="slate.800" lineHeight="1.4">
            {title}
          </chakra.p>
        )}
        {description && (
          <chakra.p m={0} fontSize="13px" color="slate.700" lineHeight="1.5">
            {description}
          </chakra.p>
        )}
        {children}
        {action && <chakra.div mt="8px">{action}</chakra.div>}
      </chakra.div>
      {onDismiss && (
        <chakra.button
          type="button"
          onClick={onDismiss}
          display="flex"
          alignItems="center"
          justifyContent="center"
          bg="transparent"
          border="none"
          cursor="pointer"
          color="slate.700"
          fontSize="16px"
          p="2px"
          borderRadius="4px"
          flexShrink={0}
          _hover={{ bg: "rgba(0,0,0,0.06)" }}
          aria-label="Dismiss"
        >
          ✕
        </chakra.button>
      )}
    </chakra.div>
  )
})
