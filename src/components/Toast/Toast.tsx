import { forwardRef } from "react"
import { chakra, HTMLChakraProps } from "@chakra-ui/react"

export type ToastVariant = "info" | "success" | "warning" | "critical"

export interface ToastProps extends HTMLChakraProps<"div"> {
  variant?: ToastVariant
  title: string
  description?: string
  onDismiss?: () => void
}

const variantStyles: Record<ToastVariant, { borderColor: string; iconColor: string; icon: string }> = {
  info: { borderColor: "#BEE3F8", iconColor: "#2B6CB0", icon: "ℹ" },
  success: { borderColor: "#BBF0BB", iconColor: "#009D7B", icon: "✓" },
  warning: { borderColor: "#FFE89A", iconColor: "#8B6005", icon: "⚠" },
  critical: { borderColor: "#FFCAB5", iconColor: "#C84F25", icon: "!" },
}

export const Toast = forwardRef<HTMLDivElement, ToastProps>(function Toast(
  { variant = "info", title, description, onDismiss, ...rest },
  ref
) {
  const { borderColor, iconColor, icon } = variantStyles[variant]

  return (
    <chakra.div
      ref={ref}
      display="flex"
      alignItems="flex-start"
      gap="12px"
      p="14px 16px"
      bg="white"
      border="1px solid"
      borderColor={borderColor}
      borderRadius="8px"
      boxShadow="0 4px 12px rgba(0,0,0,0.12)"
      fontFamily="Inter, sans-serif"
      maxW="360px"
      w="100%"
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
        fontSize="11px"
        fontWeight="700"
        flexShrink={0}
        mt="1px"
      >
        {icon}
      </chakra.div>
      <chakra.div flex={1}>
        <chakra.p m={0} fontSize="14px" fontWeight="600" color="slate.800" lineHeight="1.4">
          {title}
        </chakra.p>
        {description && (
          <chakra.p m={0} mt="2px" fontSize="13px" color="slate.700" lineHeight="1.5">
            {description}
          </chakra.p>
        )}
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
          color="grey.400"
          fontSize="14px"
          p="2px"
          borderRadius="4px"
          flexShrink={0}
          _hover={{ color: "slate.800" }}
          aria-label="Dismiss"
        >
          ✕
        </chakra.button>
      )}
    </chakra.div>
  )
})
