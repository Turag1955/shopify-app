import { json, redirect, type ActionFunctionArgs } from "@remix-run/node";
import { useActionData, useSubmit, useNavigate, Form } from "@remix-run/react";
import { authenticate } from "../shopify.server";
import {
    Page,
    Layout,
    Card,
    FormLayout,
    TextField,
    BlockStack,
    PageActions,
} from "@shopify/polaris";
import { useState, useCallback } from "react";
import prisma from "../db.server";

export const action = async ({ request }: ActionFunctionArgs) => {
    const { session } = await authenticate.admin(request);
    const formData = await request.formData();
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;

    if (!title) {
        return json({ errors: { title: "Title is required" } }, { status: 400 });
    }

    await prisma.note.create({
        data: {
            shop: session.shop,
            title,
            description,
        },
    });

    return redirect("/app/notes");
};

export default function NewNotePage() {
    const actionData = useActionData<typeof action>();
    const submit = useSubmit();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSave = useCallback(() => {
        submit({ title, description }, { method: "post" });
    }, [title, description, submit]);

    return (
        <Page
            title="Create Note"
            backAction={{ content: "Quick Note", onAction: () => navigate("/app/notes") }}
        >
            <Layout>
                <Layout.Section>
                    <Card>
                        <Form method="post">
                            <FormLayout>
                                <TextField
                                    label="Title"
                                    name="title"
                                    value={title}
                                    onChange={setTitle}
                                    autoComplete="off"
                                    error={actionData?.errors?.title}
                                />
                                <TextField
                                    label="Description"
                                    name="description"
                                    value={description}
                                    onChange={setDescription}
                                    multiline={4}
                                    autoComplete="off"
                                />
                                <PageActions
                                    primaryAction={{
                                        content: "Save",
                                        onAction: handleSave,
                                    }}
                                    secondaryActions={[
                                        {
                                            content: "Cancel",
                                            onAction: () => navigate("/app/notes"),
                                        },
                                    ]}
                                />
                            </FormLayout>
                        </Form>
                    </Card>
                </Layout.Section>
            </Layout>
        </Page>
    );
}
