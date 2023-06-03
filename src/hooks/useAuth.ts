import type { Session } from "next-auth";
import { signIn, SignInResponse, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { z } from "zod";

const UUID_KEY = "uuid";

type Provider = "google" | "github";

interface Auth {
  signIn: (provider?: Provider) => any;
  signOut: () => any;
  status: "authenticated" | "unauthenticated" | "loading";
  session: Session | null;
}

export function useAuth(): Auth {
  const { data: session, status