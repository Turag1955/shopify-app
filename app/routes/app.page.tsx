
import { TitleBar } from "@shopify/app-bridge-react";
import { Page, Layout, Card, BlockStack, Text } from "@shopify/polaris";
import { type LoaderFunctionArgs } from "@remix-run/node";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
    await authenticate.admin(request);
    return null;
};

export default function AppPage() {
    return (
        <Page title="Page">
            <TitleBar title="Page" />
            <Layout>
                <Layout.Section>
                    <Card>
                        <BlockStack gap="500">
                            <BlockStack gap="200">
                                <Text as="h2" variant="headingMd">Page</Text>
                                <Text as="p" variant="bodyMd">
                                    This is a page created with Polaris Web Components.
                                </Text>
                            </BlockStack>
                            <BlockStack gap="200">
                                <Text as="h3" variant="headingSm">Content</Text>
                                <Text as="p" variant="bodyMd">
                                    This is some content inside a card.
                                </Text>
                            </BlockStack>
                        </BlockStack>
                    </Card>
                </Layout.Section>
                <Layout.Section variant="oneThird">
                    <Card>
                        <BlockStack gap="500">
                            <Text as="h2" variant="headingMd">Secondary</Text>
                            <Text as="p" variant="bodyMd">
                                This is a secondary section.
                            </Text>
                        </BlockStack>
                    </Card>
                </Layout.Section>
            </Layout>
        </Page>
    );
}