import { useEffect } from "react";
import { useLocation, useSearchParams } from "react-router";

const titlePrefix = "Cinegood";
const titleDelimiter = " | ";

export default function PageTitle({ title }: { title: string }) {
  const location = useLocation();
  const searchParams = useSearchParams();

  useEffect(() => {
    document.title = title ? `${titlePrefix}${titleDelimiter}${title}` : titlePrefix;
  }, [location, searchParams, title]);

  return null;
}
