import changelog from "../../../../src/CHANGELOG.md?raw";

export async function load() {
    return {
      changelog: changelog,
    };
  }