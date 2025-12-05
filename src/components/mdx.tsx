import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc";
import React, { ReactNode } from "react";
import { slugify as transliterate } from "transliteration";

import {
  HeadingLink,
  Text,
  InlineCode,
  CodeBlock,
  TextProps,
  MediaProps,
  Accordion,
  AccordionGroup,
  Table,
  Feedback,
  Button,
  Card,
  Grid,
  Row,
  Column,
  Icon,
  Media,
  SmartLink,
  List,
  ListItem,
  Line,
} from "@once-ui-system/core";

// ---------------------------------------------------------
// FIX #1 — New universal safe slugify (NO CRASH EVER AGAIN)
// ---------------------------------------------------------

function slugify(input: any): string {
  let str = "";

  // Case 1: string
  if (typeof input === "string") {
    str = input;
  }
  // Case 2: number
  else if (typeof input === "number") {
    str = input.toString();
  }
  // Case 3: array of children
  else if (Array.isArray(input)) {
    str = input
      .map((child) =>
        typeof child === "string" || typeof child === "number" ? child : ""
      )
      .join(" ");
  }
  // Case 4: React element with props.children
  else if (typeof input === "object" && input !== null) {
    str = String((input as any)?.props?.children ?? "");
  }
  // Fallback
  else {
    str = String(input ?? "");
  }

  // Normalize unicode (important for accents)
  str = str.normalize("NFKD");

  // Replace '&'
  str = str.replace(/&/g, " and ");

  // Transliterate & build slug
  const slug = transliterate(str, {
    lowercase: true,
    separator: "-",
  });

  // Remove duplicate hyphens
  return slug.replace(/\-+/g, "-").trim();
}

// ---------------------------------------------------------
// LINK HANDLING
// ---------------------------------------------------------

type CustomLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
};

function CustomLink({ href, children, ...props }: CustomLinkProps) {
  if (href.startsWith("/")) {
    return (
      <SmartLink href={href} {...props}>
        {children}
      </SmartLink>
    );
  }

  if (href.startsWith("#")) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  );
}

// ---------------------------------------------------------
// MEDIA WRAPPER
// ---------------------------------------------------------

function createImage({ alt, src, ...props }: MediaProps & { src: string }) {
  if (!src) {
    console.error("Media requires a valid 'src' property.");
    return null;
  }

  return (
    <Media
      marginTop="8"
      marginBottom="16"
      enlarge
      radius="m"
      border="neutral-alpha-medium"
      sizes="(max-width: 960px) 100vw, 960px"
      alt={alt}
      src={src}
      {...props}
    />
  );
}

// ---------------------------------------------------------
// FIX #2 — NEW HEADING THAT NEVER CRASHES slugify
// ---------------------------------------------------------

function createHeading(as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6") {
  const CustomHeading = ({
    children,
    ...props
  }: Omit<React.ComponentProps<typeof HeadingLink>, "as" | "id">) => {
    const slug = slugify(children); // ← FIXED HERE
    return (
      <HeadingLink
        marginTop="24"
        marginBottom="12"
        as={as}
        id={slug}
        {...props}
      >
        {children}
      </HeadingLink>
    );
  };

  CustomHeading.displayName = `${as.toUpperCase()}`;
  return CustomHeading;
}

// ---------------------------------------------------------
// PARAGRAPH
// ---------------------------------------------------------

function createParagraph({ children }: TextProps) {
  return (
    <Text
      style={{ lineHeight: "175%" }}
      variant="body-default-m"
      onBackground="neutral-medium"
      marginTop="8"
      marginBottom="12"
    >
      {children}
    </Text>
  );
}

// ---------------------------------------------------------
// INLINE CODE
// ---------------------------------------------------------

function createInlineCode({ children }: { children: ReactNode }) {
  return <InlineCode>{children}</InlineCode>;
}

// ---------------------------------------------------------
// CODE BLOCK
// ---------------------------------------------------------

function createCodeBlock(props: any) {
  if (props.children?.props?.className) {
    const { className, children } = props.children.props;
    const language = className.replace("language-", "");
    const label = language.charAt(0).toUpperCase() + language.slice(1);

    return (
      <CodeBlock
        marginTop="8"
        marginBottom="16"
        codes={[
          {
            code: children,
            language,
            label,
          },
        ]}
        copyButton
      />
    );
  }

  return <pre {...props} />;
}

// ---------------------------------------------------------
// LISTS
// ---------------------------------------------------------

function createList({ children }: { children: ReactNode }) {
  return <List>{children}</List>;
}

function createListItem({ children }: { children: ReactNode }) {
  return (
    <ListItem marginTop="4" marginBottom="8" style={{ lineHeight: "175%" }}>
      {children}
    </ListItem>
  );
}

// ---------------------------------------------------------
// HR
// ---------------------------------------------------------

function createHR() {
  return (
    <Row fillWidth horizontal="center">
      <Line maxWidth="40" />
    </Row>
  );
}

// ---------------------------------------------------------
// CALLOUT COMPONENT
// ---------------------------------------------------------

type CalloutTone = "brand" | "neutral" | "critical";

function Callout({
  tone = "neutral",
  title,
  children,
}: {
  tone?: CalloutTone;
  title?: ReactNode;
  children: ReactNode;
}) {
  const iconName: Record<CalloutTone, any> = {
    brand: "info",
    neutral: "info",
    critical: "warning",
  };

  const iconTone: Record<CalloutTone, any> = {
    brand: "info-medium",
    neutral: "neutral-medium",
    critical: "warning-medium",
  };

  return (
    <Row
      fillWidth
      padding="12"
      radius="m"
      gap="12"
      background="surface"
      border="neutral-alpha-medium"
      marginTop="8"
      marginBottom="16"
    >
      <Icon name={iconName[tone]} onBackground={iconTone[tone]} size="m" />
      <Column gap="4">
        {title && (
          <Text variant="body-strong-m" onBackground="neutral-strong">
            {title}
          </Text>
        )}
        <Text variant="body-default-m" onBackground="neutral-medium">
          {children}
        </Text>
      </Column>
    </Row>
  );
}

// ---------------------------------------------------------
// COMPONENTS MAP
// ---------------------------------------------------------

const components = {
  p: createParagraph,
  h1: createHeading("h1"),
  h2: createHeading("h2"),
  h3: createHeading("h3"),
  h4: createHeading("h4"),
  h5: createHeading("h5"),
  h6: createHeading("h6"),
  img: createImage,
  a: CustomLink,
  code: createInlineCode,
  pre: createCodeBlock,
  ol: createList,
  ul: createList,
  li: createListItem,
  hr: createHR,
  
  // --- Composants UI exposés ---
  Text,        
  Line,         
  List,         
  ListItem,    
  Accordion,
  InlineCode,
  CodeBlock,
  AccordionGroup,
  Table,
  Feedback,
  Button,
  Card,
  Grid,
  Row,
  Column,
  Icon,
  Media,
  SmartLink,
  Callout,
};

// ---------------------------------------------------------
// MDX RENDERER
// ---------------------------------------------------------

type CustomMDXProps = MDXRemoteProps & {
  components?: typeof components;
};

export function CustomMDX(props: CustomMDXProps) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
    />
  );
}