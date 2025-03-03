document.getElementById("exportPresets").addEventListener("click", () => {
    chrome.storage.sync.get({ presets: {} }, (data) => {
        const presetsJSON = JSON.stringify(data.presets, null, 4);
        const blob = new Blob([presetsJSON], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement("a");
        a.href = url;
        a.download = "TikTokPresets.json";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    });
});

document.getElementById("importButton").addEventListener("click", () => {
    const fileInput = document.getElementById("importPresets");
    if (fileInput.files.length === 0) {
        alert("Please select a file!");
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();
    
    reader.onload = (event) => {
        try {
            const importedPresets = JSON.parse(event.target.result);
            if (typeof importedPresets !== "object") throw new Error("Invalid JSON");

            chrome.storage.sync.get({ presets: {} }, (data) => {
                const updatedPresets = { ...data.presets, ...importedPresets };
                chrome.storage.sync.set({ presets: updatedPresets }, () => {
                    updatePresetList();
                    alert("Presets imported and synced successfully!");
                });
            });
        } catch (error) {
            alert("Invalid file format!");
        }
    };

    reader.readAsText(file);
});
