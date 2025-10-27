
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
  
  const { name, email, message } = validatedFields.data;
  const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL;

  if (discordWebhookUrl) {
    const discordPayload = {
      content: "新しいお問い合わせが来ています",
      username: "お問い合わせフォーム",
      embeds: [
        {
          title: "ウェブサイトから新しいお問い合わせ",
          color: 3447003, // Blue
          fields: [
            {
              name: "お名前",
              value: name,
              inline: true,
            },
            {
              name: "メールアドレス",
              value: email,
              inline: true,
            },
            {
              name: "メッセージ",
              value: message,
            },
          ],
          timestamp: new Date().toISOString(),
        },
      ],
    };

    try {
      const response = await fetch(discordWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(discordPayload),
      });

      if (!response.ok) {
        // Webhookへの送信が失敗してもユーザーには影響を与えない
        console.error(`Discord Webhook failed with status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error sending to Discord Webhook:', error);
    }
  } else {
    console.warn('DISCORD_WEBHOOK_URL is not set. Skipping notification.');
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
