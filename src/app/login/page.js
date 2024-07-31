"use client"
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

function Page() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    document.title = "Login | Get Me A Chai";
  if (session) {
    router.push('/dashboard');
  }
  }, [session, router]);

  const handleSignIn = (client) => {
    return async () => {
      const dbRes=await signIn(client);
    };
  };

  return (
    <div className="py-10">
      <div className='text-center font-bold text-white text-3xl pt-4 pb-10 '>
        <p>Login to get started</p>
      </div>

      <div className=" pb-10">
        <div className="mx-auto py-2 px-4 w-full max-w-md h-full md:h-auto">
          <div className="bg-white rounded-lg shadow">
            <div className="p-5">
              <h3 className="text-2xl mb-0.5 font-medium"></h3>
              <p className="mb-4 text-sm font-normal text-gray-800"></p>

              <div className="text-center">
                <p className="mb-3 text-2xl font-semibold leading-5 text-slate-900">
                  page to your account
                </p>
              </div>

              <div className="mt-7 flex flex-col gap-2">

                <button onClick={handleSignIn("github")}
                  className="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60">
                  <Image width='50' height='50'
                    src="https://www.svgrepo.com/show/512317/github-142.svg" alt="GitHub"
                    className="h-[18px] w-[18px] " />
                  Continue with GitHub
                </button>

                <button
                  className="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60">
                  <Image width='50' height='50'
                    src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google"
                    className="h-[18px] w-[18px] " />Continue with
                  Google
                </button>

                <button
                  className="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60">
                  <svg className="mr-2 -ml-1 w-5 h-5" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="apple" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                    <path fill="currentColor" d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"></path>
                  </svg>
                  Continue with Apple
                </button>

                <button className="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60">
                  <svg className="mr-2 -ml-1 w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
                    <path fill="currentColor" d="M 11 4 C 7.134 4 4 7.134 4 11 L 4 39 C 4 42.866 7.134 46 11 46 L 39 46 C 42.866 46 46 42.866 46 39 L 46 11 C 46 7.134 42.866 4 39 4 L 11 4 z M 13.085938 13 L 21.023438 13 L 26.660156 21.009766 L 33.5 13 L 36 13 L 27.789062 22.613281 L 37.914062 37 L 29.978516 37 L 23.4375 27.707031 L 15.5 37 L 13 37 L 22.308594 26.103516 L 13.085938 13 z M 16.914062 15 L 31.021484 35 L 34.085938 35 L 19.978516 15 L 16.914062 15 z"></path>
                  </svg>
                  Continue with Apple
                </button>

                <button
                  className="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60">
                  <Image width='50' height='50'
                    src="https://www.svgrepo.com/show/448234/linkedin.svg" alt="Google"
                    className="h-[18px] w-[18px] " />Continue with
                  LinkedIn
                </button>
              </div>

              <div>
              <div className="flex w-full items-center gap-2 py-6 text-sm text-slate-600">
                <div className="h-px w-full bg-slate-200"></div>
                OR
                <div className="h-px w-full bg-slate-200"></div>
              </div>
              
              <form className="w-full">
                <label for="email" className="sr-only">Email address</label>
                <input name="email" type="email" autocomplete="email" required=""
                  className="block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
                  placeholder="Email Address" value="" />
                <label for="password" className="sr-only">Password</label>
                <input name="password" type="password" autocomplete="current-password" required=""
                  className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
                  placeholder="Password" value="" />
                <p className="mb-3 mt-2 text-sm text-gray-500">
                  <a href="/forgot-password" className="text-blue-800 hover:text-blue-600">Reset your password?</a>
                </p>
                <button type="submit"
                  className="inline-flex w-full items-center justify-center rounded-lg bg-black p-2 py-3 text-sm font-medium text-white outline-none focus:ring-2 focus:ring-black focus:ring-offset-1 disabled:bg-gray-400">
                  Continue
                </button>
              </form>

              <div className="mt-6 text-center text-sm text-slate-600">
                Don&apos;t have an account?
                <Link href="/signup" className="font-medium text-[#4285f4]">Sign up</Link>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page;