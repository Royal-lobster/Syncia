import React from "react";
import FieldWrapper from "../Elements/FieldWrapper";
import SectionHeading from "../Elements/SectionHeading";
import { useSettings } from "~hooks/useSettings";
import { ThemeOptions } from "~config/settings";

const GeneralSettings = () => {
  const [settings, setSettings] = useSettings();
  const generalSettings = settings.general;

  const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSettings({
      ...settings,
      general: {
        ...generalSettings,
        theme: value as ThemeOptions,
      },
    });
  };

  return (
    <div>
      <SectionHeading title="General Settings" />

      <FieldWrapper
        title="Theme"
        description="Change theme of the sidebar and quick menu"
        row
      >
        <select
          value={generalSettings?.theme || ThemeOptions.SYSTEM}
          className="input cdx-w-44"
          onChange={handleThemeChange}
        >
          {Object.values(ThemeOptions).map((theme) => (
            <option key={theme} value={theme}>
              {theme}
            </option>
          ))}
        </select>
      </FieldWrapper>
    </div>
  );
};

export default GeneralSettings;
