import { forwardRef } from "react"
import { chakra, HTMLChakraProps } from "@chakra-ui/react"

export type LinkVariant = "default" | "subtle" | "brand"

export interface LinkProps extends HTMLChakraProps<"a"> {
  variant?: LinkVariant
  isExternal?: boolean
  isDisabled?: boolean
}

const variantStyles: Record<LinkVariant, object> = {
  default: {
    color: "slate.800",
    textDecoration: "underline",
    textDecorationColor: "slate.800",
    _hover: { color: "slate.700", textDecorationColor: "slate.700" },
  },
  subtle: {
    color: "slate.700",
    textDecoration: "underline",
    textDecorationColor: "grey.400",
    _hover: { color: "slate.800", textDecorationColor: "slate.800" },
  },
  brand: {
    color: "green.800",
    textDecoration: "underline",
    textDecorationColor: "green.800",
    _hover: { color: "green.500", textDecorationColor: "green.500" },
  },
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { variant = "brand", isExternal, isDisabled, children, ...rest },
  ref
) {
  return (
    <chakra.a
      ref={ref}
      fontFamily="Inter, sans-serif"
      fontSize="14px"
      fontWeight="500"
      cursor={isDisabled ? "not-allowed" : "pointer"}
      opacity={isDisabled ? 0.4 : 1}
      pointerEvents={isDisabled ? "none" : undefined}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      {...variantStyles[variant]}
      {...rest}
    >
      {children}
    </chakra.a>
  )
})
