import React from "react";
import Image from "next/image";
import { EnvelopeIcon, MapPinIcon, BriefcaseIcon, CodeBracketIcon } from "@heroicons/react/24/outline";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SKILLS, BIO, EXPERIENCE } from "@/data/whoami";

const colorMap: Record<string, string> = {
    blue: "text-blue-400 hover:border-blue-500/50",
    green: "text-green-400 hover:border-green-500/50",
    purple: "text-purple-400 hover:border-purple-500/50",
    red: "text-red-400 hover:border-red-500/50",
    yellow: "text-yellow-400 hover:border-yellow-500/50",
};

export default function Whoami() {
    return (
        <main className="min-h-full bg-slate-950 px-4 py-8 md:px-8 md:py-12 text-slate-100 overflow-y-auto">
            <div className="w-full space-y-8 md:space-y-12">

                {/* Header Profile Section */}
                <section className="relative flex flex-col md:flex-row items-center md:items-start gap-8 bg-slate-900/50 p-8 rounded-3xl border border-slate-800 shadow-2xl backdrop-blur-xl transition-all hover:border-green-500/30">
                    <div className="relative shrink-0">
                        <div className="absolute inset-0 bg-gradient-to-tr from-green-500 to-emerald-400 rounded-full blur-xl opacity-20 animate-pulse"></div>
                        <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-slate-800 shadow-xl group">
                            <Image
                                src={BIO.image}
                                alt={BIO.name}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                    </div>

                    <div className="flex-1 space-y-4 text-center md:text-left">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-600">
                                {BIO.name}
                            </h1>
                            <p className="text-xl text-slate-400 font-medium mt-2">{BIO.position}</p>
                        </div>

                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-slate-400">
                            <span className="flex items-center gap-1.5 bg-slate-800/50 px-3 py-1.5 rounded-full border border-slate-700/50">
                                <MapPinIcon className="w-4 h-4 text-green-500" />
                                {BIO.location}
                            </span>
                            <span className="flex items-center gap-1.5 bg-slate-800/50 px-3 py-1.5 rounded-full border border-slate-700/50">
                                <BriefcaseIcon className="w-4 h-4 text-green-500" />
                                {BIO.position}
                            </span>
                        </div>

                        <p className="text-slate-300 leading-relaxed max-w-6xl mt-4">
                            {BIO.bio}
                        </p>

                        <div className="pt-2 flex gap-4 justify-center md:justify-start">
                            <a href={`mailto:${BIO.email}`} className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-green-500 text-slate-950 font-semibold hover:bg-green-400 transition-colors shadow-lg shadow-green-500/20">
                                <EnvelopeIcon className="w-5 h-5" />
                                Get in touch
                            </a>
                            <a href={BIO.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-800 text-slate-100 font-medium hover:bg-slate-700 transition-colors border border-slate-700">
                                <FaGithub className="w-5 h-5" />
                                GitHub
                            </a>
                            <a href={BIO.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-800 text-slate-100 font-medium hover:bg-slate-700 transition-colors border border-slate-700">
                                <FaLinkedin className="w-5 h-5" />
                                LinkedIn
                            </a>
                        </div>
                    </div>
                </section>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    {/* Skills Section */}
                    <section className="lg:col-span-2 bg-slate-900/40 p-8 rounded-3xl border border-slate-800 shadow-xl backdrop-blur-md">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-green-500/10 rounded-xl">
                                <CodeBracketIcon className="w-6 h-6 text-green-500" />
                            </div>
                            <h2 className="text-2xl font-semibold text-slate-100">
                                Technical Skills
                            </h2>
                        </div>

                        <div className="space-y-6">
                            {Object.entries(SKILLS).map(([category, data]) => {

                                const colorClasses = colorMap[data.config.color] || "text-slate-400 hover:border-slate-500/50";

                                return (
                                    <div key={category}>
                                        <h3 className="text-sm font-medium text-slate-400 mb-3 uppercase tracking-wider">
                                            {category}
                                        </h3>

                                        <div className="flex flex-wrap gap-2">
                                            {data.skills.map((skill) => (
                                                <span
                                                    key={skill}
                                                    className={`px-3 py-1 bg-slate-800/80 ${colorClasses} rounded-lg text-sm font-medium border border-slate-700/50 transition-colors cursor-default hover:scale-105 hover:-translate-y-0.5`}
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </section>


                    {/* Experience Snippet */}
                    <section className="lg:col-span-3 bg-slate-900/40 p-8 rounded-3xl border border-slate-800 shadow-xl backdrop-blur-md">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-green-500/10 rounded-xl">
                                <BriefcaseIcon className="w-6 h-6 text-green-500" />
                            </div>
                            <h2 className="text-2xl font-semibold text-slate-100">Experience Highlights</h2>
                        </div>

                        <div className="space-y-6 relative before:absolute before:inset-y-0 before:left-[11px] before:w-px before:bg-slate-800">
                            {EXPERIENCE.map((job, i) => (
                                <div key={i} className="relative pl-8">
                                    <div className="absolute left-0 top-1.5 w-[24px] h-[24px] bg-slate-950 rounded-full border-4 border-slate-800 flex items-center justify-center">
                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    </div>
                                    <h3 className="text-lg font-medium text-slate-200">{job.role}</h3>
                                    <div className="flex items-center gap-2 text-sm mt-1">
                                        <span className="text-green-400 font-medium">{job.company}</span>
                                        <span className="text-slate-600">•</span>
                                        <span className="text-slate-400">{job.location}</span>
                                        <span className="text-slate-600">•</span>
                                        <span className="text-slate-400">{job.startDate} - {job.endDate}</span>
                                    </div>
                                    <ul className="text-slate-400 text-sm mt-2 space-y-1">
                                        {job.description.map((desc, i) => (
                                            <li key={i} className="flex items-start gap-2">
                                                <div className="w-2 h-2 bg-slate-600 rounded-full mt-2"></div>
                                                <span>{desc}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}
