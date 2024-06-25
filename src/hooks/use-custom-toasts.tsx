import {toast} from "@/hooks/use-toast";
import Link from "next/link";
import {buttonVariants} from "@/components/ui/Button";

export const useCustomToasts = () => {
  const loginToast = () => {
    const {dismiss} = toast({
      title: 'Login required.',
      description: 'You need to be logged in to do that.',
      variant: 'destructive',
      action: (
        <Link href='/sign-in'
              className={buttonVariants({variant: 'outline'})}
              onClick={() => dismiss()}>Login</Link>
      )
    })
  }
  return {loginToast}
}