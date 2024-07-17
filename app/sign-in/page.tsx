import { signIn } from "@/lib/auth"
 
<<<<<<< HEAD
const SignInPage = () => {
=======
export function SignIn() {
>>>>>>> 81b0658d1cd029a420776d47ce2b7eb07ce5f1dc
  return (
    <form
      action={async (formData) => {
        "use server"
        await signIn("resend", formData)
      }}
    >
      <input type="text" name="email" placeholder="Email" />
      <button type="submit">Signin with Resend</button>
    </form>
  )
<<<<<<< HEAD
}

export default SignInPage;
=======
}
>>>>>>> 81b0658d1cd029a420776d47ce2b7eb07ce5f1dc
