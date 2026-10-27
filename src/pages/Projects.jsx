import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { projects } from '../data/projects';
import { useProgress } from '../context/ProgressContext';

export default function Projects() {
  const [selectedDifficulty, setSelectedDifficulty] = useState('ALL');
  const { getProjectProgress } = useProgress();

  const difficulties = ['ALL', 'Beginner', 'Basic Application', 'Intermediate', 'Advanced', 'Project-Level'];

  const filteredProjects = projects.filter((proj) => {
    if (selectedDifficulty !== 'ALL' && proj.difficulty !== selectedDifficulty) return false;
    return true;
  });

  // Calculate overall project stats
  let totalMilestonesCount = 0;
  let completedMilestonesCount = 0;
  let completedProjectsCount = 0;

  projects.forEach((proj) => {
    const prog = getProjectProgress(proj.id, proj.milestones?.length || 0);
    totalMilestonesCount += prog.total;
    completedMilestonesCount += prog.completed;
    if (prog.percent === 100) {
      completedProjectsCount += 1;
    }
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-violet-900 via-indigo-900 to-slate-900 rounded-3xl p-8 sm:p-12 text-white mb-10 shadow-xl border border-indigo-500/20">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-violet-500/20 text-violet-300 border border-violet-500/30 mb-4">
            🚀 10-Tier Project-Based Learning Path
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Build Real-World Applications
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed">
            Move beyond syntax drills into complete software development. Build 10 production-grade projects starting from semantic HTML/CSS pages up to a multi-tier municipal grievance capstone.
          </p>
        </div>

        {/* Milestone & Project Progress Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-slate-700/60">
          <div className="bg-slate-800/60 rounded-xl p-4 border border-slate-700">
            <span className="text-xs text-slate-400 block mb-1">Total Projects</span>
            <span className="text-2xl font-black text-white">{projects.length}</span>
          </div>
          <div className="bg-slate-800/60 rounded-xl p-4 border border-slate-700">
            <span className="text-xs text-slate-400 block mb-1">Completed Projects</span>
            <span className="text-2xl font-black text-emerald-400">{completedProjectsCount}</span>
          </div>
          <div className="bg-slate-800/60 rounded-xl p-4 border border-slate-700">
            <span className="text-xs text-slate-400 block mb-1">Milestones Checked</span>
            <span className="text-2xl font-black text-indigo-400">{completedMilestonesCount} / {totalMilestonesCount}</span>
          </div>
          <div className="bg-slate-800/60 rounded-xl p-4 border border-slate-700">
            <span className="text-xs text-slate-400 block mb-1">Overall Progress</span>
            <span className="text-2xl font-black text-amber-400">
              {totalMilestonesCount > 0 ? Math.round((completedMilestonesCount / totalMilestonesCount) * 100) : 0}%
            </span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-8">
        <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mr-2">
          Difficulty:
        </span>
        {difficulties.map((diff) => (
          <button
            key={diff}
            onClick={() => setSelectedDifficulty(diff)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              selectedDifficulty === diff
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-700'
            }`}
          >
            {diff}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {filteredProjects.map((project) => {
          const prog = getProjectProgress(project.id, project.milestones?.length || 0);
          const isDone = prog.percent === 100;

          return (
            <div
              key={project.id}
              className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700/80 p-6 flex flex-col justify-between hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 group"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-3">
                  <span className="text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded-md bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200/50 dark:border-indigo-800/50">
                    Tier {project.tier}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      project.difficulty === 'Beginner' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' :
                      project.difficulty === 'Basic Application' ? 'bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300' :
                      project.difficulty === 'Intermediate' ? 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300' :
                      project.difficulty === 'Advanced' ? 'bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300' :
                      'bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                    }`}>
                      {project.difficulty}
                    </span>
                    {isDone && (
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200">
                        ✓ Done
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                  {project.subtitle}
                </p>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.skills.slice(0, 4).map((skill, i) => (
                    <span
                      key={i}
                      className="text-xs px-2.5 py-1 rounded-md bg-gray-100 dark:bg-gray-700/70 text-gray-700 dark:text-gray-300 font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                  {project.skills.length > 4 && (
                    <span className="text-xs px-2 py-1 rounded-md bg-gray-50 dark:bg-gray-800 text-gray-400 font-medium">
                      +{project.skills.length - 4} more
                    </span>
                  )}
                </div>
              </div>

              {/* Progress Bar & CTA */}
              <div className="pt-4 border-t border-gray-100 dark:border-gray-700/60">
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-2 font-medium">
                  <span>Milestones: {prog.completed} / {prog.total}</span>
                  <span>{prog.percent}%</span>
                </div>
                <div className="w-full bg-gray-100 dark:bg-gray-700 h-2 rounded-full overflow-hidden mb-4">
                  <div
                    className={`h-full transition-all duration-300 ${
                      prog.percent === 100 ? 'bg-emerald-500' : 'bg-indigo-600'
                    }`}
                    style={{ width: `${prog.percent}%` }}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Est. Time: <strong className="text-gray-700 dark:text-gray-300">{project.estimatedHours} hrs</strong>
                  </span>
                  <Link
                    to={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition-colors shadow-sm"
                  >
                    {prog.completed > 0 ? 'Continue Project' : 'Start Project'} →
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
