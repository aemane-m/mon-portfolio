"use client";

import { newsletter, newsletterEffects } from "@/resources";
import {
  Button,
  Heading,
  Input,
  Text,
  Background,
  Column,
  Row,
  SmartLink,
} from "@once-ui-system/core";
import { opacity, SpacingToken } from "@once-ui-system/core";
import React, { useCallback, useState } from "react";

type Props = React.ComponentProps<typeof Column> & {
  substackUrl?: string;
  openInNewTab?: boolean;
};

export function NewsletterForm({
  substackUrl = "https://aemanedev.substack.com",
  openInNewTab = true,
  ...flex
}: Props) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const isValid = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  const onSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!isValid(email)) {
        setError("Please enter a valid email address.");
        return;
      }
      const url =
        `${substackUrl.replace(/\/$/, "")}/subscribe?email=${encodeURIComponent(email)}&utm_source=portfolio`;
      if (openInNewTab) {
        window.open(url, "_blank", "noopener,noreferrer");
      } else {
        window.location.href = url;
      }
    },
    [email, substackUrl, openInNewTab],
  );

  // ✅ La condition arrive après les Hooks
  if (!newsletter.display) return null;

  return (
    <Column
      overflow="hidden"
      fillWidth
      padding="xl"
      radius="l"
      marginBottom="m"
      horizontal="center"
      align="center"
      background="surface"
      border="neutral-alpha-weak"
      {...flex}
    >
      <Background
        top="0"
        position="absolute"
        mask={newsletterEffects.effects.mask}
        gradient={{
          display: newsletterEffects.effects.gradient.display,
          opacity: newsletterEffects.effects.gradient.opacity as opacity,
          x: newsletterEffects.effects.gradient.x,
          y: newsletterEffects.effects.gradient.y,
          width: newsletterEffects.effects.gradient.width,
          height: newsletterEffects.effects.gradient.height,
          tilt: newsletterEffects.effects.gradient.tilt,
          colorStart: newsletterEffects.effects.gradient.colorStart,
          colorEnd: newsletterEffects.effects.gradient.colorEnd,
        }}
        dots={{
          display: newsletterEffects.effects.dots.display,
          opacity: newsletterEffects.effects.dots.opacity as opacity,
          size: newsletterEffects.effects.dots.size as SpacingToken,
          color: newsletterEffects.effects.dots.color,
        }}
        grid={{
          display: newsletterEffects.effects.grid.display,
          opacity: newsletterEffects.effects.grid.opacity as opacity,
          color: newsletterEffects.effects.grid.color,
          width: newsletterEffects.effects.grid.width,
          height: newsletterEffects.effects.grid.height,
        }}
        lines={{
          display: newsletterEffects.effects.lines.display,
          opacity: newsletterEffects.effects.lines.opacity as opacity,
          size: newsletterEffects.effects.lines.size as SpacingToken,
          thickness: newsletterEffects.effects.lines.thickness,
          angle: newsletterEffects.effects.lines.angle,
          color: newsletterEffects.effects.lines.color,
        }}
      />

      <Column maxWidth="xs" horizontal="center">
        <Heading marginBottom="s" variant="display-strong-xs">
          {newsletter.title}
        </Heading>
        <Text wrap="balance" marginBottom="l" variant="body-default-l" onBackground="neutral-weak">
          {newsletter.description}
        </Text>
      </Column>

      <form onSubmit={onSubmit} style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <Row id="substack_signup" fillWidth maxWidth={24} s={{ direction: "column" }} gap="8">
          <Input
            id="substack-email"
            name="email"
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError("");
            }}
            errorMessage={error}
          />
          <Row height="48" vertical="center">
            <Button size="m" fillWidth type="submit">S’abonner</Button>
          </Row>
        </Row>
      </form>
    </Column>
  );
}

export default NewsletterForm;
