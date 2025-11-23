import { json, redirect, type LoaderFunctionArgs, type ActionFunctionArgs } from "@remix-run/node";
import { useLoaderData, useActionData, useSubmit, useNavigate, Form } from "@remix-run/react";
import { authenticate } from "../shopify.server";
import {
    Page,
    Layout,
    Card,
    FormLayout,
    TextField,
    PageActions,
    BlockStack,
} from "@shopify/polaris";
import { useState, useCallback } from "react";
import prisma from "../db.server";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
    const { session } = await authenticate.admin(request);
    const note = await prisma.note.findFirst({
        where: { id: params.id, shop: session.shop },
    });

    if (!note) {
        throw new Response("Not Found", { status: 404 });
    }

    return json({ note });
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
    const { session } = await authenticate.admin(request);
    const formData = await request.formData();
    const actionType = formData.get("actionType");

    if (actionType === "delete") {
        await prisma.note.deleteMany({
            where: { id: params.id, shop: session.shop },
        });
        return redirect("/app/notes");
    }

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;

    if (!title) {
        return json({ errors: { title: "Title is required" } }, { status: 400 });
    }

    await prisma.note.updateMany({
        where: { id: params.id, shop: session.shop },
        data: {
            title,
            description,
        },
    });

    return redirect("/app/notes");
};

export default function NoteDetailsPage() {
    const { note } = useLoaderData<typeof loader>();
    const actionData = useActionData<typeof action>();
    const submit = useSubmit();
    const navigate = useNavigate();

    const [title, setTitle] = useState(note.title);
    const [description, setDescription] = useState(note.description);

    const handleSave = useCallback(() => {
        submit({ title, description, actionType: "save" }, { method: "post" });
    }, [title, description, submit]);

    const handleDelete = useCallback(() => {
        submit({ actionType: "delete" }, { method: "post" });
    }, [submit]);

    return (
        <Page
            title="Edit Note"
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
                                            content: "Delete",
                                            destructive: true,
                                            onAction: handleDelete,
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
