import React, { useState } from "react";
import { useTranslation } from "next-i18next";
import type { Language } from "../utils/languages";
import { ENGLISH, languages } from "../utils/languages";
import { useRouter } from "next/router";
import Input from "./Input";
import { FaGlobe } from "react-icons/fa";

const LanguageCombobox = () => {
  const { i18n } = useTranslation();
  const router = useRouter();
  const [actualLanguage, setActualLanguage] = useState(
    findLanguage(i18n.language)
  );