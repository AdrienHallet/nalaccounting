import { marked } from "marked";

export interface ChangelogEntry {
    date: Date,
    title: string,
    content?: string
}

const changelogs = new Array<ChangelogEntry>();

export default (raw: string) => {
    if (changelogs.length > 0) {
        return changelogs;
    }
    const separator = "\n";
    const lines = raw.split(separator);
    let active = "";
    lines.forEach(line => {
        if (changelogs.length < 1 && !line.startsWith("## ")) {
            // Skip all lines until we have a release
            return;
        }
        if (line.trim().length < 1) {
            // Skip empty lines
            return;
        }
        if (line.startsWith("## ")) {
            if (active?.length > 0) {
                changelogs[changelogs.length - 1].content = toChangelogLine(active);
                active = "";
            }
            parseNewEntry(line);
            return;
        }
        active += `${line}${separator}`;        
    })
    if (active?.length > 0) {
        changelogs[changelogs.length - 1].content = toChangelogLine(active);
        active = "";
    }
    return changelogs;
}


const parseNewEntry = (line: string) => {
    let title = "Unknown";
    const titleMatches = line.match(/\[(.*?)\]/);
    if (titleMatches) {
        title = titleMatches[1];
    }
    const dashSplit = line.split(" - ");
    const parsedDate = new Date(dashSplit[dashSplit.length - 1]);
    changelogs.push({
        date: parsedDate instanceof Date && !isNaN(parsedDate.getTime()) ? parsedDate : new Date(),
        title: title,
    })
}

function toChangelogLine(line: string): string {
    return marked.parse(line.trim());
}