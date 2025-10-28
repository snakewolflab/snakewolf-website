"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SubmitButton } from "./submit-button";

const contactSchema = z.object({
  name: z.string().min(2, { message: "お名前は2文字以上で入力してください。" }),
  email: z.string().email({ message: "有効なメールアドレスを入力してください。" }),
  message: z.string().min(10, { message: "メッセージは10文字以上で入力してください。" }),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function ContactForm() {
  const { toast } = useToast();
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(data: ContactFormValues) {
    // NOTE: This implementation exposes the Discord Webhook URL on the client-side.
    // For enhanced security, it's recommended to use a serverless function (e.g., Firebase Functions)
    // as an intermediary to handle the webhook request.
    const discordWebhookUrl = process.env.NEXT_PUBLIC_DISCORD_WEBHOOK_URL;

    if (discordWebhookUrl) {
      const discordPayload = {
        content: "新しいお問い合わせが来ています",
        username: "お問い合わせフォーム",
        embeds: [
          {
            title: "ウェブサイトから新しいお問い合わせ",
            color: 3447003, // Blue
            fields: [
              { name: "お名前", value: data.name, inline: true },
              { name: "メールアドレス", value: data.email, inline: true },
              { name: "メッセージ", value: data.message },
            ],
            timestamp: new Date().toISOString(),
          },
        ],
      };

      try {
        const response = await fetch(discordWebhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(discordPayload),
        });

        if (!response.ok) {
          console.error(`Discord Webhook failed with status: ${response.status}`);
          // Don't throw an error to the user, just log it.
        }
      } catch (error) {
        console.error('Error sending to Discord Webhook:', error);
      }
    } else {
      console.warn('NEXT_PUBLIC_DISCORD_WEBHOOK_URL is not set. Skipping notification.');
    }
    
    console.log("Contact Form Submitted:", data);
    
    toast({
      title: "成功",
      description: "お問い合わせありがとうございます。メッセージが正常に送信されました。",
    });
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>お名前</FormLabel>
              <FormControl>
                <Input placeholder="山田 太郎" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>メールアドレス</FormLabel>
              <FormControl>
                <Input placeholder="name@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>メッセージ</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="お問い合わせ内容をご記入ください..."
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <SubmitButton isSubmitting={isSubmitting} />
      </form>
    </Form>
  );
}
