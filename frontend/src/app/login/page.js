import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import Link from "next/link";
export default function SignupPage() {
  return (
    <div className="font-jost flex min-h-[105vh] items-center justify-center bg-gradient-to-br from-[#ffffff] via-[#c7a581] to-[#ab8965] ">
      <div className="flex max-w-4xl overflow-hidden rounded-2xl bg-white shadow-lg mt-10">
        {/* Left Section */}
        <div className=" w-1/2 bg-purple-50 flex p-8 md:flex flex-col items-center justify-center">
          <Image
            src="/images/hotels/illustration.webp" // Replace with your image path
            alt="Illustration"
            width={400}
            height={400}
            className="object-contain"
          />
        </div>

        {/* Right Section */}
        <div className="w-[60%] p-8 md:w-1/2">
          <h2 className="mb-6 text-2xl font-bold text-gray-800">Login</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-purple-500 focus:ring-purple-500"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-purple-500 focus:ring-purple-500"
                placeholder="Enter your password"
              />
            </div>
            <div className="flex gap-2 justify-end">
              <div>Don&apos;t have an account? </div>
              <Link href='/register' className="text-primary font-semibold italic">Register Now</Link>
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-[#ab8965] py-3 text-sm font-medium text-white hover:bg-yellow-600 focus:outline-none"
            >
              Sign In
            </button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Or sign in with
            </p>
            <div className="mt-4 flex justify-center gap-4">
                <FcGoogle className="text-2xl"/>
             <FaFacebook className="text-blue-500 text-2xl"/>
            </div>
          </div>
          <p className="mt-6 text-xs text-gray-400">
            By signing up, you agree to our
            <a href="#" className="ml-1 text-purple-500 hover:underline">
              Terms of Service
            </a>{" "}
            and
            <a href="#" className="ml-1 text-purple-500 hover:underline">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
