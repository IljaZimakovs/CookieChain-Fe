"use client";
import React from "react"; // Ensure React is imported
import { useBackButton } from "@/hooks/useBackButton";

export default function BackButton(): JSX.Element | null {
  useBackButton();

  return null; // This component doesn't need to render anything
}
