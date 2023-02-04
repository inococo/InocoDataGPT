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
      