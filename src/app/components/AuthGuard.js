"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthGuard({ children }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const active =
      sessionStorage.getItem("sessaoAtiva") === "true" &&
      Boolean(sessionStorage.getItem("usuario"));

    if (!active) {
      router.replace("/");
      return;
    }

    setAuthorized(true);
  }, [router]);

  if (!authorized) return null;
  return children;
}
