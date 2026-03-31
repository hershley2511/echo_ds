import { useState, useRef, useEffect, forwardRef } from "react"
import { chakra } from "@chakra-ui/react"

export interface FilterOption {
  label: string
  value: string
  count?: number
}

export interface FilterDropdownProps {
  label: string
  options: FilterOption[]
  value?: string[]
  onChange?: (value: string[]) => void
  isMulti?: boolean
}

export const FilterDropdown = forwardRef<HTMLDivElement, FilterDropdownProps>(function FilterDropdown(
  { label, options, value = [], onChange, isMulti = true },
  ref
) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const hasSelection = value.length > 0

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  const toggle = (optValue: string) => {
    if (!isMulti) {
      onChange?.(value[0] === optValue ? [] : [optValue])
      setIsOpen(false)
      return
    }
    const next = value.includes(optValue)
      ? value.filter((v) => v !== optValue)
      : [...value, optValue]
    onChange?.(next)
  }

  const clear = (e: React.MouseEvent) => {
    e.stopPropagation()
    onChange?.([])
  }

  return (
    <chakra.div ref={ref} position="relative" display="inline-flex" fontFamily="Inter, sans-serif">
      <chakra.div ref={containerRef} position="relative" display="inline-flex">
        <chakra.button
          type="button"
          display="inline-flex"
          alignItems="center"
          gap="6px"
          h="36px"
          px="12px"
          bg={hasSelection ? "green.50" : "white"}
          border="1px solid"
          borderColor={hasSelection ? "green.800" : "grey.100"}
          borderRadius="8px"
          fontSize="13px"
          fontWeight="500"
          color={hasSelection ? "green.800" : "slate.700"}
          cursor="pointer"
          _hover={{ borderColor: hasSelection ? "green.800" : "slate.700", bg: hasSelection ? "green.50" : "slate.100" }}
          onClick={() => setIsOpen((o) => !o)}
        >
          {label}
          {hasSelection && (
            <chakra.span
              display="inline-flex"
              alignItems="center"
              justifyContent="center"
              w="18px"
              h="18px"
              bg="green.800"
              color="white"
              borderRadius="full"
              fontSize="11px"
              fontWeight="700"
            >
              {value.length}
            </chakra.span>
          )}
          <chakra.span fontSize="10px" color="currentColor">▼</chakra.span>
        </chakra.button>

        {isOpen && (
          <chakra.ul
            position="absolute"
            zIndex={200}
            top="calc(100% + 4px)"
            left={0}
            bg="white"
            border="1px solid"
            borderColor="grey.100"
            borderRadius="8px"
            boxShadow="0 8px 24px rgba(0,0,0,0.1)"
            listStyle="none"
            m={0}
            p="4px"
            minW="180px"
          >
            {options.map((opt) => {
              const isSelected = value.includes(opt.value)
              return (
                <chakra.li
                  key={opt.value}
                  display="flex"
                  alignItems="center"
                  gap="8px"
                  px="10px"
                  py="7px"
                  borderRadius="6px"
                  cursor="pointer"
                  _hover={{ bg: "slate.100" }}
                  onMouseDown={() => toggle(opt.value)}
                >
                  {isMulti && (
                    <chakra.div
                      w="14px"
                      h="14px"
                      borderRadius="3px"
                      border="2px solid"
                      borderColor={isSelected ? "green.800" : "grey.100"}
                      bg={isSelected ? "green.800" : "white"}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      flexShrink={0}
                    >
                      {isSelected && <chakra.span color="white" fontSize="9px" fontWeight="700">✓</chakra.span>}
                    </chakra.div>
                  )}
                  <chakra.span fontSize="13px" color="slate.800" flex={1}>{opt.label}</chakra.span>
                  {opt.count !== undefined && (
                    <chakra.span fontSize="11px" color="grey.400">{opt.count}</chakra.span>
                  )}
                </chakra.li>
              )
            })}
            {hasSelection && (
              <>
                <chakra.li h="1px" bg="grey.100" mx="8px" my="4px" listStyle="none" />
                <chakra.li
                  px="10px"
                  py="7px"
                  borderRadius="6px"
                  cursor="pointer"
                  fontSize="13px"
                  color="red.500"
                  _hover={{ bg: "#FFF0EB" }}
                  onMouseDown={clear}
                >
                  Clear filter
                </chakra.li>
              </>
            )}
          </chakra.ul>
        )}
      </chakra.div>
    </chakra.div>
  )
})
