"use client";

import React from "react";

export interface Command {
    name: string;
    description: string;
    output: () => React.ReactNode;
    navigate?: string;
}

export default function commands(args: string[]): Command {
    const [key, ...rest] = args;
    const commands: Record<string, Command> = {
        home: {
            name: "Home Command",
            description: "Redirect to the homepage.",
            output: () => (
                <div>
                    <p>Redirecting to homepage...</p>
                </div>
            ),
            navigate: "/"
        },
        whoami: {
            name: "WHOAMI Command",
            description: "Display the mini version of the person owner, then navigates you to the Whoami Page.",
            output: () => (
                <div>
                    <p>User Name: Caineirb </p>
                    <p>Role: Software Engineer </p>
                </div>
            ),
            navigate: "/whoami"
        },
        projects: {
            name: "Projects Command",
            description: "Display the projects list, then navigates you to the Projects Page.",
            output: () => (
                <div>
                    <p>Redirecting to Projects page...</p>
                </div>
            ),
            navigate: "/projects"
        },
        help: {
            name: "Help Command",
            description: "Display the help message.",
            output: () => (
                <div>
                    <p className="mb-4">Available commands:</p>
                    <div className="flex flex-col gap-3">
                        {Object.entries(commands).map(([cmdName, cmdData]) => (
                            <div key={cmdName}>
                                <div className="text-green-400">{cmdData.name}:</div>
                                <div className="ml-8">
                                    {cmdName === 'echo' ? '`echo` [text]' : `\`${cmdName}\``} - {cmdData.description}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )
        },
        clear: {
            name: "Clear Command",
            description: "Clear the terminal.",
            output: () => (
                <div>
                    <p>Terminal cleared</p>
                </div>
            )
        },
        date: {
            name: "Date Command",
            description: "Display the current date and time.",
            output: () => (
                <div>
                    <p>{new Date().toString()}</p>
                </div>
            )
        },
        echo: {
            name: "Echo Command",
            description: "Display the text entered.",
            output: () => (
                <div>
                    <p>{rest.join(" ")}</p>
                </div>
            )
        },
        curl: {
            name: "cURL Command",
            description: "Query the backend /api/engineer endpoint.",
            output: () => (
                <div className="font-mono text-xs space-y-1 text-slate-300">
                    <p className="text-green-400 font-bold">HTTP/1.1 200 OK • X-Response-Time: 1.8ms</p>
                    <p className="text-slate-400">caineirb-backend-core v2.1.0</p>
                    <p className="text-cyan-300 font-semibold">User: Caine Ivan R. Bautista</p>
                    <p className="text-slate-200">Role: Backend &amp; Machine Learning Engineer</p>
                    <p className="text-slate-400">Academics: MSU-IIT Magna Cum Laude • DOST-SEI Scholar</p>
                    <p className="text-slate-400">Telemetry: 15,000 req/s • p99: 3.2ms • 99.99% Uptime</p>
                    <p className="text-emerald-400 mt-1 text-[11px]">External cURL: curl -s caineirb.qzz.io/api/engineer</p>
                </div>
            )
        }
    };

    if (commands[key]) {
        return commands[key];
    } else {
        return {
            name: "Unknown Command",
            description: "Unknown Command",
            output: () => (
                <p className="text-red-400">command not found: {key} {rest}</p>
            )
        }
    }
}