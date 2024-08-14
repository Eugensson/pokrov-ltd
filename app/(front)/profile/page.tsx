import { Metadata } from "next";

import { ProfileForm } from "./profile-form";

export const metadata: Metadata = {
  title: "Профиль користувача",
};

export default async function Profile() {
  return <ProfileForm />;
}
