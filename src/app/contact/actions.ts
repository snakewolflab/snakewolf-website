"use server";

import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "お名前は2文字以上で入力してください。"),
  email: z.string().email("有効なメールアドレスを入力してください。"),
  message: z.string().min(10, "メッセージは10文字以上で入力してください。"),
});

export type State = {
  errors?: {
    name?: string[];
    email?: string[];
    message?: string[];
  };
  message: string | null;
};

export async function submitContactForm(
  prevState: State,
  formData: FormData
): Promise<State> {
  const validatedFields = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "入力内容に誤りがあります。",
    };
  }
  
  // In a real application, you would send an email, save to a database, etc.
  // For this example, we'll just log the data and simulate a delay.
  console.log("Contact Form Submitted:", validatedFields.data);
  await new Promise(resolve => setTimeout(resolve, 1000));

  return {
    errors: {},
    message: "お問い合わせありがとうございます。メッセージが正常に送信されました。",
  };
}
