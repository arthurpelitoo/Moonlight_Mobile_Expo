type Listener = () => void;

let params: Record<string, string | undefined> = {};
const listeners = new Set<Listener>();

function emitChange() {
  listeners.forEach((listener) => listener());
}

export const urlParamStore = {
  getSnapshot: () => params,
  subscribe: (listener: Listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  setParam: (key: string, value: string | undefined) => {
    if (params[key] === value) return;

    params = { ...params };
    if (value) params[key] = value;
    else delete params[key];
    emitChange();
  },
  setParams: (update: Record<string, string | undefined>) => {
    let hasChanges = false;
    const nextParams = { ...params };

    for (const [key, value] of Object.entries(update)) {
      if (nextParams[key] !== value) {
        hasChanges = true;
        if (value) {
          nextParams[key] = value;
        } else {
          delete nextParams[key];
        }
      }
    }

    if (hasChanges) {
      params = nextParams;
      emitChange();
    }
  },
};
