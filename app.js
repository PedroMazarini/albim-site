const APP_CONFIG = {
  appName: "Albim",
  iosUrl: "https://apps.apple.com/app/id6760141218",
  androidUrl: "https://play.google.com/store/apps/details?id=app.mazarini.albim",
};

function textOrDefault(value, fallback) {
  return value && value.trim() ? value.trim() : fallback;
}

function numberOrDefault(value, fallback) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function replaceBrokenImages() {
  document.querySelectorAll("img[data-fallback-text]").forEach((image) => {
    image.addEventListener("error", () => {
      const fallback = document.createElement("div");
      fallback.className = "image-fallback";
      fallback.textContent = image.dataset.fallbackText || APP_CONFIG.appName;
      image.replaceWith(fallback);
    });
  });
}

function populateMetadata() {
  const params = new URLSearchParams(window.location.search);
  const inviteMessage = document.getElementById("invite-message");

  if (inviteMessage) {
    const path = window.location.pathname;
    const groupName = textOrDefault(params.get("groupname"), "your group");
    const username = textOrDefault(params.get("username"), "Someone");

    if (path === "/groupinvite" || path.includes("/groupinvite/")) {
      inviteMessage.textContent = `You were invited to group ${groupName}`;
      document.title = `${APP_CONFIG.appName} - Group invite`;
      return;
    }

    if (path === "/friendinvite" || path.includes("/friendinvite/")) {
      inviteMessage.textContent = `${username} invited you to follow his album`;
      document.title = `${APP_CONFIG.appName} - Friend invite`;
      return;
    }
  }

  const username = textOrDefault(params.get("user"), "Seu amigo");
  const owned = numberOrDefault(params.get("owned"), 0);
  const total = numberOrDefault(params.get("total"), 0);
  const duplicates = numberOrDefault(params.get("duplicates"), 0);

  const metaUser = document.getElementById("meta-user");
  const metaProgress = document.getElementById("meta-progress");
  const metaDuplicates = document.getElementById("meta-duplicates");
  const helperText = document.getElementById("helper-text");

  if (metaUser) {
    metaUser.textContent = username;
  }
  if (metaProgress) {
    metaProgress.textContent = `${owned} / ${total}`;
  }
  if (metaDuplicates) {
    metaDuplicates.textContent = `${duplicates}`;
  }

  if (params.get("album") && helperText) {
    helperText.textContent =
      "Esse link ja contem os dados do album. Se o Albim estiver instalado, ele deve abrir direto na troca.";
  }

  document.title = `${APP_CONFIG.appName} - ${username}`;
}

function applyStoreLinks() {
  const iosLink = document.getElementById("ios-link");
  const androidLink = document.getElementById("android-link");
  if (iosLink) {
    iosLink.href = APP_CONFIG.iosUrl;
  }
  if (androidLink) {
    androidLink.href = APP_CONFIG.androidUrl;
  }
}

replaceBrokenImages();
populateMetadata();
applyStoreLinks();
