export type DevicePhoto = {
  id: string;
  name: string;
  dataUrl: string;
  createdAt: string;
  source: "device";
};

const DATABASE_NAME = "owner-device-photo-library";
const DATABASE_VERSION = 1;
const STORE_NAME = "photos";

function openDatabase() {
  return new Promise<IDBDatabase>((resolve, reject) => {
    if (typeof window === "undefined" || !window.indexedDB) {
      reject(new Error("Device photo storage is unavailable."));
      return;
    }

    const request = window.indexedDB.open(DATABASE_NAME, DATABASE_VERSION);
    request.onupgradeneeded = () => {
      const database = request.result;
      if (!database.objectStoreNames.contains(STORE_NAME)) {
        database.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () =>
      reject(request.error || new Error("Device photo storage could not be opened."));
  });
}

async function runTransaction<T>(
  mode: IDBTransactionMode,
  action: (store: IDBObjectStore, resolve: (value: T) => void, reject: (reason?: unknown) => void) => void,
) {
  const database = await openDatabase();
  try {
    return await new Promise<T>((resolve, reject) => {
      const transaction = database.transaction(STORE_NAME, mode);
      action(transaction.objectStore(STORE_NAME), resolve, reject);
      transaction.onerror = () =>
        reject(transaction.error || new Error("The device photo operation failed."));
      transaction.onabort = () =>
        reject(transaction.error || new Error("The device photo operation was interrupted."));
    });
  } finally {
    database.close();
  }
}

export async function listDevicePhotos() {
  const photos = await runTransaction<DevicePhoto[]>("readonly", (store, resolve, reject) => {
    const request = store.getAll();
    request.onsuccess = () => resolve((request.result || []) as DevicePhoto[]);
    request.onerror = () => reject(request.error);
  });

  return photos.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function saveDevicePhoto(input: Omit<DevicePhoto, "source">) {
  const photo: DevicePhoto = { ...input, source: "device" };
  return runTransaction<DevicePhoto>("readwrite", (store, resolve, reject) => {
    const request = store.put(photo);
    request.onsuccess = () => resolve(photo);
    request.onerror = () => reject(request.error);
  });
}

export async function deleteDevicePhoto(id: string) {
  return runTransaction<void>("readwrite", (store, resolve, reject) => {
    const request = store.delete(id);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

export async function clearDevicePhotos() {
  return runTransaction<void>("readwrite", (store, resolve, reject) => {
    const request = store.clear();
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}
