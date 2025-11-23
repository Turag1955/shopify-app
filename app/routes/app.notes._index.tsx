import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, Link, useNavigate } from "@remix-run/react";
import { authenticate } from "../shopify.server";
import {
    Page,
    Layout,
    Card,
    ResourceList,
    ResourceItem,
    Text,
    BlockStack,
    Button,
    EmptyState,
} from "@shopify/polaris";
import prisma from "../db.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
    const { session } = await authenticate.admin(request);
    const notes = await prisma.note.findMany({
        where: { shop: session.shop },
        orderBy: { updatedAt: "desc" },
    });
    return json({ notes });
};

export default function NotesPage() {
    const { notes } = useLoaderData<typeof loader>();
    const navigate = useNavigate();

    const emptyStateMarkup = (
        <EmptyState
            heading="Create a note to get started"
            action={{
                content: "Create note",
                onAction: () => navigate("new"),
            }}
            image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
        >
            <p>Track your thoughts and ideas.</p>
        </EmptyState>
    );

    return (
        <Page
            title="Quick Notes"
            primaryAction={{
                content: "Create note",
                onAction: () => navigate("new"),
            }}
        >
            <Layout>
                <Layout.Section>
                    <Card padding="0">
                        {notes.length === 0 ? (
                            emptyStateMarkup
                        ) : (
                            <ResourceList
                                resourceName={{ singular: "note", plural: "notes" }}
                                items={notes}
                                renderItem={(note) => {
                                    const { id, title, description, updatedAt } = note;
                                    return (
                                        <ResourceItem
                                            id={id}
                                            url={`/app/notes/${id}`}
                                            accessibilityLabel={`View details for ${title}`}
                                        >
                                            <Text variant="bodyMd" fontWeight="bold" as="h3">
                                                {title}
                                            </Text>
                                            <Text variant="bodyMd" as="p" truncate>
                                                {description}
                                            </Text>
                                            <Text variant="bodySm" as="p" tone="subdued">
                                                Last updated: {new Date(updatedAt).toLocaleDateString()}
                                            </Text>
                                        </ResourceItem>
                                    );
                                }}
                            />
                        )}
                    </Card>
                </Layout.Section>
            </Layout>
        </Page>
    );
}
