import React from "react";
import Link from "next/link";

function Footer() {
  return (
    <>
      <footer className="flex flex-col sm:flex-row justify-between items-center py-6 w-full shrink-0 px-4 sm:px-6 lg:px-8 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2023 Eventify. All rights reserved.
        </p>
        <nav className="flex gap-4 sm:gap-6 mt-4 sm:mt-0">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </>
  );
}

export default Footer;
