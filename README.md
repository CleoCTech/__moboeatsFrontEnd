# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).


# Using Vue Router, the route’s meta property, and dynamic components to create a layout system

- To avoid the layout from being unmounted and destroyed, we will put the layout above the page instead of within the page.
- We only imported the layouts once, we do not need to import or even wrap the layout in each page, and now, we will not have performance issues and we can keep state when navigating from 2 routes with the same layout.
- No need to wrap anything anymore; all is handled in App.vue around the `<router-view>` that represents each page when the route changes.
- **This method works in most use-cases, but it has 1 issue**: The layout only changes when the route changes.