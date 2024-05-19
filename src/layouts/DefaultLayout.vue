<template>
  <div class="default-layout">
    <aside class="nav-bar">
      <RouterLink class="navigation-link logo" :to="{name: RouteName.Home}">
        <img src="@/assets/images/logo-star.svg" alt="logo">
      </RouterLink>
      <nav class="navigation-main">
        <button class="navigation-link"><span class="material-symbols-outlined">calendar_today</span></button>
        <button class="navigation-link"><img src="@/assets/images/icons/events.svg" alt="events"></button>
        <button class="navigation-link"><span class="material-symbols-outlined">account_circle</span></button>
        <button class="navigation-link"><span class="material-symbols-outlined">currency_pound</span></button>
        <button class="navigation-link"><span class="material-symbols-outlined material-symbols-filled">home</span></button>
      </nav>
      <nav class="navigation-additional">
        <button class="navigation-link"><span class="material-symbols-outlined">search</span></button>
        <button class="navigation-link"><span class="material-symbols-outlined">info</span></button>
      </nav>
    </aside>
    <div class="body">
      <header class="header">
        <ui-button class="back-button" view="ghost" @click="router.back()">
          <template #icon-left>
            <span class="material-symbols-outlined back-button-icon">chevron_left</span>
          </template>
          Back
        </ui-button>
      </header>
      <div class="content" ref="contentElement">
        <slot/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import {RouteName} from '@/services/router';
import {useRouter} from 'vue-router';
import {uiButton} from '@/ui/Button'

const router = useRouter();
const contentElement = ref(null)

router.afterEach(() => {
  contentElement.value?.scrollTo(0, 0);
})

</script>

<style scoped lang="scss">
.default-layout {
  display: flex;
  height: 100%;
  min-height: 500px;
  background-color: #E2E2E2;
}

.header {
  background-color: #282829;
  color: #EFEFEF;
  padding: 8px 48px;
  min-height: 64px;
  display: flex;
  align-items: center;
}

.back-button {
  background-color: transparent;
  border: none;
  color: #EFEFEF;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
}

.back-button-icon {
  margin-top: 2px;
  font-size: 19px;
}

.back-button-text {
  font-family: $font-space-grotesk;
  text-decoration: underline;
  text-underline-offset: 2px;
  font-size: 14px;
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
  width: 56px;
  display: flex;
  flex-direction: column;
  padding: 24px 0 48px;
  border-right: 1px solid #D2D2D2;
}

.logo {
  margin-bottom: 72px;
  height: 42px;
}

.navigation-main {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
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
}

.navigation-additional {
  display: flex;
  flex-direction: column;
  margin-top: auto;
}
</style>
