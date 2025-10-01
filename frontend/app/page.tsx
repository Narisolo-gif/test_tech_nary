"use client"; // si app router

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/articles"); // redirige immédiatement
  }, [router]);

  return null; // ou un petit loader
}
