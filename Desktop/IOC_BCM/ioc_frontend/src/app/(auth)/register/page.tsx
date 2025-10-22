import Link from "next/link";
import RegisterForm from "./_components/registerForm";
import Image from "next/image";

export default function RegisterPage() {
  return (
    <main className="min-h-[100dvh] w-full bg-[url(/img/LoginBG.png)] bg-cover flex items-center justify-center">
      <div className="mx-auto grid min-h-[100dvh] w-full max-w-[100dvw] grid-cols-1 lg:grid-cols-12">
        {/* Left hero */}
        <section className="relative col-span-7 hidden overflow-hidden rounded-none lg:block">
          {/* soft gradient “blobs” */}
          {/* <div className="absolute inset-0 bg-[radial-gradient(65%_55%_at_40%_45%,_rgba(25,180,140,.95),transparent_60%),radial-gradient(50%_60%_at_75%_35%,_rgba(7,60,120,.95),transparent_60%),radial-gradient(60%_60%_at_30%_80%,_rgba(10,110,90,.9),transparent_60%)]" /> */}
          {/* subtle noise */}
          {/* <div className="pointer-events-none absolute inset-0 opacity-[.18] mix-blend-overlay [background:repeating-linear-gradient(0deg,rgba(255,255,255,.04)_0_2px,transparent_2px_4px)]" /> */}
          {/* rounded corners like in mock */}
          {/* <div className="absolute inset-0 rounded-[24px] ring-1 ring-white/10 m-2" /> */}
          {/* Logo */}
          <div className="relative z-10 flex items-center gap-2 p-10">
            {/* <div className="h-7 w-7 rotate-12 rounded-md bg-white/90" /> */}
            {/* <span className="text-2xl font-semibold tracking-[0.2em] text-white">
              BECAMEX
            </span> */}
            <Image
              src="/icon/BecamexLogo.svg"
              alt="BECAMEX"
              width={200}
              height={200}
              priority
            />
          </div>
          {/* Hero copy */}
          <div className="relative z-10 px-10 pt-8 flex justify-center items-center h-full">
            <h1 className="text-6xl font-extrabold leading-[1.05] text-white drop-shadow-sm mb-40">
              EIP Data Platform
            </h1>
          </div>
        </section>

        {/* Right login panel */}
        <section className="relative col-span-12 flex items-center justify-center bg-[linear-gradient(120deg,#0e7c66_0%,#0c8f6f_45%,#0a7a67_100%)] p-6 lg:col-span-5">
          {/* panel card */}
          <div className="w-full max-w-[520px] rounded-[24px] bg-white/5 p-8 shadow-2xl ring-1 ring-white/15 backdrop-blur-md">
            <header className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-[.16em] text-white/90">
                Create Account
              </p>
              <h2 className="mt-1 text-2xl font-semibold text-white">
                Register
              </h2>
            </header>
            <RegisterForm />
            <p className="mt-8 text-sm text-white/80">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-white underline-offset-4 hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
