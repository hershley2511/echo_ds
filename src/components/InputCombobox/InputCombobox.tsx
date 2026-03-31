import { useState, useRef, useEffect, forwardRef } from "react"
import { chakra } from "@chakra-ui/react"

export interface ComboboxOption {
  label: string
  value: string
}

export interface InputComboboxProps {
  options: ComboboxOption[]
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  label?: string
  helperText?: string
  errorMessage?: string
  isDisabled?: boolean
  isRequired?: boolean
}

export const InputCombobox = forwardRef<HTMLDivElement, InputComboboxProps>(function InputCombobox(
  {
    options,
    value = "",
    onChange,
    placeholder = "Search or select…",
    label,
    helperText,
    errorMessage,
    isDisabled,
    isRequired,
  },
  ref
) {
  const [inputValue, setInputValue] = useState(
    options.find((o) => o.value === value)?.label ?? value
  )
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const hasError = !!errorMessage

  const filtered = options.filter((o) =>
    o.label.toLowerCase().includes(inputValue.toLowerCase())
  )

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  const select = (opt: ComboboxOption) => {
    setInputValue(opt.label)
    onChange?.(opt.value)
    setIsOpen(false)
  }

  return (
    <chakra.div ref={ref} display="flex" flexDir="column" gap="4px" w="100%" fontFamily="Inter, sans-serif">
      {label && (
        <chakra.label fontSize="13px" fontWeight="600" color="slate.800">
          {label}
          {isRequired && <chakra.span color="red.500" ml="2px">*</chakra.span>}
        </chakra.label>
      )}
      <chakra.div ref={containerRef} position="relative" w="100%">
        <chakra.input
          type="text"
          value={inputValue}
          placeholder={placeholder}
          disabled={isDisabled}
          onFocus={() => setIsOpen(true)}
          onChange={(e) => {
            setInputValue((e.target as HTMLInputElement).value)
            setIsOpen(true)
          }}
          bg="white"
          border="1px solid"
          borderColor={hasError ? "red.500" : "grey.100"}
          borderRadius="8px"
          h="40px"
          px="12px"
          pr="36px"
          fontSize="14px"
          color="slate.800"
          w="100%"
          _placeholder={{ color: "grey.400" }}
          _focusVisible={{
            outline: "none",
            borderColor: "green.500",
            boxShadow: "0 0 0 2px #DDFBC6",
          }}
          _disabled={{ bg: "grey.100", color: "grey.400", cursor: "not-allowed" }}
        />
        <chakra.span
          position="absolute"
          right="12px"
          top="50%"
          transform={`translateY(-50%) rotate(${isOpen ? "180deg" : "0deg"})`}
          fontSize="10px"
          color="slate.700"
          pointerEvents="none"
          transition="transform 0.2s"
        >
          ▼
        </chakra.span>
        {isOpen && !isDisabled && filtered.length > 0 && (
          <chakra.ul
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
            maxH="200px"
            overflowY="auto"
            listStyle="none"
            m={0}
            p="4px"
          >
            {filtered.map((opt) => (
              <chakra.li
                key={opt.value}
                px="10px"
                py="8px"
                fontSize="14px"
                color="slate.800"
                borderRadius="6px"
                cursor="pointer"
                bg={opt.value === value ? "green.50" : "transparent"}
                fontWeight={opt.value === value ? "600" : "400"}
                _hover={{ bg: opt.value === value ? "green.50" : "slate.100" }}
                onMouseDown={() => select(opt)}
              >
                {opt.label}
              </chakra.li>
            ))}
          </chakra.ul>
        )}
        {isOpen && !isDisabled && filtered.length === 0 && (
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
            p="12px"
            fontSize="13px"
            color="grey.400"
            textAlign="center"
          >
            No options found
          </chakra.div>
        )}
      </chakra.div>
      {hasError && <chakra.span fontSize="12px" color="red.500">{errorMessage}</chakra.span>}
      {!hasError && helperText && <chakra.span fontSize="12px" color="slate.700">{helperText}</chakra.span>}
    </chakra.div>
  )
})
