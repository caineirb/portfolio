"use client";

import React, { useState, useEffect } from "react";
import {
  CommandLineIcon,
  ClipboardDocumentIcon,
  CheckIcon,
  PlayIcon,
  ArrowPathIcon,
  CodeBracketIcon,
  ServerIcon,
} from "@heroicons/react/24/outline";

export default function BackendCodeWindow() {
  const [activeTab, setActiveTab] = useState<"curl" | "response" | "backend">("curl");
  const [activeFilter, setActiveFilter] = useState<string>("default");
  const [host, setHost] = useState<string>("caineirb.qzz.io");
  const [copied, setCopied] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [responseStatus, setResponseStatus] = useState<string>("200 OK");
  const [responseLatency, setResponseLatency] = useState<string>("1.8ms");
  const [responseData, setResponseData] = useState<string>("");

  // Determine host dynamically on client
  useEffect(() => {
    if (typeof window !== "undefined") {
      setHost(window.location.origin);
    }
  }, []);

  // Compute endpoint based on active filter
  const getEndpoint = (filter: string) => {
    switch (filter) {
      case "stack":
        return "/api/engineer?filter=stack";
      case "projects":
        return "/api/engineer?filter=projects";
      case "text":
        return "/api/engineer?format=text";
      default:
        return "/api/engineer";
    }
  };

  const currentEndpoint = getEndpoint(activeFilter);
  const currentCurlCommand = `curl -s "${host}${currentEndpoint}"`;

  // Fetch actual data from backend
  const executeCurl = async (filter = activeFilter) => {
    setIsLoading(true);
    const start = performance.now();
    try {
      const endpoint = getEndpoint(filter);
      const res = await fetch(endpoint);
      const duration = (performance.now() - start).toFixed(1);
      setResponseLatency(`${duration}ms`);
      setResponseStatus(`${res.status} ${res.statusText || "OK"}`);

      if (filter === "text") {
        const text = await res.text();
        setResponseData(text);
      } else {
        const json = await res.json();
        setResponseData(JSON.stringify(json, null, 2));
      }
    } catch (err) {
      setResponseStatus("500 Error");
      setResponseData(JSON.stringify({ error: "Failed to connect to API", detail: String(err) }, null, 2));
    } finally {
      setIsLoading(false);
    }
  };

  // Initial fetch on mount to have live response ready
  useEffect(() => {
    executeCurl("default");
  }, []);

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    executeCurl(filter);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(currentCurlCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full rounded-2xl bg-slate-950/95 border border-slate-800 shadow-2xl backdrop-blur-2xl overflow-hidden transition-all duration-300 hover:border-green-500/40 font-mono text-xs">
      {/* Top Window Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 bg-slate-900/90 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          {/* Unix Window Control Dots */}
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
          </div>

          {/* Mode Tabs */}
          <div className="flex items-center gap-1 ml-2">
            <button
              type="button"
              onClick={() => setActiveTab("curl")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-[11px] transition-colors ${activeTab === "curl"
                ? "bg-slate-950 text-green-400 font-semibold border border-slate-700/80"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                }`}
            >
              <CommandLineIcon className="w-3.5 h-3.5" />
              curl_request.sh
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("response")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-[11px] transition-colors ${activeTab === "response"
                ? "bg-slate-950 text-cyan-400 font-semibold border border-slate-700/80"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                }`}
            >
              <ServerIcon className="w-3.5 h-3.5" />
              response.json
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse ml-0.5" />
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("backend")}
              className={`hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-md text-[11px] transition-colors ${activeTab === "backend"
                ? "bg-slate-950 text-purple-400 font-semibold border border-slate-700/80"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                }`}
            >
              <CodeBracketIcon className="w-3.5 h-3.5" />
              route.ts
            </button>
          </div>
        </div>

        {/* Action Buttons: Execute & Copy */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => executeCurl(activeFilter)}
            disabled={isLoading}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-green-500/10 border border-green-500/30 text-green-400 hover:bg-green-500/20 hover:border-green-500/60 transition-colors text-[10px] font-semibold"
            title="Execute live cURL in browser"
          >
            {isLoading ? (
              <ArrowPathIcon className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <PlayIcon className="w-3.5 h-3.5 fill-current" />
            )}
            <span>Run cURL</span>
          </button>

          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800/70 border border-slate-700/60 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors text-[10px]"
            title="Copy command to clipboard"
          >
            {copied ? (
              <>
                <CheckIcon className="w-3.5 h-3.5 text-green-400" />
                <span className="text-green-400">Copied</span>
              </>
            ) : (
              <>
                <ClipboardDocumentIcon className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Query Filter Pills */}
      <div className="flex flex-wrap items-center gap-1.5 px-4 py-2 bg-slate-950/90 border-b border-slate-800/60 text-[10px] text-slate-400">
        <span className="text-slate-500 mr-1">Endpoints:</span>
        {[
          { id: "default", label: "GET /api/engineer (Full)" },
          { id: "stack", label: "?filter=stack" },
          { id: "projects", label: "?filter=projects" },
          { id: "text", label: "?format=text (CLI)" },
        ].map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => handleFilterChange(f.id)}
            className={`px-2.5 py-0.5 rounded-full transition-all ${activeFilter === f.id
              ? "bg-green-500/20 text-green-300 border border-green-500/40 font-semibold"
              : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
              }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Main Terminal / Code Content */}
      <div className="p-4 md:p-5 overflow-x-auto custom-scrollbar max-h-[350px] md:max-h-[370px] bg-slate-950 leading-relaxed font-mono">
        {activeTab === "curl" && (
          <div className="space-y-4">
            {/* cURL Command Block */}
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/90 space-y-2">
              <div className="text-[10px] uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                Run in your local terminal:
              </div>
              <div className="flex items-center gap-2 text-slate-200 text-xs md:text-sm select-all min-w-0">
                <span className="text-green-400 select-none shrink-0">$</span>
                <span className="text-cyan-300 font-bold break-all">{currentCurlCommand}</span>
              </div>
            </div>

            {/* Live Terminal Output Preview */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[11px] text-slate-500 pb-1 border-b border-slate-900">
                <span className="flex items-center gap-2">
                  <span className="text-green-400 font-bold">STATUS: {responseStatus}</span>
                  <span>•</span>
                  <span>LATENCY: {responseLatency}</span>
                </span>
                <span className="text-slate-600">application/json</span>
              </div>

              <pre className="text-slate-300 text-[11px] overflow-x-auto custom-scrollbar pt-2 max-h-[220px]">
                {isLoading ? (
                  <div className="py-8 text-center text-slate-500 animate-pulse flex items-center justify-center gap-2">
                    <ArrowPathIcon className="w-4 h-4 animate-spin text-green-400" />
                    Executing request against {currentEndpoint}...
                  </div>
                ) : (
                  <code>{responseData.slice(0, 1800)}{responseData.length > 1800 ? "\n\n... [truncated, run curl for full payload]" : ""}</code>
                )}
              </pre>
            </div>
          </div>
        )}

        {activeTab === "response" && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-[11px] text-slate-400 pb-1 border-b border-slate-800">
              <span className="text-green-400 font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                HTTP/1.1 {responseStatus}
              </span>
              <span>Round-Trip: {responseLatency}</span>
            </div>
            <pre className="text-emerald-400 text-[11px] overflow-x-auto custom-scrollbar">
              <code>{responseData}</code>
            </pre>
          </div>
        )}

        {activeTab === "backend" && (
          <div className="space-y-2 text-slate-300 text-[11px]">
            <div className="text-[10px] text-slate-500 uppercase tracking-wider pb-1 border-b border-slate-900">
              Next.js App Router API Route — app/api/engineer/route.ts
            </div>
            <pre className="text-slate-300 leading-relaxed overflow-x-auto custom-scrollbar">
              <code>{`import { NextRequest, NextResponse } from "next/server";
import { BIO, EXPERIENCE, SKILLS } from "@/data/whoami";
import { PROJECTS } from "@/data/projects";

// GET /api/engineer
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const filter = searchParams.get("filter");

  return NextResponse.json({
    status: 200,
    service: "caineirb-backend-core",
    profile: {
      name: BIO.name,
      role: "Backend & Machine Learning Engineer",
      academics: "MSU-IIT Magna Cum Laude • DOST-SEI Scholar",
      contact: { email: BIO.email, github: BIO.github }
    },
    specializations: [
      "High-Concurrency Backend Microservices",
      "Real-Time Computer Vision (YOLO, ReID)",
      "Distributed Caching & Queues (Redis, PostgreSQL)"
    ],
    technical_stack: SKILLS,
    telemetry: { throughput: "15,000 req/s", latency: "3.2ms" }
  }, {
    headers: {
      "X-Powered-By": "FastAPI / Next.js Async Engine",
      "Access-Control-Allow-Origin": "*"
    }
  });
}`}</code>
            </pre>
          </div>
        )}
      </div>

      {/* Code Editor Status Bar */}
      <div className="flex flex-wrap items-center justify-between px-4 py-2 bg-slate-900/90 border-t border-slate-800/80 text-[10px] text-slate-400 gap-2">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-green-400 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping" />
            BACKEND API READY
          </span>
          <span className="hidden sm:inline-block text-slate-600">|</span>
          <span className="hidden sm:inline-block text-slate-400">
            Endpoint: {currentEndpoint}
          </span>
        </div>
        <div className="flex items-center gap-3 text-slate-400">
          <span>Latency: <strong className="text-green-400">{responseLatency}</strong></span>
          <span className="text-slate-300 font-mono">Status: <strong className="text-green-400">{responseStatus}</strong></span>
        </div>
      </div>
    </div>
  );
}
