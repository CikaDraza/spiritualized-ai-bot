"use client";

import { CalendarDaysIcon, HandRaisedIcon } from "@heroicons/react/24/outline";
import { FormEvent, useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you would typically send the email to your backend
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <div className="relative isolate overflow-visible bg-slate-950 py-16 sm:py-24 lg:py-32 -mb-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
          <div className="max-w-xl lg:max-w-lg">
            <h2 className="text-4xl font-semibold tracking-tight text-white">
              Subscribe to our newsletter
            </h2>
            <p className="mt-4 text-lg text-slate-400">
              Dobij najnovije savete za unapređivanje engleskog jezika i jezičke
              preciznosti direktno u tvoju kutiju.
            </p>
            <form
              onSubmit={handleSubmit}
              className="mt-6 flex max-w-md gap-x-4"
            >
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                required
                placeholder="Enter your email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="min-w-0 flex-auto rounded-md bg-slate-900/50 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-slate-800 placeholder:text-slate-500 focus:outline-2 focus:-outline-offset-2 focus:outline-cyan-400 sm:text-sm/6"
              />
              <button
                type="submit"
                className="flex-none rounded-md bg-cyan-400 px-3.5 py-2.5 text-sm font-semibold text-slate-950 shadow-xs hover:bg-cyan-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400 transition-colors"
              >
                Subscribe
              </button>
            </form>
            {subscribed && (
              <p className="mt-4 text-sm text-cyan-300">
                ✓ Thank you for subscribing!
              </p>
            )}
          </div>
          <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
            <div className="flex flex-col items-start">
              <div className="rounded-md bg-slate-900/50 p-2 ring-1 ring-slate-800">
                <CalendarDaysIcon
                  aria-hidden="true"
                  className="size-6 text-cyan-400"
                />
              </div>
              <dt className="mt-4 text-base font-semibold text-white">
                Weekly articles
              </dt>
              <dd className="mt-2 text-base/7 text-slate-400">
                Redovni saveti i detaljne analize za poboljšanje engleskog
                jezika.
              </dd>
            </div>
            <div className="flex flex-col items-start">
              <div className="rounded-md bg-slate-900/50 p-2 ring-1 ring-slate-800">
                <HandRaisedIcon
                  aria-hidden="true"
                  className="size-6 text-cyan-400"
                />
              </div>
              <dt className="mt-4 text-base font-semibold text-white">
                No spam
              </dt>
              <dd className="mt-2 text-base/7 text-slate-400">
                Samo visokokvalitetni sadržaj. Nikada nećemo deliti tvoju
                adresu.
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -z-10 -translate-x-1/2 blur-3xl xl:-top-6"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="aspect-1155/432 w-288.75 bg-linear-to-tr from-cyan-400 to-blue-500 opacity-20"
        />
      </div>
    </div>
  );
}
