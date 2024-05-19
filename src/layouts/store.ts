import {defineStore} from 'pinia';
import {ref} from 'vue';

export const useLayoutStore = defineStore('layout', () => {
  const layoutTitle = ref<string>('');
  const isLayoutTitleHiddenOnDesktop = ref<boolean>(false)
  const isLayoutTabBarHidden = ref<boolean>(true)

  function setLayoutSettings(title: string, isTitleHiddenOnDesktop: boolean = false, isTabBarHidden: boolean = true ) {
    layoutTitle.value = title
    isLayoutTitleHiddenOnDesktop.value = isTitleHiddenOnDesktop
    isLayoutTabBarHidden.value = isTabBarHidden
  }

  return {
    title: layoutTitle,
    isTitleHiddenOnDesktop: isLayoutTitleHiddenOnDesktop,
    isTabBarHidden: isLayoutTabBarHidden,
    setLayoutSettings
  }
})
