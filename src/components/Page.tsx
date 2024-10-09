import { Affix, AppShell, Flex, LoadingOverlay, Title } from "@mantine/core";
import { ReactNode, useEffect } from "react";

interface PageProps {
  children: ReactNode;
  title: string; // Page title
  loading?: boolean; // Whether to display a loading overlay
}

// Page container
const Page = ({ children, title, loading }: PageProps) => {
  const formattedTitle = `Dog App | ${title}`;

  // Update tab bar title
  useEffect(() => {
    document.title = formattedTitle;
  }, [formattedTitle]);

  return (
    <AppShell header={{ height: 60 }} padding="md">
      {/* Page header */}
      <AppShell.Header>
        <Flex align="center" h="100%" pl="lg">
          <Title>{formattedTitle}</Title>
        </Flex>
      </AppShell.Header>

      {/* Loader */}
      {loading && (
        <Affix
          position={{ top: 0, bottom: 0, left: 0, right: 0 }}
          zIndex={1000}
        >
          <LoadingOverlay visible={true} />
        </Affix>
      )}
      {children}
    </AppShell>
  );
};

export default Page;
