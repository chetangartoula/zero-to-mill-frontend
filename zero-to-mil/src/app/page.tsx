import { getPageRoutes } from "@/utils/getRoutes";
import { redirect } from "next/navigation";

export default function Home() {
  redirect(getPageRoutes("dashboard"));
}
