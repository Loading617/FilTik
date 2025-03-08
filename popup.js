document.getElementById("savePreset").addEventListener("click", () => {
    const presetName = document.getElementById("presetName").value.trim();
    if (!presetName) {
        alert("Please enter a preset name!");
        return;
    }

    const minLikes = parseInt(document.getElementById("minLikes").value) || 0;
    const minComments = parseInt(document.getElementById("minComments").value) || 0;
    const startDate = document.getElementById("startDate").value || null;
    const endDate = document.getElementById("endDate").value || null;

    chrome.storage.sync.get({ presets: {} }, (data) => {
        let presets = data.presets;
        presets[presetName] = { minLikes, minComments, startDate, endDate };

        chrome.storage.sync.set({ presets }, () => {
            updatePresetList();
            alert("Preset saved and synced!");
        });
    });
});

function updatePresetList() {
    chrome.storage.sync.get({ presets: {} }, (data) => {
        const presetList = document.getElementById("presetList");
        presetList.innerHTML = "";
        for (const preset in data.presets) {
            let option = document.createElement("option");
            option.value = preset;
            option.textContent = preset;
            presetList.appendChild(option);
        }
    });
}

document.getElementById("applyPreset").addEventListener("click", () => {
    const presetName = document.getElementById("presetList").value;
    if (!presetName) return;

    chrome.storage.sync.get({ presets: {} }, (data) => {
        if (data.presets[presetName]) {
            const preset = data.presets[presetName];

            document.getElementById("minLikes").value = preset.minLikes;
            document.getElementById("minComments").value = preset.minComments;
            document.getElementById("startDate").value = preset.startDate;
            document.getElementById("endDate").value = preset.endDate;

            chrome.storage.sync.set(preset, () => {
                alert("Preset applied!");
            });
        }
    });
});

document.getElementById("deletePreset").addEventListener("click", () => {
    const presetName = document.getElementById("presetList").value;
    if (!presetName) return;

    chrome.storage.sync.get({ presets: {} }, (data) => {
        let presets = data.presets;
        delete presets[presetName];
        chrome.storage.sync.set({ presets }, () => {
            updatePresetList();
            alert("Preset deleted and removed from sync!");
        });
    });
});

chrome.storage.sync.get(["autoFilterType", "autoFilterEnabled", "minLikes", "minComments", "startDate", "endDate"], (data) => {
    if (data.autoFilterType) sendFilter(data.autoFilterType);
    if (data.autoFilterEnabled !== undefined) document.getElementById("autoFilterToggle").checked = data.autoFilterEnabled;
    if (data.minLikes) document.getElementById("minLikes").value = data.minLikes;
    if (data.minComments) document.getElementById("minComments").value = data.minComments;
    if (data.startDate) document.getElementById("startDate").value = data.startDate;
    if (data.endDate) document.getElementById("endDate").value = data.endDate;

    updatePresetList();

    document.getElementById("backupDrive").addEventListener("click", () => {
        chrome.runtime.sendMessage({ action: "backup" });
    });
    
    document.getElementById("restoreDrive").addEventListener("click", () => {
        chrome.runtime.sendMessage({ action: "restore" });
    });
    
});
