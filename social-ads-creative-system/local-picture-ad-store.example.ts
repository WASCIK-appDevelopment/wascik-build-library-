export type TemporaryCreativeAssetRecord = {
  draftKey: string;
  imageBlob: Blob;
  width: number;
  height: number;
  mimeType: string;
  savedAt: string;
};

type StoredCreativeAsset = TemporaryCreativeAssetRecord & { key: string };

const DB_NAME = "owner-console-local-creative-assets";
const DB_VERSION = 1;
const STORE_NAME = "temporary-assets";
const CURRENT_KEY = "current-picture-ad";

function openDatabase() {
  return new Promise<IDBDatabase>((resolve, reject) => {
    if (typeof window === "undefined" || typeof window.indexedDB === "undefined") {
      reject(new Error("Temporary browser storage is unavailable."));
      return;
    }

    const request = window.indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const database = request.result;
      if (!database.objectStoreNames.contains(STORE_NAME)) {
        database.createObjectStore(STORE_NAME, { keyPath: "key" });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () =>
      reject(request.error || new Error("Temporary browser storage could not be opened."));
  });
}

export async function saveTemporaryCreativeAsset(
  record: TemporaryCreativeAssetRecord,
) {
  const database = await openDatabase();
  try {
    await new Promise<void>((resolve, reject) => {
      const transaction = database.transaction(STORE_NAME, "readwrite");
      transaction.objectStore(STORE_NAME).put({
        ...record,
        key: CURRENT_KEY,
      } satisfies StoredCreativeAsset);
      transaction.oncomplete = () => resolve();
      transaction.onerror = () =>
        reject(transaction.error || new Error("The temporary creative could not be saved."));
      transaction.onabort = () =>
        reject(transaction.error || new Error("The temporary creative save was interrupted."));
    });
  } finally {
    database.close();
  }
}

export async function loadTemporaryCreativeAsset(draftKey: string) {
  const database = await openDatabase();
  try {
    const record = await new Promise<StoredCreativeAsset | null>((resolve, reject) => {
      const request = database
        .transaction(STORE_NAME, "readonly")
        .objectStore(STORE_NAME)
        .get(CURRENT_KEY);
      request.onsuccess = () =>
        resolve((request.result as StoredCreativeAsset | undefined) || null);
      request.onerror = () =>
        reject(request.error || new Error("The temporary creative could not be restored."));
    });

    return record?.draftKey === draftKey ? record : null;
  } finally {
    database.close();
  }
}

export async function clearTemporaryCreativeAsset() {
  if (typeof window === "undefined" || typeof window.indexedDB === "undefined") return;

  const database = await openDatabase();
  try {
    await new Promise<void>((resolve, reject) => {
      const transaction = database.transaction(STORE_NAME, "readwrite");
      transaction.objectStore(STORE_NAME).delete(CURRENT_KEY);
      transaction.oncomplete = () => resolve();
      transaction.onerror = () =>
        reject(transaction.error || new Error("The temporary creative could not be cleared."));
      transaction.onabort = () =>
        reject(transaction.error || new Error("The temporary creative clear was interrupted."));
    });
  } finally {
    database.close();
  }
}
