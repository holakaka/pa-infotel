import { AdminAccount } from "@/app/sampledata/AdminUser";
import * as bcrypt from "bcryptjs";

export default async function checkValidPassword(
  username: string,
  password: string
): Promise<boolean> {
  const user = AdminAccount.find((ad) => ad.user_name == username);
  if (!user) {
    return false;
  }
  const passwordInDB = user.user_password;

  try {
    // Compare password
    const result = await bcrypt.compareSync(password, passwordInDB);
    return result;
  } catch (err) {
    return false;
  }
}
