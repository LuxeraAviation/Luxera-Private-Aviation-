import RegisterPage from "@/imports/Register/ui/pages/RegisterPage";

export const metadata = {
  title: "Sign-In — FlyNext",
  description:
    "Sign in to your FlyNext account to manage bookings and private flights.",
};

export default function Page() {
  return <RegisterPage isLogin={true} />;
}
