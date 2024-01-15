import { cn } from '@/lib/utils'

export function Container({
  children,
  className,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <section className={cn('flex-1 max-h-screen ', className)} {...rest}>
      {children}
    </section>
  )
}
