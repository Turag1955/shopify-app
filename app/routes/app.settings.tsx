
import { TitleBar } from "@shopify/app-bridge-react";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
    await authenticate.admin(request);
    return null;
};

export default function SettingsPage() {
    return (
        <s-page title="Settings">
            <TitleBar title="Settings" />
            <s-layout>
                <s-layout-section>
                    <s-card>
                        <s-stack gap="500">
                            <s-stack gap="200">
                                <s-heading accessibility-level={2}>
                                    App Settings
                                </s-heading>
                                <s-paragraph>
                                    This is a placeholder for your app settings. You can use this
                                    page to configure your app.
                                </s-paragraph>
                            </s-stack>
                            <s-stack gap="200">
                                <s-heading accessibility-level={3}>
                                    Configuration
                                </s-heading>
                                <s-list>
                                    <s-list-item>Setting 1</s-list-item>
                                    <s-list-item>Setting 2</s-list-item>
                                    <s-list-item>Setting 3</s-list-item>
                                </s-list>
                            </s-stack>
                        </s-stack>
                    </s-card>
                </s-layout-section>
            </s-layout>
        </s-page>
    );
}
