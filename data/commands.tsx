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
            description: "Display the mini version of the person owner.",
            output: () => (
                <div>
                    <p>User Name: Caineirb </p>
                    <p>Role: Software Engineer </p>
                </div>
            ),
            navigate: "/whoami"
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
                                    {cmdName === 'echo' ? 'echo [text]' : cmdName} - {cmdData.description}
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