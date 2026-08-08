import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      position="bottom-right"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          error: "group-[.toaster]:!bg-background group-[.toaster]:!text-red-500 dark:group-[.toaster]:!text-red-400 group-[.toaster]:!border-red-500 dark:group-[.toaster]:!border-red-400",
          success: "group-[.toaster]:!bg-background group-[.toaster]:!text-green-600 dark:group-[.toaster]:!text-green-400 group-[.toaster]:!border-green-600 dark:group-[.toaster]:!border-green-400",
          warning: "group-[.toaster]:!bg-background group-[.toaster]:!text-amber-600 dark:group-[.toaster]:!text-amber-400 group-[.toaster]:!border-amber-600 dark:group-[.toaster]:!border-amber-400",
          info: "group-[.toaster]:!bg-background group-[.toaster]:!text-blue-600 dark:group-[.toaster]:!text-blue-400 group-[.toaster]:!border-blue-600 dark:group-[.toaster]:!border-blue-400",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
