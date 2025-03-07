import { Skill } from "./Skill";

export function SkillsSection() {
  return (
    <div className="flex flex-wrap gap-2">
      <Skill icon="code">.NET Development</Skill>
      <Skill icon="cloud">Azure DevOps</Skill>
      <Skill icon="github">GitHub</Skill>
      <Skill icon="android">Android Development</Skill>
      <Skill icon="apple">iOS Development</Skill>
    </div>
  );
}
