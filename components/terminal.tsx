"use client";
import React from "react";
import { useState, useEffect, useRef } from "react";
import { MinusIcon, ChevronDownIcon, ChevronUpIcon, ChevronLeftIcon, ChevronRightIcon, CommandLineIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import commands, { type Command } from "@/data/commands";

type TerminalMode = "docked-left" | "docked-right" | "docked-bottom" | "floating" | "minimized";
type ResizeDirection = "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw" | false;

export default function Terminal() {
    const [mode, setMode] = useState<TerminalMode>("docked-left");
    const [position, setPosition] = useState({ x: 50, y: 50 });
    const [size, setSize] = useState({ width: 400, height: 400 });
    const [isDragging, setIsDragging] = useState(false);
    const [resizeDir, setResizeDir] = useState<ResizeDirection>(false);
    const [isMobile, setIsMobile] = useState(false);

    const dragStart = useRef({ x: 0, y: 0, posX: 0, posY: 0 });
    const resizeStart = useRef({ width: 0, height: 0, x: 0, y: 0, posX: 0, posY: 0 });

    const [history, setHistory] = useState<{ id: number, command: string, output: React.ReactNode }[]>([]);
    const [commandHistory, setCommandHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [input, setInput] = useState("");
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    const router = useRouter();

    // Auto-scroll to bottom and auto-resize input
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
        if (inputRef.current) {
            inputRef.current.style.height = 'auto';
            inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
        }
    }, [history, input]);

    const handleCommand = (cmd: string) => {
        const trimmed = cmd.trim();
        if (!trimmed) return;

        const args = trimmed.split(" ");

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { name, description, output, navigate }: Command = commands(args);


        if (args[0] === "clear") {
            setHistory([]);
            return;
        }

        if (navigate) {
            router.push(navigate);
        }

        setHistory(prev => [...prev, { id: Date.now(), command: trimmed, output: output() }]);
        setCommandHistory(prev => [...prev, trimmed]);
        setHistoryIndex(-1);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleCommand(input);
            setInput("");
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            if (commandHistory.length > 0) {
                const nextIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
                setHistoryIndex(nextIndex);
                setInput(commandHistory[nextIndex]);
            }
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            if (historyIndex !== -1) {
                const nextIndex = historyIndex + 1;
                if (nextIndex >= commandHistory.length) {
                    setHistoryIndex(-1);
                    setInput("");
                } else {
                    setHistoryIndex(nextIndex);
                    setInput(commandHistory[nextIndex]);
                }
            }
        }
    };

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
            if (mobile) {
                setMode((prev) => (prev === "docked-left" || prev === "docked-right" ? "docked-bottom" : prev));
            }
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Dragging Logic
    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        if (e.button !== 0) return;
        setIsDragging(true);
        dragStart.current = {
            x: e.clientX,
            y: e.clientY,
            posX: position.x,
            posY: position.y,
        };

        if (mode !== "floating") {
            const rect = e.currentTarget.getBoundingClientRect();
            const newPosX = e.clientX - rect.width / 2;
            const newPosY = e.clientY - 16;
            setPosition({ x: Math.max(0, newPosX), y: Math.max(0, newPosY) });
            dragStart.current.posX = newPosX;
            dragStart.current.posY = newPosY;
            setMode("floating");
        }
        e.currentTarget.setPointerCapture(e.pointerId);
    };

    const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        if (!isDragging) return;
        const dx = e.clientX - dragStart.current.x;
        const dy = e.clientY - dragStart.current.y;
        setPosition({
            x: dragStart.current.posX + dx,
            y: dragStart.current.posY + dy,
        });
    };

    const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
        setIsDragging(false);
        e.currentTarget.releasePointerCapture(e.pointerId);
    };

    // Resizing Logic
    const handleResizeDown = (e: React.PointerEvent<HTMLDivElement>, dir: ResizeDirection) => {
        e.stopPropagation();
        if (e.button !== 0) return;
        setResizeDir(dir);
        resizeStart.current = {
            width: size.width,
            height: size.height,
            x: e.clientX,
            y: e.clientY,
            posX: position.x,
            posY: position.y,
        };
        e.currentTarget.setPointerCapture(e.pointerId);
    };

    const handleResizeMove = (e: React.PointerEvent<HTMLDivElement>) => {
        if (!resizeDir) return;
        e.stopPropagation();
        const dx = e.clientX - resizeStart.current.x;
        const dy = e.clientY - resizeStart.current.y;

        let newWidth = resizeStart.current.width;
        let newHeight = resizeStart.current.height;
        let newPosX = resizeStart.current.posX;
        let newPosY = resizeStart.current.posY;

        if (resizeDir.includes('e')) {
            newWidth = Math.max(250, resizeStart.current.width + dx);
        }
        if (resizeDir.includes('w')) {
            const proposedWidth = resizeStart.current.width - dx;
            if (proposedWidth >= 250) {
                newWidth = proposedWidth;
                newPosX = resizeStart.current.posX + dx;
            } else {
                newWidth = 250;
                newPosX = resizeStart.current.posX + (resizeStart.current.width - 250);
            }
        }
        if (resizeDir.includes('s')) {
            newHeight = Math.max(150, resizeStart.current.height + dy);
        }
        if (resizeDir.includes('n')) {
            const proposedHeight = resizeStart.current.height - dy;
            if (proposedHeight >= 150) {
                newHeight = proposedHeight;
                newPosY = resizeStart.current.posY + dy;
            } else {
                newHeight = 150;
                newPosY = resizeStart.current.posY + (resizeStart.current.height - 150);
            }
        }

        setSize({ width: newWidth, height: newHeight });
        setPosition({ x: newPosX, y: newPosY });
    };

    const handleResizeUp = (e: React.PointerEvent<HTMLDivElement>) => {
        if (resizeDir) {
            setResizeDir(false);
            e.currentTarget.releasePointerCapture(e.pointerId);
        }
    };

    const renderResizer = (dir: ResizeDirection, className: string) => (
        <div
            className={`absolute z-50 ${className}`}
            onPointerDown={(e) => handleResizeDown(e, dir)}
            onPointerMove={handleResizeMove}
            onPointerUp={handleResizeUp}
            onPointerCancel={handleResizeUp}
        />
    );

    if (mode === "minimized") {
        return (
            <div className="fixed bottom-4 left-4 z-50 flex gap-2">
                <button
                    onClick={() => setMode("floating")}
                    className="p-3 bg-neutral-900 border border-green-800 rounded-full text-green-500 hover:bg-neutral-800 transition-colors shadow-lg"
                    title="Restore Terminal"
                >
                    <CommandLineIcon className="w-6 h-6" />
                </button>
                <div className="flex bg-neutral-900 border border-green-800 rounded-full overflow-hidden shadow-lg">
                    <button
                        onClick={() => setMode("docked-left")}
                        className="px-3 py-2 text-green-500 hover:bg-neutral-800 transition-colors border-r border-green-800"
                        title="Dock Left"
                    >
                        <ChevronUpIcon className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => setMode("docked-right")}
                        className="px-3 py-2 text-green-500 hover:bg-neutral-800 transition-colors"
                        title="Dock Right"
                    >
                        <ChevronDownIcon className="w-5 h-5" />
                    </button>
                </div>
            </div>
        );
    }

    // Determine container styles based on mode
    let containerClass = "bg-black text-green-500 flex flex-col shadow-2xl border-green-800 ";
    if (!isDragging && !resizeDir) {
        containerClass += "transition-all duration-300 ease-in-out ";
    }

    let style: React.CSSProperties = {};

    if (mode === "docked-left") {
        containerClass += " h-[300px] md:h-full border-b md:border-b-0 md:border-r order-first z-10 relative";
        style.width = isMobile ? "100%" : `${size.width}px`;
    } else if (mode === "docked-right") {
        containerClass += " h-[300px] md:h-full border-t md:border-t-0 md:border-l order-last z-10 relative";
        style.width = isMobile ? "100%" : `${size.width}px`;
    } else if (mode === "docked-bottom") {
        containerClass += " w-full border-t order-last z-10 relative";
        style.height = `${size.height}px`;
    } else if (mode === "floating") {
        containerClass += " fixed rounded-lg border z-50 opacity-95";
        style = {
            left: `${position.x}px`,
            top: `${position.y}px`,
            width: `${size.width}px`,
            height: `${size.height}px`,
            touchAction: "none"
        };
    }

    return (
        <div className={containerClass} style={style}>
            {/* Resizers */}
            {!isMobile && mode === "docked-left" && renderResizer("e", "top-0 -right-1 w-2 h-full cursor-col-resize")}
            {!isMobile && mode === "docked-right" && renderResizer("w", "top-0 -left-1 w-2 h-full cursor-col-resize")}
            {mode === "docked-bottom" && renderResizer("n", "-top-1 left-0 w-full h-2 cursor-row-resize")}
            {mode === "floating" && (
                <>
                    {/* Edges */}
                    {renderResizer("n", "-top-1 left-0 w-full h-2 cursor-row-resize")}
                    {renderResizer("s", "-bottom-1 left-0 w-full h-2 cursor-row-resize")}
                    {renderResizer("e", "top-0 -right-1 w-2 h-full cursor-col-resize")}
                    {renderResizer("w", "top-0 -left-1 w-2 h-full cursor-col-resize")}
                    {/* Corners */}
                    {renderResizer("nw", "-top-2 -left-2 w-4 h-4 cursor-nwse-resize")}
                    {renderResizer("ne", "-top-2 -right-2 w-4 h-4 cursor-nesw-resize")}
                    {renderResizer("sw", "-bottom-2 -left-2 w-4 h-4 cursor-nesw-resize")}
                    {renderResizer("se", "-bottom-2 -right-2 w-4 h-4 cursor-nwse-resize")}
                </>
            )}

            {/* Header (Draggable) */}
            <div
                className="flex items-center justify-between px-3 py-2 bg-neutral-900 border-b border-green-800 cursor-move select-none"
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
            >
                <div className="flex items-center gap-2">
                    <CommandLineIcon className="w-4 h-4 text-green-600" />
                    <span className="text-xs font-mono text-green-600 font-bold">terminal ~ bash</span>
                </div>
                <div className="flex items-center gap-1" onPointerDown={(e) => e.stopPropagation()}>
                    <button onClick={() => setMode("docked-left")} className="p-1 hover:bg-neutral-800 rounded text-green-600" title="Dock Left">
                        <ChevronLeftIcon className="w-4 h-4" />
                    </button>
                    <button onClick={() => setMode("docked-right")} className="p-1 hover:bg-neutral-800 rounded text-green-600" title="Dock Right">
                        <ChevronRightIcon className="w-4 h-4" />
                    </button>
                    <button onClick={() => setMode("minimized")} className="p-1 hover:bg-neutral-800 rounded text-green-600 ml-2" title="Minimize">
                        <MinusIcon className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Content */}
            <div
                className="flex-1 p-4 font-mono text-sm overflow-auto cursor-text"
                ref={scrollRef}
                onClick={() => inputRef.current?.focus()}
            >
                <div className="mb-4 text-green-600">
                    <p>Welcome to portfolioOS v1.0.0</p>
                    <p>Type &quot;help&quot; to see available commands.</p>
                </div>

                {history.map((entry) => (
                    <div key={entry.id} className="mb-2">
                        <div className="flex flex-wrap">
                            <span className="text-blue-400 mr-2 shrink-0">caineirb@portfolio:~</span>
                            <span className="break-all">$ {entry.command}</span>
                        </div>
                        <div className="mt-1 text-gray-300 whitespace-pre-wrap break-all">
                            {entry.output}
                        </div>
                    </div>
                ))}

                <div className="flex items-start">
                    <span className="text-blue-400 mr-2 shrink-0 mt-[1px]">caineirb@portfolio:~</span>
                    <span className="shrink-0 mr-1 mt-[1px]">$ </span>
                    <textarea
                        ref={inputRef}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="flex-1 bg-transparent border-none outline-none text-green-500 min-w-0 p-0 focus:ring-0 resize-none overflow-hidden block break-all"
                        rows={1}
                        autoFocus
                        spellCheck={false}
                        autoComplete="off"
                    />
                </div>
            </div>
        </div>
    );
}
