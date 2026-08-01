import Image from "next/image";
import Link from "next/link";

export function Nav({ minimal }: { minimal?: boolean }) {
  return (
    <nav aria-label="Main navigation" className="fixed top-0 left-0 right-0 z-50 bg-paper/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-2xl items-center justify-between px-6 py-5">
        <Link href="/">
          <Image src="/ray-logo-dark.png" alt="Ray" width={38} height={19} className="h-[17px] w-auto" />
        </Link>
        <div className="flex items-center gap-5 sm:gap-7">
          {!minimal && (
            <>
              <a
                href="#how-it-works"
                className="hidden text-sm text-stone-500 transition-colors hover:text-stone-900 sm:block"
              >
                How it works
              </a>
              <a
                href="#privacy"
                className="hidden text-sm text-stone-500 transition-colors hover:text-stone-900 sm:block"
              >
                Privacy
              </a>
              <a
                href="#pricing"
                className="text-sm text-stone-500 transition-colors hover:text-stone-900"
              >
                Pricing
              </a>
            </>
          )}
          <a
            href="https://github.com/cdinnison/ray-finance"
            className="text-sm font-medium text-stone-900 underline decoration-stone-300 underline-offset-4 transition-colors hover:decoration-stone-500"
          >
            GitHub
          </a>
        </div>
      </div>
    </nav>
  );
}
