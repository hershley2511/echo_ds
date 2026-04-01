import { forwardRef } from "react"
import { chakra, HTMLChakraProps } from "@chakra-ui/react"

export type InfoboxVariant = "info" | "success" | "warning" | "critical" | "neutral"

export interface InfoboxProps extends HTMLChakraProps<"div"> {
  variant?: InfoboxVariant
  title?: string
  icon?: React.ReactNode
}

const variantStyles: Record<InfoboxVariant, { bg: string; borderColor: string; iconColor: string; defaultIcon: string }> = {
  info:     { bg: "#EBF8FF", borderColor: "#BEE3F8", iconColor: "#2B6CB0", defaultIcon: "ri-information-line" },
  success:  { bg: "#F1FFE5", borderColor: "#BBF0BB", iconColor: "#009D7B", defaultIcon: "ri-check-line" },
  warning:  { bg: "#FFFAE2", borderColor: "#FFE89A", iconColor: "#8B6005", defaultIcon: "ri-alert-line" },
  critical: { bg: "#FFE8E0", borderColor: "#FFCAB5", iconColor: "#C84F25", defaultIcon: "ri-close-circle-line" },
  neutral:  { bg: "slate.100", borderColor: "grey.100", iconColor: "slate.700", defaultIcon: "ri-information-line" },
}

export const Infobox = forwardRef<HTMLDivElement, InfoboxProps>(function Infobox(
  { variant = "info", title, icon, children, ...rest },
  ref
) {
  const { bg, borderColor, iconColor, defaultIcon } = variantStyles[variant]

  return (
    <chakra.div
      ref={ref}
      display="flex"
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
        color={iconColor}
        fontSize="16px"
        fontWeight="700"
        flexShrink={0}
        lineHeight="1.4"
      >
        {icon ?? <i className={defaultIcon} style={{ lineHeight: 1 }} />}
      </chakra.div>
      <chakra.div display="flex" flexDir="column" gap="4px">
        {title && (
          <chakra.p m={0} fontSize="14px" fontWeight="600" color="slate.800" lineHeight="1.4">
            {title}
          </chakra.p>
        )}
        <chakra.div fontSize="13px" color="slate.700" lineHeight="1.5">
          {children}
        </chakra.div>
      </chakra.div>
    </chakra.div>
  )
})
