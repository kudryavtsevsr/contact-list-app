<template>
  <div class="default-layout">
    <aside class="nav-bar">
      <div class="nav-bar-inner">
        <RouterLink class="navigation-link logo" :to="{name: RouteName.Home}">
          <img src="@/assets/images/logo-star.svg" alt="logo">
        </RouterLink>
        <nav class="navigation-main">
          <button class="navigation-link"><span class="material-symbols-outlined">calendar_today</span></button>
          <button class="navigation-link"><img src="@/assets/images/icons/events.svg" alt="events"></button>
          <button class="navigation-link"><span class="material-symbols-outlined">account_circle</span></button>
          <button class="navigation-link"><span class="material-symbols-outlined">currency_pound</span></button>
          <button class="navigation-link"><span class="material-symbols-outlined material-symbols-filled">home</span>
          </button>
        </nav>
        <nav class="navigation-additional">
          <button class="navigation-link"><span class="material-symbols-outlined">search</span></button>
          <button class="navigation-link"><span class="material-symbols-outlined">info</span></button>
        </nav>
      </div>
      <ui-button class="nav-expand" view="ghost">
        <template #icon-left>
          <span class="material-symbols-outlined nav-expand-icon">chevron_right</span>
        </template>
      </ui-button>
    </aside>

    <div class="body">
      <header class="header">
        <ui-button class="header-button" view="ghost" @click="router.back()">
          <template #icon-left>
            <span class="material-symbols-outlined header-button-icon">chevron_left</span>
          </template>
          <span class="mobile-hidden">Back</span>
        </ui-button>
        <div v-if="title" class="h2 title" :class="{'desktop-hidden': isTitleHiddenOnDesktop}">
          {{ title }}
        </div>
        <ui-button class="header-button tablet-hidden desktop-hidden" view="ghost">
          <template #icon-left>
            <span class="material-symbols-outlined header-button-icon">more_vert</span>
          </template>
        </ui-button>
      </header>
      <div class="content" ref="contentElement">
        <slot/>
      </div>
      <nav v-if="!isTabBarHidden" class="tab-bar">
        <button class="navigation-link"><span class="material-symbols-outlined">calendar_today</span></button>
        <button class="navigation-link"><span class="material-symbols-outlined">account_circle</span></button>
        <button class="navigation-link navigation-link_main"><img src="@/assets/images/icons/events-filled.svg" alt="events"></button>
        <button class="navigation-link"><span class="material-symbols-outlined">currency_pound</span></button>
        <button class="navigation-link"><span class="material-symbols-outlined material-symbols-filled">home</span>
        </button>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import {RouteName} from '@/services/router';
import {useRouter} from 'vue-router';
import {uiButton} from '@/ui/Button';
import {useLayoutStore} from './store';
import {storeToRefs} from 'pinia';

const router = useRouter();
const contentElement = ref(null);

const store = useLayoutStore();
const {title, isTitleHiddenOnDesktop, isTabBarHidden} = storeToRefs(store);

router.afterEach(() => {
  contentElement.value?.scrollTo(0, 0);
});
</script>

<style scoped lang="scss">
.default-layout {
  display: flex;
  height: 100%;
  background-color: $color-background-main-primary;
  overflow: hidden;
}

.header {
  flex: 0 0 rem(64);
  position: relative;
  background-color: $color-background-main-primary-invert;
  color: $color-text-main-primary-invert;
  padding: 8px 48px;
  display: flex;
  align-items: center;

  @include mobile {
    padding: 8px;
    justify-content: space-between;
  }
}

.header-button {
  background-color: transparent;
  border: none;
  color: $color-text-main-primary-invert;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
}

.header-button-icon {
  margin-top: 2px;
  font-size: rem(19);

  @include mobile {
    margin-top: 0;
    font-size: rem(24);
    padding: 8px;
  }
}

.header-button-text {
  font-family: $font-space-grotesk;
  text-decoration: underline;
  text-underline-offset: 2px;
  font-size: rem(14);
}

.title {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: auto;
}

.body {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.content {
  overflow: auto;
}

.nav-bar {
  position: relative;
  flex: 0 0 56px;
  border-right: 1px solid $color-border-main-quaternary;

  @include mobile {
    display: none;
  }
}

.nav-bar-inner {
  display: flex;
  height: 100%;
  flex-direction: column;
  padding: 24px 0 48px;
  overflow: auto;
}

.logo {
  margin-bottom: 74px;
  height: 42px;
}

.navigation-main {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  gap: 16px;
}

.navigation-link {
  height: 48px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;

  @include mobile {
    height: auto;
    width: 100%;
  }

  &_main {
    flex: 0 0 64px;
    height: 64px;
    border: 1px solid $color-text-main-primary;
    border-radius: 50%;
    transform: translateY(-24px);
    background-color: $color-background-main-primary;
  }
}

.navigation-additional {
  display: flex;
  flex-direction: column;
  margin-top: auto;
  gap: 10px;
}

.nav-expand {
  position: absolute;
  top: 104px;
  right: 0;
  transform: translateX(50%);
}

.nav-expand-icon {
  padding: 3px;
  background-color: $color-background-main-primary-invert;
  color: $color-text-main-primary-invert;
  border-radius: 50%;
  font-size: 16px;
}

.tab-bar {
  display: flex;
  justify-content: space-around;
  flex: 0 0 58px;
  gap: 10px;
  border-top: 1px solid $color-text-main-primary;
  background: linear-gradient(to top, $color-border-main-quaternary 0, $color-background-main-primary 100%);

  @include tablet-min {
    display: none;
  }
}
</style>
