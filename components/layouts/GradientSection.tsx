import { type PropsWithChildren } from "react"

export function LayoutItem({
  children,
  className,
  as: ElementType,
  ...props
}: PropsWithChildren<{ as?: string; className?: string }>) {
  const Wrapper = (ElementType || "div") as any
  return (
    <Wrapper
      {...props}
      className={`flex flex-col w-full px-8 max-w-7xl mx-auto ${className}`}
    >
      {children}
    </Wrapper>
  )
}

function GradientSection({
  children,
  className,
}: PropsWithChildren<{
  className?: string
}>) {
  return (
    <section data-type="texture-wrapper" className={`relative ${className}`}>
      <div
        data-type="texture"
        className="inset-0 absolute pointer-events-none"
      />
      <LayoutItem className="relative z-[1]">{children}</LayoutItem>
    </section>
  )
}

export default GradientSection
