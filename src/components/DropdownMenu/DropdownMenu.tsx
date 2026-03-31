import { useState, useRef, useEffect, forwardRef } from "react"
import { chakra } from "@chakra-ui/react"

export interface DropdownMenuItem {
  label: string
  value: string
  icon?: React.ReactNode
  isDisabled?: boolean
  isDanger?: boolean
  dividerBefore?: boolean
}

export interface DropdownMenuProps {
  items: DropdownMenuItem[]
  trigger: React.ReactNode
  onSelect?: (value: string) => void
  placement?: "bottom-start" | "bottom-end" | "top-start" | "top-end"
  minWidth?: string
}

export const DropdownMenu = forwardRef<HTMLDivElement, DropdownMenuProps>(function DropdownMenu(
  { items, trigger, onSelect, placement = "bottom-start", minWidth = "180px" },
  ref
) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  const placementStyles: Record<string, object> = {
    "bottom-start": { top: "calc(100% + 4px)", left: 0 },
    "bottom-end": { top: "calc(100% + 4px)", right: 0 },
    "top-start": { bottom: "calc(100% + 4px)", left: 0 },
    "top-end": { bottom: "calc(100% + 4px)", right: 0 },
  }

  return (
    <chakra.div ref={containerRef} position="relative" display="inline-flex" fontFamily="Inter, sans-serif">
      <chakra.div onClick={() => setIsOpen((o) => !o)} display="inline-flex" cursor="pointer">
        {trigger}
      </chakra.div>
      {isOpen && (
        <chakra.ul
          position="absolute"
          zIndex={200}
          bg="white"
          border="1px solid"
          borderColor="grey.100"
          borderRadius="8px"
          boxShadow="0 8px 24px rgba(0,0,0,0.12)"
          listStyle="none"
          m={0}
          p="4px"
          minW={minWidth}
          style={placementStyles[placement] as React.CSSProperties}
        >
          {items.map((item, i) => (
            <chakra.div key={item.value}>
              {item.dividerBefore && i > 0 && (
                <chakra.li
                  h="1px"
                  bg="grey.100"
                  mx="8px"
                  my="4px"
                  listStyle="none"
                />
              )}
              <chakra.li
                display="flex"
                alignItems="center"
                gap="8px"
                px="10px"
                py="8px"
                borderRadius="6px"
                fontSize="14px"
                color={item.isDanger ? "red.500" : item.isDisabled ? "grey.400" : "slate.800"}
                fontWeight="400"
                cursor={item.isDisabled ? "not-allowed" : "pointer"}
                opacity={item.isDisabled ? 0.5 : 1}
                _hover={item.isDisabled ? {} : { bg: item.isDanger ? "#FFF0EB" : "slate.100" }}
                onMouseDown={() => {
                  if (!item.isDisabled) {
                    onSelect?.(item.value)
                    setIsOpen(false)
                  }
                }}
              >
                {item.icon && (
                  <chakra.span fontSize="14px" flexShrink={0}>{item.icon}</chakra.span>
                )}
                {item.label}
              </chakra.li>
            </chakra.div>
          ))}
        </chakra.ul>
      )}
    </chakra.div>
  )
})
