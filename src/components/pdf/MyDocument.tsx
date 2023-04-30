import React from "react";
import { Document, Page, Text, StyleSheet, Font } from "@react-pdf/renderer";

Font.register({
  family: "Roboto,SourceHanSansCN",
  fonts: [
    {
      src: "/fonts/SourceHanSansCN-Regular.otf",
    },
    {
      src: "/fonts/Roboto-Regular.ttf",
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 40,
  },
  section: {
    fontSize: 12,
    fontFamily: "Roboto,SourceHanSansCN",
    marginBottom: 20,
    lineHeight: 1.5,
  },
});

interface MyDocumentProps {
  content: string;
}

const MyDocument: React.