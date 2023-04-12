import React, { useEffect } from "react";
import { useTranslation } from "next-i18next";
import Button from "./Button";
import {
  FaKey,
  FaMicrochip,
  FaThermometerFull,
  FaExclamationCircle,
  FaSyncAlt,
  FaCoins,
} from "react-icons/fa";
import Dialog from "./Dialog";
import Input from "./Input";
import { GPT_MODEL_NAMES, GPT_4 } from "../utils/constants";
import Accordion from "./Accordion";
import type { ModelSettings } from "../utils/types";
import LanguageCombobox from "./LanguageCombobox";

export const SettingsDialog: React.FC<{
  show: boolean;
  close: () => void;
  customSettings: [ModelSettings, (settings: ModelSettings) => void];
}> = ({ show, close, customSettings: [customSettings, setCustomSettings] }) => {
  const [settings, setSettings] = React.useState<ModelSettings>({
    ...customSettings,
  });
  const [t] = useTranslation();

  useEffect(() => {
    setSettings(customSettings);
  }, [customSettings, close]);

  const updateSettings = <Key extends keyof ModelSettings>(
    key: Key,
    value: ModelSettings[Key]
  ) => {
    setSettings((prev) => {
      return { ...prev, [key]: value };
    });
  };

  function keyIsValid(key: string | undefined) {
    const pattern = /^sk-[a-zA-Z0-9]{48}$/;
    return key && pattern.test(key);
  }

  const handleSave = () => {
    if (!keyIsValid(settings.customApiKey)) {
      alert(
        t(
          "Key is invalid, please ensure that you have set up billing in your OpenAI account!"
        )
      );
      return;
    }

    setCustomSettings(settings);
    close();
    return;
  };

  const disabled = !settings.customApiKey;
  const advancedSettings = (
    <>
      <Input
        left={
          <>
            <FaThermometerFull />
            <span className="ml-2">Temp: </span>
          </>
        }
        value={settings.customTemperature}
        onChange={(e) =>
          updateSettings("customTemperature", parseFloat(e.target.value))
        }
        type="range"
        toolTipProperties={{
          message: `${t(
            "Higher values will make the output more random, while lower values make the output m