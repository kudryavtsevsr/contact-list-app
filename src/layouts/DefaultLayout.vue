<template>
  <div class="default-layout">
    <aside class="nav-bar">
      <RouterLink class="navigation-link logo" :to="{name: RouteName.Home}">
        <img src="@/assets/images/logo-star.svg" alt="logo">
      </RouterLink>
      <nav class="navigation-main">
        <RouterLink class="navigation-link" :to="{name: RouteName.ContactList}"><span class="material-symbols-outlined">calendar_today</span></RouterLink>
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
        <button class="back-button" @click="router.back()">
          <span class="material-symbols-outlined back-button-icon">chevron_left</span>
          <span class="back-button-text">
            Back
          </span>
        </button>
      </header>
      <slot/>
    </div>
  </div>
</template>

<script setup lang="ts">
import {RouteName} from '@/services/router';
import {useRouter} from 'vue-router';

const router = useRouter();
</script>

<style scoped lang="scss">
.default-layout {
  display: flex;
  height: 100%;
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
  flex: 1;
}

.nav-bar {
  width: 56px;
  display: flex;
  flex-direction: column;
  padding: 24px 0 48px;
}

.logo {
  margin-bottom: 72px;
  height: 42px;
}

.navigation-main {
  display: flex;
  flex-direction: column;
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
