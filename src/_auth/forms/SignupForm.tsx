import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SignupValidation } from "@/lib/validation"
import { z } from "zod"
import { Link } from "react-router-dom"
import Loader from "@/components/shared/Loader"
import { useToast } from "@/components/ui/use-toast"
import { useCreateUserAccountMutation } from "@/lib/react-query/queriesAndMutations"


const SignupForms = () => {
  const { toast } = useToast()

  const { mutateAsync: createUserAccount, isLoading: isCreatingUser } = useCreateUserAccountMutation()

  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: ""
    },
  })

  async function onSubmit(values: z.infer<typeof SignupValidation>) {
    const newUser = await createUserAccount(values)
    console.log(newUser, 'newUser')
    if (!newUser) {
      return toast({
        title: "Sign up failed, Please try again",
        description: "Friday, February 10, 2023 at 5:57 PM",
      })
    }
  }

  return (
    <div><Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <img src='/public/assets/images/logo.svg' />
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">Create a new account</h2>
        <p>To use Snapgram enter your details</p>
      </div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input className="shad-input" type='text'  {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>UserName</FormLabel>
              <FormControl>
                <Input type='text' className="shad-input" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type='email' className="shad-input" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type='password' className="shad-input" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="shad-button_primary" type="submit">
          {isCreatingUser ? (
            <div className="flex-center gap-2"> <Loader /> Loading...</div>
          ) :
            "Sign up"}
        </Button>
        <p className="text-small-regular text-light-2 text-center mt-2">
          Already have an account?
          <Link to='/sign-in' className='text-primary-500 ml-1'>Log in</Link>

        </p>
      </form>
    </Form></div>
  )
}

export default SignupForms