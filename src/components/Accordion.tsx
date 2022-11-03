import { Disclosure as AccordionPrimitive } from "@headlessui/react";
import { FaChevronDown } from "react-icons/fa";

interface AccordionProps {
  child: React.ReactNode;
  name: string;
}

const Accordion = ({ ch