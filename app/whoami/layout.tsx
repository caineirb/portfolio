import React from "react";

export const metadata = {
    title: "Whoami - Caineirb",
    description: "Who am I?",
};


export default function WhoamiLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
