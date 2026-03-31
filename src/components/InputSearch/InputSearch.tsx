import { forwardRef, useRef } from "react"
import { chakra, HTMLChakraProps } from "@chakra-ui/react"

export interface InputSearchProps extends Omit<HTMLChakraProps<"input">, "onChange" | "type"> {
  label?: string
  placeholder?: string
  helperText?: string
  errorMessage?: string
  isDisabled?: boolean
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onClear?: () => void
  size?: "sm" | "md" | "lg"
}

const sizeStyles = {
  sm: { h: "32px", fontSize: "13px" },
  md: { h: "40px", fontSize: "14px" },
  lg: { h: "48px", fontSize: "16px" },
}

export const InputSearch = forwardRef<HTMLInputElement, InputSearchProps>(function InputSearch(
  {
    label,
    placeholder = "Search…",
    helperText,
    errorMessage,
    isDisabled,
    value,
    onChange,
    onClear,
    size = "md",
    ...rest
  },
  ref
) {
  const hasError = !!errorMessage
  const { h, fontSize } = sizeStyles[size]
  const hasValue = !!value

  return (
    <chakra.div display="flex" flexDir="column" gap="4px" w="100%" fontFamily="Inter, sans-serif">
      {label && (
        <chakra.label fontSize="13px" fontWeight="600" color="slate.800">
          {label}
        </chakra.label>
      )}
      <chakra.div position="relative" w="100%">
        <chakra.span
          position="absolute"
          left="12px"
          top="50%"
          transform="translateY(-50%)"
          fontSize="15px"
          color="grey.400"
          pointerEvents="none"
          zIndex={1}
        >
          🔍
        </chakra.span>
        <chakra.input
          ref={ref}
          type="search"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={isDisabled}
          bg="white"
          border="1px solid"
          borderColor={hasError ? "red.500" : "grey.100"}
          borderRadius="8px"
          h={h}
          pl="36px"
          pr={hasValue && onClear ? "36px" : "12px"}
          fontSize={fontSize}
          color="slate.800"
          w="100%"
          _placeholder={{ color: "grey.400" }}
          _focusVisible={{
            outline: "none",
            borderColor: "green.500",
            boxShadow: "0 0 0 2px #DDFBC6",
          }}
          _disabled={{ bg: "grey.100", color: "grey.400", cursor: "not-allowed" }}
          css={{ "&::-webkit-search-cancel-button": { display: "none" } } as React.CSSProperties}
          {...rest}
        />
        {hasValue && onClear && (
          <chakra.button
            type="button"
            onClick={onClear}
            position="absolute"
            right="10px"
            top="50%"
            transform="translateY(-50%)"
            display="flex"
            alignItems="center"
            justifyContent="center"
            w="18px"
            h="18px"
            bg="grey.100"
            border="none"
            cursor="pointer"
            borderRadius="full"
            fontSize="10px"
            color="slate.700"
            _hover={{ bg: "grey.400", color: "white" }}
            aria-label="Clear search"
          >
            ✕
          </chakra.button>
        )}
      </chakra.div>
      {hasError && <chakra.span fontSize="12px" color="red.500">{errorMessage}</chakra.span>}
      {!hasError && helperText && <chakra.span fontSize="12px" color="slate.700">{helperText}</chakra.span>}
    </chakra.div>
  )
})
