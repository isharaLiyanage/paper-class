import * as React from "react";
import { Html } from "@react-email/html";
import { Button } from "@react-email/button";
import { Resend } from "resend";

export function Email(props: any) {
  const { url } = props;

  return (
    <Html lang="en">
      <Button href={url}>Click me</Button>
    </Html>
  );
}

export default Email;
const resend = new Resend("re_123456789");

resend.sendEmail({
  from: "ishandananjaya1111@gmail.com",
  to: "isharadulanjaya125@gmail.com",
  subject: "hello world",
  react: <Email firstName="John" product="MyApp" />,
});
