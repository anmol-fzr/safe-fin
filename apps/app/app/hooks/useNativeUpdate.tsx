import * as Application from "expo-application";
import * as FileSystem from "expo-file-system";
import * as FileSystemLegacy from "expo-file-system/legacy";
import * as IntentLauncher from "expo-intent-launcher";
import { useCallback, useEffect, useMemo, useState } from "react";
import * as Semver from "semver";
import { envs } from "@/utils/envs";

const APK_PREFIX = "safe-fin";

function normalizeTag(tag: string) {
	return tag.replace(/^mobile-/, "").replace(/^v/, "");
}

function isStable(version: string) {
	return !Semver.prerelease(version);
}

export function useNativeUpdate() {
	const installedVersion = Application.nativeApplicationVersion ?? null;

	const [isUpdateAvailable, setIsUpdateAvailable] = useState(false);
	const [isDownloading, setIsDownloading] = useState(false);
	const [isDownloaded, setIsDownloaded] = useState(false);

	const [tag, setTag] = useState<string | null>(null);
	const [apkUrl, setApkUrl] = useState<string | null>(null);

	const finalFile = useMemo(() => {
		if (!tag) return null;
		return new FileSystem.File(
			FileSystem.Paths.cache,
			`${APK_PREFIX}-${tag}.apk`,
		);
	}, [tag]);

	const tempFile = useMemo(() => {
		if (!tag) return null;
		return new FileSystem.File(
			FileSystem.Paths.cache,
			`${APK_PREFIX}-${tag}.tmp`,
		);
	}, [tag]);

	const checkForUpdate = useCallback(async () => {
		if (!installedVersion) return;

		try {
			const res = await fetch(envs.GITHUB_RELEASE_URL);
			if (!res.ok) return;

			const release = await res.json();

			const tagName = release.tag_name;
			const version = normalizeTag(tagName);

			if (!Semver.valid(version)) return;
			if (!isStable(version)) return;
			if (!Semver.gt(version, installedVersion)) return;

			const asset = release.assets?.find(
				(a: any) => typeof a.name === "string" && a.name.endsWith(".apk"),
			);
			if (!asset) return;

			setIsUpdateAvailable(true);
			setTag(tagName);
			setApkUrl(asset.browser_download_url);
		} catch (err) {
			console.info("Native update check failed", err);
		}
	}, [installedVersion]);

	useEffect(() => {
		if (!finalFile) return;

		const info = finalFile.info();

		if (info.exists) {
			setIsDownloaded(true);
		}
	}, [finalFile]);

	const download = useCallback(async () => {
		if (!apkUrl || !finalFile || !tempFile) return;

		const finalInfo = finalFile.info();
		if (finalInfo.exists) {
			setIsDownloaded(true);
			return;
		}

		setIsDownloading(true);

		try {
			const tempInfo = tempFile.info();
			if (tempInfo.exists) {
				tempFile.delete();
			}

			await FileSystem.File.downloadFileAsync(apkUrl, tempFile);

			tempFile.move(finalFile);

			setIsDownloaded(true);
		} catch (err) {
			console.info("APK download failed", err);
		} finally {
			setIsDownloading(false);
		}
	}, [apkUrl, finalFile, tempFile]);

	// ---------- INSTALL ----------
	const install = useCallback(async () => {
		if (!finalFile) return;

		const info = finalFile.info();
		if (!info.exists) return;

		const contentUri = await FileSystemLegacy.getContentUriAsync(info.uri);

		await IntentLauncher.startActivityAsync("android.intent.action.VIEW", {
			data: contentUri,
			flags: 1,
			type: "application/vnd.android.package-archive",
		});
	}, [finalFile]);

	// ---------- AUTO CHECK ----------
	useEffect(() => {
		checkForUpdate();
	}, [checkForUpdate]);

	return {
		// state
		isUpdateAvailable,
		isDownloaded,
		isDownloading,

		// actions
		checkForUpdate,
		download,
		install,
	};
}
