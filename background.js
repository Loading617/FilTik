const CLIENT_ID = "YOUR_CLIENT_ID";
const CLIENT_SECRET = "YOUR_CLIENT_SECRET";
const REDIRECT_URI = "https://your-extension-id.chromiumapp.org/";
const SCOPES = "https://www.googleapis.com/auth/drive.file";

async function authenticateUser() {
    return new Promise((resolve, reject) => {
        chrome.identity.launchWebAuthFlow(
            {
                url: `https://accounts.google.com/o/oauth2/auth?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${REDIRECT_URI}&scope=${SCOPES}`,
                interactive: true,
            },
            (redirectUrl) => {
                if (chrome.runtime.lastError || !redirectUrl) {
                    reject(new Error("Authentication failed!"));
                    return;
                }

                const params = new URLSearchParams(new URL(redirectUrl).hash.substring(1));
                const accessToken = params.get("access_token");

                if (accessToken) {
                    chrome.storage.local.set({ accessToken }, () => {
                        resolve(accessToken);
                    });
                } else {
                    reject(new Error("No access token found!"));
                }
            }
        );
    });
}

async function getAccessToken() {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get(["accessToken"], async (data) => {
            if (data.accessToken) {
                resolve(data.accessToken);
            } else {
                try {
                    const token = await authenticateUser();
                    resolve(token);
                } catch (error) {
                    reject(error);
                }
            }
        });
    });
}

async function backupToDrive() {
    try {
        const accessToken = await getAccessToken();
        const fileContent = await new Promise((resolve) => {
            chrome.storage.sync.get({ presets: {} }, (data) => {
                resolve(JSON.stringify(data.presets, null, 4));
            });
        });

        const metadata = {
            name: "TikTokPresets.json",
            mimeType: "application/json",
        };

        const form = new FormData();
        form.append("metadata", new Blob([JSON.stringify(metadata)], { type: "application/json" }));
        form.append("file", new Blob([fileContent], { type: "application/json" }));

        await fetch("https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart", {
            method: "POST",
            headers: { Authorization: `Bearer ${accessToken}` },
            body: form,
        });

        alert("Presets backed up to Google Drive!");
    } catch (error) {
        alert("Backup failed: " + error.message);
    }
}

async function restoreFromDrive() {
    try {
        const accessToken = await getAccessToken();

        const searchResponse = await fetch(
            "https://www.googleapis.com/drive/v3/files?q=name='TikTokPresets.json'",
            {
                headers: { Authorization: `Bearer ${accessToken}` },
            }
        );

        const searchData = await searchResponse.json();
        if (!searchData.files.length) {
            alert("No backup found on Google Drive!");
            return;
        }

        const fileId = searchData.files[0].id;

        const fileResponse = await fetch(
            `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`,
            {
                headers: { Authorization: `Bearer ${accessToken}` },
            }
        );

        const presets = await fileResponse.json();
        chrome.storage.sync.set({ presets }, () => {
            alert("Presets restored from Google Drive!");
        });
    } catch (error) {
        alert("Restore failed: " + error.message);
    }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "backup") {
        backupToDrive();
    } else if (request.action === "restore") {
        restoreFromDrive();
    }
});
