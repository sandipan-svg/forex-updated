import { SignInForm } from "@/components/reuseable-compoment/signIn-form";



const Page = () => {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-xl px-5">
        <SignInForm />
      </div>
    </div>
  );
};
export default Page;
