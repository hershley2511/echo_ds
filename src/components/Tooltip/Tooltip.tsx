import { useState, useRef, useEffect, forwardRef } from "react"
import { chakra, HTMLChakraProps } from "@chakra-ui/react"

export type TooltipPlacement = "top" | "bottom" | "left" | "right"

export interface TooltipProps extends HTMLChakraProps<"div"> {
  label: string
  placement?: TooltipPlacement
  children: React.ReactNode
  isDisabled?: boolean
}

export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(function Tooltip(
  { label, placement = "top", children, isDisabled = false, ...rest },
  _ref
) {
  const [visible, setVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const placementStyles: Record<TooltipPlacement, object> = {
    top: { bottom: "calc(100% + 6px)", left: "50%", transform: "translateX(-50%)" },
    bottom: { top: "calc(100% + 6px)", left: "50%", transform: "translateX(-50%)" },
    left: { right: "calc(100% + 6px)", top: "50%", transform: "translateY(-50%)" },
    right: { left: "calc(100% + 6px)", top: "50%", transform: "translateY(-50%)" },
  }

  return (
    <chakra.div
      ref={containerRef}
      display="inline-flex"
      position="relative"
      onMouseEnter={() => !isDisabled && setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => !isDisabled && setVisible(true)}
      onBlur={() => setVisible(false)}
      {...rest}
    >
      {children}
      {visible && (
        <chakra.div
          position="absolute"
          zIndex={9999}
          bg="slate.900"
          color="white"
          px="8px"
          py="5px"
          borderRadius="6px"
          fontSize="12px"
          fontWeight="500"
          fontFamily="Inter, sans-serif"
          whiteSpace="nowrap"
          pointerEvents="none"
          style={placementStyles[placement] as React.CSSProperties}
        >
          {label}
        </chakra.div>
      )}
    </chakra.div>
  )
})
