'use client';

import { useState } from 'react';
import ProjectCard from '@/components/ui/ProjectCard';

interface ProjectsFilterProps {
  projects: any[];
}

export default function ProjectsFilter({ projects }: ProjectsFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const rawCategories = projects?.map((p: any) => String(p.category || '')).filter(Boolean) || [];
  const projectCategories: string[] = ['All', ...Array.from(new Set<string>(rawCategories))];

  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects?.filter((p: any) => p.category === selectedCategory);

  return (
    <div className="space-y-10">
      {/* Category Pills */}
      <div className="flex flex-wrap gap-2 justify-start">
        {projectCategories.map((cat: string) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            {cat === 'All' ? 'Semua Proyek' : cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProjects?.map((project: any) => (
          <ProjectCard
            key={project.id}
            title={project.title}
            category={project.category}
            description={project.description}
            metrics={project.metrics}
            techStack={project.techStack}
            githubLink={project.githubLink}
            demoLink={project.demoLink}
          />
        ))}
      </div>
    </div>
  );
}
