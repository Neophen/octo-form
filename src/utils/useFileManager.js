import { inject, provide, ref } from "@vue/composition-api";

const FileManagerSymbol = Symbol();

export function provideFileManager(props) {
  provide(FileManagerSymbol, props);
}

export function useFileManager() {
  const fileManager = inject(FileManagerSymbol);
  if (!fileManager) {
    return ref("");
  }
  return { fileManager };
}
