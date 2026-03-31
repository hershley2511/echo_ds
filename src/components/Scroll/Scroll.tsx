import { forwardRef } from "react"
import { chakra, HTMLChakraProps } from "@chakra-ui/react"

export interface ScrollProps extends HTMLChakraProps<"div"> {
  maxH?: string
  maxW?: string
  direction?: "vertical" | "horizontal" | "both"
  showScrollbar?: boolean
}

export const Scroll = forwardRef<HTMLDivElement, ScrollProps>(function Scroll(
  { maxH = "300px", maxW, direction = "vertical", showScrollbar = true, children, ...rest },
  ref
) {
  const overflowY = direction === "horizontal" ? "hidden" : "auto"
  const overflowX = direction === "vertical" ? "hidden" : "auto"

  return (
    <chakra.div
      ref={ref}
      maxH={direction !== "horizontal" ? maxH : undefined}
      maxW={direction !== "vertical" ? maxW : undefined}
      overflowY={overflowY}
      overflowX={overflowX}
      css={
        !showScrollbar
          ? ({
              "&::-webkit-scrollbar": { display: "none" },
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            } as React.CSSProperties)
          : ({
              "&::-webkit-scrollbar": { width: "6px", height: "6px" },
              "&::-webkit-scrollbar-track": { background: "transparent" },
              "&::-webkit-scrollbar-thumb": { background: "#D8D9E5", borderRadius: "3px" },
              "&::-webkit-scrollbar-thumb:hover": { background: "#BCC0D1" },
            } as React.CSSProperties)
      }
      {...rest}
    >
      {children}
    </chakra.div>
  )
})
