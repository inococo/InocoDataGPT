// home left side
import React, { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import {
  FaBars,
  FaCloud,
  FaCog,
  FaDiscord,
  FaGithub,
  FaQuestionCircle,
  FaRobot,
  FaRocket,
  FaSignInAlt,
  FaSignOutAlt,
  FaTwitter,
  FaUser,
} from "react-icons/fa";
import clsx from "clsx";
import { useAuth } from "../hooks/useAuth";
import type { Session } from "next-auth";
import { env } from "../env/client.mjs";
import { api } from "../utils/api";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

const Drawer = ({
  showHelp,
  showSettings,
  showDS,
}: {
  showHelp: () => void;
  showSettings: () => void;
  showDS: () => void;
}) => {
  const [t] = useTranslation();
  const [showDrawer, setShowDrawer] = useState(true);
  const { session, signIn, signOut, status } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Function to check if the screen width is for desktop or tablet
    const checkScreenWidth = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth >= 768) {
        // 768px is the breakpoint for tablet devices
        setShowDrawer(true);
      } else {
        setShowDrawer(false);
      }
    };

    // Call the checkScreenWidth function initially
    checkScreenWidth();

    // Set up an event listener for window resize events
    window.addEventListener("resize", checkScreenWidth);

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener("resize", checkScreenWidth);
    };
  }, []);

  const sub = api.account.subscribe.useMutation({
    onSuccess: async (url: any) => {
      if (!url) return;
      await router.push(url);
    },
  });

  const query = api.agent.getAll.useQuery(undefined, {
    enabled: !!session?.user,
  });

  const manage = api.account.manage.useMutation({
    onSuccess: async (url: any) => {
      if (!url) return;
      await router.push(url);
    },
  });

  const toggleDrawer = () => {
    setShowDrawer((prevState) => !prevState);
  };

  const userAgents = query.data ?? [];

  return (
    <>
      <div
        id="drawer"
        className={clsx(
          showDrawer ? "translate-x-0 md:sticky" : "-translate-x-full",
          "z-30 m-0 flex h-screen w-72 flex-col justify-between bg-zinc-900 p-3 font-mono text-white shadow-3xl transition-all",
          "fixed top-0 "
        )}
      >
        <div className="flex flex-col gap-1 overflow-hidden">
          <div className="mb-2 flex justify-center gap-2">
            Saved Sessions
            <button
              className={clsx(
                showDrawer ? "-translate-x-2" : "translate-x-12",
                "absolute right-0 top-2 z-40 rounded-md border-2 border-white/20 bg-zinc-900 p-2  text-white transition-all hover:bg-zinc-700 "
              )}
              onClick={toggleDrawer}
            >
              <FaBars />
            </button>
          </div>
          <ul className="flex flex-col gap-2 overflow-auto">
            {userAgents.map(
              (agent: any | undefined, index: any | undefined) => (
                <DrawerItem
                  key={index}
                  icon={<FaRobot />}
                  text={agent.name}
                  className="w-full"
                  onClick={() => void router.push(`/agent?id=${agent.id}`)}
                />
              )
            )}

            {false && status === "unauthenticated" && (
              <div>
                {t(
                  "Sign in to be able to configure data sources and manage your account!"
                )}
              </div>
            )}
            {false && status === "authenticated" && userAgents.length === 0 && (
              <div>
                {t(
                  "You need to configure to connect a data source before anything shows up here!"
                )}
              </div>
            )}
          </ul>
        </div>

        <div className="flex flex-col gap-1">
          <hr className="my-2 border-gray-600/10" />
          {env.NEXT_PUBLIC_FF_SUB_ENABLED ||
            (router.query.pro && (
              <ProItem
                sub={sub.mutate}
                manage={manage.mutate}
                session={session}
              />
            ))}
          {env.NEXT_PUBLIC_FF_AUTH_ENABLED && (
            <AuthItem session={session} signIn={signIn} signOut={signOut} />
          )}
          <DrawerItem
            icon={<FaCog />}
            text="Settings"
            onClick={showSettings} />
          <DrawerItem
            icon={<FaCloud />}
            text="Data Sources"
            onClick={showDS} />
          <DrawerItem
            icon={<FaQuestionCircle />}
            text={t("Help")}
            onClick={showHelp}
          />
          <DrawerItem
            icon={<FaGithub />}
            text="GitHub"
            href="https://github.com/aurorain-ai/DataGPT"
            target="_blank"
          />
        </div>
      </div>
    </>
  );
};

interface DrawerItemProps
  extends Pick<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    "href" | "target"
  > {
  icon: React.ReactNode;
  text: string;
  border?: boolean;
  onClick?: () => any;
  className?: string;
  small?: boolean;
}

const DrawerItem = (props: Draw