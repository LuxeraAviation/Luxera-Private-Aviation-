import RegisterPage from "@/imports/Register/ui/pages/RegisterPage";

export const metadata = {
  title: "Sign-In — Luxera",
  description:
    "Sign in to your Luxera account to manage bookings and private flights.",
};

export default function Page() {
  return <RegisterPage isLogin={true} />;
}
