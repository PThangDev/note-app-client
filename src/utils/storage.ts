const storage = {
  get<T = any>(key: string): T {
    let value = sessionStorage.getItem(key);
    try {
      value = JSON.parse(value || '""');
      return value as unknown as T;
    } catch (error) {
      return value as unknown as T;
    }
  },
  set(key: string, value: any) {
    let _value = value;
    if (typeof value !== 'string' || value === undefined || value === null) {
      _value = JSON.stringify(_value);
    }
    return sessionStorage.setItem(key, _value);
  },
  remove(key: string) {
    return sessionStorage.removeItem(key);
  },
  clear() {
    return sessionStorage.clear();
  },
};
export default storage;
