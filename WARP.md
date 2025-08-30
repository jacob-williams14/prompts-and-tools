# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Repository Overview

This repository contains professional development artifacts and prompt engineering tools for generating high-quality project summaries and professional biographies. It serves as a knowledge management system for technical professionals to document their project experiences and create compelling career narratives.

## Common Commands

### Repository Navigation
```bash
# View repository structure
find . -type f -name "*.md" | head -20

# List original data artifacts
ls -la project-experience-artifacts/original-artifacts/

# View generated summaries
ls -la project-experience-artifacts/project-experience-summaries/

# Check professional bios
ls -la project-experience-artifacts/professional-bios/
```

### Content Analysis
```bash
# Search for specific technologies or skills across summaries
grep -r "React Native\|TypeScript\|GraphQL" project-experience-artifacts/project-experience-summaries/

# Find project summaries by developer name
grep -l "Jacob Williams" project-experience-artifacts/project-experience-summaries/*.md

# Search for specific project types
grep -r "mobile app\|microservices\|API" project-experience-artifacts/project-experience-summaries/
```

### File Management
```bash
# Create new project summary (template)
cp project-experience-artifacts/project-experience-summaries/biggby-mobile-app-project-summary.md project-experience-artifacts/project-experience-summaries/new-project-summary.md

# Archive old versions
mv project-experience-artifacts/professional-bios/v*.md project-experience-artifacts/archive/
```

## Architecture and Structure

### Core Components

**Original Artifacts Directory** (`project-experience-artifacts/original-artifacts/`)
- Contains raw data sources: CSV backlogs, git logs, and other project artifacts
- Files include: `JIS_backlog.csv`, `biggby_backlog.csv`, `root_compass_git_log.txt`, `root_leading_change_git_log.txt`
- These are source materials for analysis and summary generation

**Prompt Engineering System** (`project-experience-artifacts/prompts/`)
- `artifact-analysis-prompt.md`: Comprehensive framework for analyzing project artifacts and generating technical summaries
- `professional_bio_generation_prompt.md`: Template for creating professional biographies from project summaries
- `quick-start-guide.md`: User guide for prompt usage and parameterization

**Generated Outputs**
- `project-experience-summaries/`: Detailed technical project summaries with consistent formatting
- `professional-bios/`: Professional biographies derived from project summaries
- `example-usage/`: Usage examples and parameter templates

**Supporting Materials**
- `strengths-finder/`: StrengthsFinder assessment results for personality/skill context
- `archive/`: Historical versions of documents

### Document Structure Standards

**Project Summaries Follow Strict Format:**
```markdown
# [Project Name] Project Summary

**Developer:** [Name]
**Project Duration:** [Dates]
**Role:** [Position]
**Technology Stack:** [Technologies]

## Project Overview
## Technical Architecture & Infrastructure
## Feature Development & Engineering
## Technical Leadership & Problem-Solving
## Quality Assurance & Process Improvements
## Skills Demonstrated
## Project Impact
```

**Professional Biographies Structure:**
- 300-500 word professional narratives
- Third-person perspective
- Emphasis on technical leadership and collaboration
- Suitable for client-facing contexts

### Key Workflows

**Artifact Analysis Workflow:**
1. Place raw project data in `original-artifacts/`
2. Use parameterized prompts from `prompts/artifact-analysis-prompt.md`
3. Generate structured summaries in `project-experience-summaries/`
4. Maintain consistent formatting across all outputs

**Biography Generation Workflow:**
1. Compile multiple project summaries
2. Apply `professional_bio_generation_prompt.md` template
3. Output professional biographies to `professional-bios/`
4. Version control multiple iterations

**Parameterization System:**
- Define parameters once at prompt beginning
- Reuse across multiple analyses
- Support team member customization
- Reduce errors and inconsistencies

### Content Quality Standards

**Technical Depth Requirements:**
- Include specific technology names and frameworks
- Document architectural decisions with rationale
- Use industry-standard terminology
- Balance technical detail with accessibility

**Professional Tone Guidelines:**
- Action-oriented language emphasizing competence
- Evidence-based accomplishments
- Structured for easy scanning
- Focus on outcomes and measurable impact

**Consistency Requirements:**
- Exact formatting across all summaries
- Hierarchical structure with standardized headers
- Bold key technologies and concepts
- Consistent bullet point formatting

## Development Notes

**No Build System Required:**
- Repository consists entirely of markdown documentation and text artifacts
- No compilation, testing, or deployment processes
- Version control through git only

**Collaborative Usage:**
- Templates support multiple team members
- Parameterized prompts enable personalization
- Consistent structure facilitates team adoption
- Example usage guides reduce onboarding friction

**Content Management:**
- Archive old versions rather than overwriting
- Maintain original artifacts as source of truth
- Version professional biographies for different contexts
- Use descriptive file naming conventions

**AI Integration Context:**
- Prompts designed for Claude/GPT analysis
- Structured for consistent LLM output formatting
- Parameterization reduces prompt engineering overhead
- Templates optimized for professional content generation

This repository represents a systematic approach to technical career documentation, providing reusable frameworks for extracting value from project artifacts and creating compelling professional narratives.
