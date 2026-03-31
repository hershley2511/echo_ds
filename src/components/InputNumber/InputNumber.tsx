import { forwardRef } from "react"
import { chakra, HTMLChakraProps } from "@chakra-ui/react"

export interface InputNumberProps extends Omit<HTMLChakraProps<"input">, "onChange" | "type"> {
  label?: string
  helperText?: string
  errorMessage?: string
  isDisabled?: boolean
  isRequired?: boolean
  value?: number | string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  min?: number
  max?: number
  step?: number
  prefix?: string
  suffix?: string
  placeholder?: string
}

export const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(function InputNumber(
  {
    label,
    helperText,
    errorMessage,
    isDisabled,
    isRequired,
    value,
    onChange,
    min,
    max,
    step = 1,
    prefix,
    suffix,
    placeholder = "0",
    ...rest
  },
  ref
) {
  const hasError = !!errorMessage

  return (
    <chakra.div display="flex" flexDir="column" gap="4px" w="100%" fontFamily="Inter, sans-serif">
      {label && (
        <chakra.label fontSize="13px" fontWeight="600" color="slate.800">
          {label}
          {isRequired && <chakra.span color="red.500" ml="2px">*</chakra.span>}
        </chakra.label>
      )}
      <chakra.div display="flex" alignItems="stretch" w="100%">
        {prefix && (
          <chakra.div
            display="flex"
            alignItems="center"
            px="10px"
            h="40px"
            bg="slate.100"
            border="1px solid"
            borderColor={hasError ? "red.500" : "grey.100"}
            borderRight="none"
            borderLeftRadius="8px"
            fontSize="14px"
            color="slate.700"
            whiteSpace="nowrap"
            flexShrink={0}
          >
            {prefix}
          </chakra.div>
        )}
        <chakra.input
          ref={ref}
          type="number"
          value={value}
          onChange={onChange}
          disabled={isDisabled}
          min={min}
          max={max}
          step={step}
          placeholder={placeholder}
          bg="white"
          border="1px solid"
          borderColor={hasError ? "red.500" : "grey.100"}
          borderLeftRadius={prefix ? "0" : "8px"}
          borderRightRadius={suffix ? "0" : "8px"}
          h="40px"
          px="12px"
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
          css={{ "WebkitAppearance": "none", MozAppearance: "textfield" } as React.CSSProperties}
          {...rest}
        />
        {suffix && (
          <chakra.div
            display="flex"
            alignItems="center"
            px="10px"
            h="40px"
            bg="slate.100"
            border="1px solid"
            borderColor={hasError ? "red.500" : "grey.100"}
            borderLeft="none"
            borderRightRadius="8px"
            fontSize="14px"
            color="slate.700"
            whiteSpace="nowrap"
            flexShrink={0}
          >
            {suffix}
          </chakra.div>
        )}
      </chakra.div>
      {hasError && <chakra.span fontSize="12px" color="red.500">{errorMessage}</chakra.span>}
      {!hasError && helperText && <chakra.span fontSize="12px" color="slate.700">{helperText}</chakra.span>}
    </chakra.div>
  )
})
