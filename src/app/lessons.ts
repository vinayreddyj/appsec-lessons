// src/app/lessons.ts
// Central data model for all 20 AppSec curriculum lessons

export interface Lesson {
  num: number;
  title: string;
  file: string;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
}

export interface Module {
  id: string;
  name: string;
  icon: string;
  lessons: Lesson[];
}

export const MODULES: Module[] = [
  {
    id: 'foundations',
    name: 'Module 1 — Foundations',
    icon: '🏗️',
    lessons: [
      {
        num: 1,
        title: 'OWASP Top 10 2021',
        file: 'appsec_lesson1_owasp.html',
        duration: '45 min',
        level: 'beginner',
        tags: ['owasp', 'vulnerabilities', 'injection', 'xss'],
      },
      {
        num: 2,
        title: 'Secure SDLC',
        file: 'appsec_lesson2_secure_sdlc.html',
        duration: '50 min',
        level: 'beginner',
        tags: ['sdlc', 'process', 'shift-left', 'design'],
      },
      {
        num: 3,
        title: 'Threat Modeling',
        file: 'appsec_lesson3_threat_modeling.html',
        duration: '60 min',
        level: 'intermediate',
        tags: ['stride', 'dread', 'data-flow', 'attack-tree'],
      },
    ],
  },
  {
    id: 'testing-tools',
    name: 'Module 2 — Testing Tools',
    icon: '🔬',
    lessons: [
      {
        num: 4,
        title: 'SAST',
        file: 'appsec_lesson4_sast.html',
        duration: '55 min',
        level: 'intermediate',
        tags: ['static-analysis', 'semgrep', 'sonarqube', 'codeql'],
      },
      {
        num: 5,
        title: 'DAST',
        file: 'appsec_lesson5_dast.html',
        duration: '55 min',
        level: 'intermediate',
        tags: ['dynamic-testing', 'zap', 'burp', 'fuzzing'],
      },
      {
        num: 6,
        title: 'SCA',
        file: 'appsec_lesson6_sca.html',
        duration: '50 min',
        level: 'intermediate',
        tags: ['open-source', 'cve', 'snyk', 'license'],
      },
      {
        num: 7,
        title: 'IAST & RASP',
        file: 'appsec_lesson7_iast_rasp.html',
        duration: '45 min',
        level: 'intermediate',
        tags: ['instrumentation', 'runtime', 'agent', 'iast'],
      },
    ],
  },
  {
    id: 'api-security',
    name: 'Module 3 — API Security',
    icon: '🔌',
    lessons: [
      {
        num: 8,
        title: 'OWASP API Top 10',
        file: 'appsec_lesson8_owasp_api_top10.html',
        duration: '60 min',
        level: 'intermediate',
        tags: ['api', 'owasp', 'bola', 'broken-auth'],
      },
      {
        num: 9,
        title: 'API Security Testing',
        file: 'appsec_lesson9_api_security_testing.html',
        duration: '65 min',
        level: 'intermediate',
        tags: ['postman', 'openapi', 'fuzzing', 'jwt'],
      },
      {
        num: 10,
        title: 'GraphQL Security',
        file: 'appsec_lesson10_graphql_security.html',
        duration: '55 min',
        level: 'advanced',
        tags: ['graphql', 'introspection', 'dos', 'injection'],
      },
    ],
  },
  {
    id: 'devsecops',
    name: 'Module 4 — DevSecOps',
    icon: '⚙️',
    lessons: [
      {
        num: 11,
        title: 'DevSecOps Pipeline',
        file: 'appsec_lesson11_devsecops_pipeline.html',
        duration: '60 min',
        level: 'intermediate',
        tags: ['ci-cd', 'github-actions', 'pipeline', 'automation'],
      },
      {
        num: 12,
        title: 'Secrets Management',
        file: 'appsec_lesson12_secrets_management.html',
        duration: '50 min',
        level: 'intermediate',
        tags: ['vault', 'secrets', 'rotation', 'env-vars'],
      },
      {
        num: 13,
        title: 'Container Security',
        file: 'appsec_lesson13_container_security.html',
        duration: '55 min',
        level: 'intermediate',
        tags: ['docker', 'kubernetes', 'trivy', 'oci'],
      },
      {
        num: 14,
        title: 'Dependency Scanning',
        file: 'appsec_lesson14_dependency_scanning.html',
        duration: '50 min',
        level: 'intermediate',
        tags: ['npm-audit', 'dependabot', 'cve', 'snyk'],
      },
      {
        num: 15,
        title: 'SBOM',
        file: 'appsec_lesson15_sbom.html',
        duration: '45 min',
        level: 'advanced',
        tags: ['sbom', 'cyclonedx', 'spdx', 'supply-chain'],
      },
    ],
  },
  {
    id: 'architecture',
    name: 'Module 5 — Architecture & Runtime',
    icon: '🏛️',
    lessons: [
      {
        num: 16,
        title: 'Security Architecture',
        file: 'appsec_lesson16_security_architecture.html',
        duration: '65 min',
        level: 'advanced',
        tags: ['zero-trust', 'defense-in-depth', 'design-patterns'],
      },
      {
        num: 17,
        title: 'Supply Chain Security',
        file: 'appsec_lesson17_supply_chain_security.html',
        duration: '60 min',
        level: 'advanced',
        tags: ['slsa', 'sigstore', 'provenance', 'attestation'],
      },
      {
        num: 18,
        title: 'WAF',
        file: 'appsec_lesson18_waf.html',
        duration: '45 min',
        level: 'intermediate',
        tags: ['waf', 'modsecurity', 'rules', 'bypass'],
      },
      {
        num: 19,
        title: 'Code Review',
        file: 'appsec_lesson19_code_review.html',
        duration: '50 min',
        level: 'advanced',
        tags: ['manual-review', 'checklist', 'patterns', 'pr'],
      },
      {
        num: 20,
        title: 'RASP',
        file: 'appsec_lesson20_rasp.html',
        duration: '45 min',
        level: 'advanced',
        tags: ['runtime', 'self-protection', 'agent', 'blocking'],
      },
    ],
  },
];

// Flat list of all lessons for easy lookup
export const ALL_LESSONS: Lesson[] = MODULES.flatMap((m) => m.lessons);

export function getLessonByNum(num: number): Lesson | undefined {
  return ALL_LESSONS.find((l) => l.num === num);
}

export function getModuleForLesson(num: number): Module | undefined {
  return MODULES.find((m) => m.lessons.some((l) => l.num === num));
}

export function getPrevLesson(num: number): Lesson | undefined {
  const idx = ALL_LESSONS.findIndex((l) => l.num === num);
  return idx > 0 ? ALL_LESSONS[idx - 1] : undefined;
}

export function getNextLesson(num: number): Lesson | undefined {
  const idx = ALL_LESSONS.findIndex((l) => l.num === num);
  return idx >= 0 && idx < ALL_LESSONS.length - 1
    ? ALL_LESSONS[idx + 1]
    : undefined;
}
