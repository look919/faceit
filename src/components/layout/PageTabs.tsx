"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

export type PageTab = {
  label: string;
  content: React.ReactNode;
  isHidden?: boolean;
};

type PageTabsProps = {
  tabs: PageTab[];
  defaultTab: string;
};

export const PageTabs = ({ tabs, defaultTab }: PageTabsProps) => {
  const [category, setCategory] = React.useState(defaultTab);

  return (
    <Tabs value={category} onValueChange={(newValue) => setCategory(newValue)}>
      <TabsList className="my-2">
        {tabs.map((tab) =>
          !tab.isHidden ? (
            <TabsTrigger key={tab.label} value={tab.label}>
              {tab.label}
            </TabsTrigger>
          ) : null
        )}
      </TabsList>
      {tabs.find((tab) => tab.label === category)?.content}
    </Tabs>
  );
};
