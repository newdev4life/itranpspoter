import * as fs from 'fs'
import * as plist from 'plist'
import * as bplist from "bplist-parser"
import { execFile } from 'child_process'
import { promisify } from 'util'


const execFileAsync = promisify(execFile);

export interface IPAInfo {
    bundleId: string
    appName: string
    version: string
    build: string
    minOSVersion?: string
}

function parsePlistBuffer(buf: Buffer): Record<string, any> {
    if (buf.slice(0, 6).toString("utf8") === "bplist") {
        return (bplist.parseBuffer(buf)?.[0] ?? {}) as Record<string, any>;
    }
    return plist.parse(buf.toString("utf8")) as Record<string, any>;
}

/**
 * Analyze IPA file to extract app information
 * IPA files are ZIP archives containing Payload/*.app/Info.plist
 */
export async function analyzeIpa(ipaPath: string): Promise<IPAInfo | null> {
    if (!fs.existsSync(ipaPath)) {
        console.error('IPA file not found:', ipaPath)
        return null
    }

    // 直接用通配符把主 app 的 Info.plist 打到 stdout（不需要正确中文路径）
    const { stdout } = await execFileAsync(
        "unzip",
        ["-p", ipaPath, "Payload/*.app/Info.plist"],
        { encoding: "buffer", maxBuffer: 50 * 1024 * 1024 }
    );

    const plistData = parsePlistBuffer(stdout as unknown as Buffer);

    const ipaInfo: IPAInfo = {
        bundleId: plistData.CFBundleIdentifier || '',
        appName: plistData.CFBundleDisplayName || plistData.CFBundleName || '',
        version: plistData.CFBundleShortVersionString || '',
        build: plistData.CFBundleVersion || '',
        minOSVersion: plistData.MinimumOSVersion || undefined
    }

    console.log('Parsed IPA info:', ipaInfo)
    return ipaInfo
}
