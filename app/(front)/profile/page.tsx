import { Metadata } from "next";

import { ProfileForm } from "./profile-form";

export const metadata: Metadata = {
  title: "Профиль користувача || ТОВ Покров",
};

export default async function Profile() {
  return <ProfileForm />;
}
