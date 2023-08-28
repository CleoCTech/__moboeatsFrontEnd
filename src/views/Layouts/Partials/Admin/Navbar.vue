<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth.js'
import { useUserStore } from '@/stores/user.js'

import SearchModal from '@/components/ModalSearch.vue';
import Notifications from '@/components/Notification.vue';
import Help from '@/components/DropdownHelp.vue';
import ThemeToggle from '@/components/ThemeToggle.vue';
import UserMenu from '@/components/DropdownProfile.vue';

const props = defineProps({
  sidebarOpen: Boolean,
});

const searchModalOpen = ref(false);

const authStore = useAuthStore()
const user = useUserStore()

const jsonString = JSON.stringify(user.$state, null, 2)
const jsonObject = JSON.parse(jsonString);

const name = jsonObject.data.user.name;
const email = jsonObject.data.user.email;

</script>
<template>
    <header class="sticky top-0 bg-white dark:bg-[#182235] border-b border-slate-200 dark:border-slate-700 z-30">
      <div class="px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16 -mb-px">
  
          <!-- Header: Left side -->
          <div class="flex">
  
            <!-- Hamburger button -->
            <button class="text-slate-500 hover:text-slate-600 lg:hidden" @click.stop="$emit('toggle-sidebar')" aria-controls="sidebar" :aria-expanded="sidebarOpen">
              <span class="sr-only">Open sidebar</span>
              <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="5" width="16" height="2" />
                <rect x="4" y="11" width="16" height="2" />
                <rect x="4" y="17" width="16" height="2" />
              </svg>
            </button>
  
          </div>
  
          <!-- Header: Right side -->
          <div class="flex items-center space-x-3">
            <div>
              <button
                class="w-8 h-8 flex items-center justify-center bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600/80 rounded-full ml-3"
                :class="{ 'bg-slate-200': searchModalOpen }"
                @click.stop="searchModalOpen = true"
                aria-controls="search-modal"
              >
                <span class="sr-only">Search</span>
                <svg class="w-4 h-4" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                  <path class="fill-current text-slate-500 dark:text-slate-400" d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z" />
                  <path class="fill-current text-slate-400 dark:text-slate-500" d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z" />
                </svg>
              </button>          
              <SearchModal id="search-modal" searchId="search" :modalOpen="searchModalOpen" @open-modal="searchModalOpen = true" @close-modal="searchModalOpen = false" />
            </div>
            <Notifications align="right" />
            <Help align="right" />
            <ThemeToggle />
            <!-- Divider -->
            <hr class="w-px h-6 bg-slate-200 dark:bg-slate-700 border-none" />
            <UserMenu align="right" />
  
          </div>
  
        </div>
      </div>
    </header>
  </template>

