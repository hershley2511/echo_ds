import { useState, useRef, useEffect, forwardRef } from "react"
import { chakra } from "@chakra-ui/react"

export interface MultiselectOption {
  label: string
  value: string
}

export interface InputMultiselectProps {
  options: MultiselectOption[]
  value?: string[]
  onChange?: (value: string[]) => void
  placeholder?: string
  label?: string
  helperText?: string
  errorMessage?: string
  isDisabled?: boolean
  isRequired?: boolean
  maxItems?: number
}

export const InputMultiselect = forwardRef<HTMLDivElement, InputMultiselectProps>(function InputMultiselect(
  {
    options,
    value = [],
    onChange,
    placeholder = "Select options…",
    label,
    helperText,
    errorMessage,
    isDisabled,
    isRequired,
    maxItems,
  },
  ref
) {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState("")
  const containerRef = useRef<HTMLDivElement>(null)
  const hasError = !!errorMessage

  const filtered = options.filter((o) =>
    o.label.toLowerCase().includes(search.toLowerCase())
  )

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
        setSearch("")
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  const toggle = (optValue: string) => {
    const next = value.includes(optValue)
      ? value.filter((v) => v !== optValue)
      : maxItems && value.length >= maxItems
      ? value
      : [...value, optValue]
    onChange?.(next)
  }

  const remove = (optValue: string, e: React.MouseEvent) => {
    e.stopPropagation()
    onChange?.(value.filter((v) => v !== optValue))
  }

  const selectedLabels = value.map((v) => options.find((o) => o.value === v)?.label ?? v)

  return (
    <chakra.div ref={ref} display="flex" flexDir="column" gap="4px" w="100%" fontFamily="Inter, sans-serif">
      {label && (
        <chakra.label fontSize="13px" fontWeight="600" color="slate.800">
          {label}
          {isRequired && <chakra.span color="red.500" ml="2px">*</chakra.span>}
        </chakra.label>
      )}
      <chakra.div ref={containerRef} position="relative" w="100%">
        <chakra.div
          display="flex"
          alignItems="center"
          flexWrap="wrap"
          gap="4px"
          minH="40px"
          px="10px"
          py="5px"
          bg={isDisabled ? "grey.100" : "white"}
          border="1px solid"
          borderColor={hasError ? "red.500" : isOpen ? "green.500" : "grey.100"}
          borderRadius="8px"
          boxShadow={isOpen ? "0 0 0 2px #DDFBC6" : undefined}
          cursor={isDisabled ? "not-allowed" : "pointer"}
          onClick={() => !isDisabled && setIsOpen((o) => !o)}
        >
          {value.length === 0 && (
            <chakra.span fontSize="14px" color="grey.400" flex={1}>
              {placeholder}
            </chakra.span>
          )}
          {selectedLabels.map((lbl, i) => (
            <chakra.span
              key={value[i]}
              display="inline-flex"
              alignItems="center"
              gap="4px"
              px="6px"
              py="2px"
              bg="green.50"
              color="green.800"
              borderRadius="4px"
              fontSize="12px"
              fontWeight="500"
            >
              {lbl}
              {!isDisabled && (
                <chakra.button
                  type="button"
                  onClick={(e) => remove(value[i], e)}
                  bg="transparent"
                  border="none"
                  cursor="pointer"
                  color="green.800"
                  fontSize="10px"
                  p={0}
                  lineHeight={1}
                  _hover={{ opacity: 0.7 }}
                  aria-label={`Remove ${lbl}`}
                >
                  ✕
                </chakra.button>
              )}
            </chakra.span>
          ))}
          <chakra.span ml="auto" fontSize="10px" color="slate.700" flexShrink={0}>
            ▼
          </chakra.span>
        </chakra.div>

        {isOpen && (
          <chakra.div
            position="absolute"
            zIndex={100}
            top="calc(100% + 4px)"
            left={0}
            right={0}
            bg="white"
            border="1px solid"
            borderColor="grey.100"
            borderRadius="8px"
            boxShadow="0 4px 12px rgba(0,0,0,0.1)"
          >
            <chakra.div p="6px" borderBottom="1px solid" borderColor="grey.100">
              <chakra.input
                autoFocus
                type="text"
                placeholder="Search…"
                value={search}
                onChange={(e) => setSearch((e.target as HTMLInputElement).value)}
                w="100%"
                border="1px solid"
                borderColor="grey.100"
                borderRadius="6px"
                h="32px"
                px="10px"
                fontSize="13px"
                color="slate.800"
                _focusVisible={{ outline: "none", borderColor: "green.500" }}
              />
            </chakra.div>
            <chakra.ul
              listStyle="none"
              m={0}
              p="4px"
              maxH="180px"
              overflowY="auto"
            >
              {filtered.length === 0 && (
                <chakra.li px="10px" py="8px" fontSize="13px" color="grey.400" textAlign="center">
                  No options found
                </chakra.li>
              )}
              {filtered.map((opt) => {
                const isSelected = value.includes(opt.value)
                return (
                  <chakra.li
                    key={opt.value}
                    display="flex"
                    alignItems="center"
                    gap="8px"
                    px="10px"
                    py="8px"
                    fontSize="14px"
                    color="slate.800"
                    borderRadius="6px"
                    cursor="pointer"
                    bg={isSelected ? "green.50" : "transparent"}
                    _hover={{ bg: isSelected ? "green.50" : "slate.100" }}
                    onMouseDown={() => toggle(opt.value)}
                  >
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
                    {opt.label}
                  </chakra.li>
                )
              })}
            </chakra.ul>
          </chakra.div>
        )}
      </chakra.div>
      {hasError && <chakra.span fontSize="12px" color="red.500">{errorMessage}</chakra.span>}
      {!hasError && helperText && <chakra.span fontSize="12px" color="slate.700">{helperText}</chakra.span>}
    </chakra.div>
  )
})
