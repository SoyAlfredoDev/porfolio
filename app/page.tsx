import { redirect } from "next/navigation";

/** Root entry — always send visitors to the default locale home. */
export default function RootPage() {
  redirect("/es");
}
